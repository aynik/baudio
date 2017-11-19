import { createAction } from 'redux-actions'
import axios from 'axios'
import xhrAdapter from 'axios-cancel'
import smoogs, { insight } from 'smoogs-client'
import { Cancellation, CancellationError } from 'axios-cancel/cancel'

const client = axios.create({
  baseURL: 'https://192.168.1.11:8000'
})

const { Account, AccountController } = smoogs
const { PrivateKey } = smoogs.bitcore

smoogs.url = 'https://192.168.1.11:3000'
smoogs.network = 'testnet'

const MIN_FEE_PER_KB = 5000

export const error = createAction('ERROR')
export const toggle = createAction('TOGGLE')
export const filter = createAction('FILTER')
export const get = createAction('GET')
export const post = createAction('POST')
export const sort = createAction('SORT')

export const pushStreams = createAction('PUSH_STREAMS')
export const updateStreams = createAction('UPDATE_STREAMS')
export const pullStream = createAction('PULL_STREAM')
export const setStream = createAction('SET_STREAM')
export const unsetStream = createAction('UNSET_STREAM')
export const setStreamChanges = createAction('SET_STREAM_CHANGES')
export const confirmStreamChanges = createAction('CONFIRM_STREAM_CHANGES')
export const playStream = createAction('PLAY_STREAM')
export const pauseStream = createAction('PAUSE_STREAM')
export const refreshStream = createAction('REFRESH_STREAM')
export const setStreamCancellation = createAction('SET_STREAM_CANCELLATION')

export const registerUrl = createAction('REGISTER_URL')
export const registerOk = createAction('REGISTER_OK')
export const registerError = createAction('REGISTER_ERROR')

export const setFundingState = createAction('SET_FUNDING_STATE')
export const feePerKb = createAction('FEE_PER_KB')
export const setRefundAddress = createAction('SET_REFUND_ADDRESS')
export const unsetRefundAddress = createAction('UNSET_REFUND_ADDRESS')
export const setUtxos = createAction('SET_UTXOS')
export const unsetUtxos = createAction('UNSET_UTXOS')
export const setAccount = createAction('SET_ACCOUNT')
export const setController = createAction('SET_CONTROLLER')
export const unsetAccount = createAction('UNSET_ACCOUNT')

export const loadStreams = (n = -1) => (
  dispatch => {
    if (n === -1) n = 0
    else if (n === 0) return Promise.resolve()
    const path = `/streams/1000/${n}`
    dispatch(get(path))
    return client.get(path)
      .then(({ data: [n, streams] }) =>
        dispatch(loadStreams(n)) &&
        dispatch(pushStreams(streams)))
  }
)

export const loadStream = id => (
  dispatch => {
    const path = `/stream/${id}`
    dispatch(get(path))
    return client.get(path)
      .then(res => dispatch(setStream(res.data)))
      .then(_ => dispatch(playStream()))
      .then(_ => dispatch(loadStreamChanges(id)))
  }
)

export const loadStreamChanges = id => (
  dispatch => {
    const after = (n, fn) => setTimeout(_ => dispatch(fn()), n)
    const path = `/stream/${id}/changes`
    const cancellation = new Cancellation()

    dispatch(get(path))
    dispatch(refreshStream())

    client.get(path, {
      adapter: xhrAdapter,
      cancellation: cancellation
    }).then(res => dispatch(setStreamChanges(res.data)))
    .then(_ => after(6000, confirmStreamChanges.bind(null)))
    .catch(err => err instanceof CancellationError ? null : err)

    dispatch(setStreamCancellation(cancellation))
  }
)

export const registerStream = url => (
  dispatch => {
    const path = '/stream'
    dispatch(post(path))
    return client.post(path, { url: url })
      .then(res => dispatch(registerOk(res.data)))
      .catch(err => dispatch(registerError(err.message)))
  }
)

export const estimateFee = blocks => (
  dispatch => {
    insight.feeEstimation(blocks, (err, feePerKb) => {
      dispatch(feePerKb(!err && estimation.feePerKb > 0
        ? estimation.feePerKb
        : MIN_FEE_PER_KB))
    })
  }
)

export const awaitUtxos = address => (
  dispatch => {
    let proc
    let timeout = setTimeout(proc = () => {
      insight.getUnspentUtxos(address, (err, utxos) => {
        if (err || utxos.length) {
          clearTimeout(timeout)
          dispatch(setUtxos(utxos))
          estimateFee(0)
          client.get(`/address/${address}`)
            .then(res => dispatch(setRefundAddress(res.data)))
            .catch(err => {
              if (err.response.status !== 404) throw err
            }) 
          return
        }
        timeout = setTimeout(proc, 1000)
      })
    }, 1000)
  }
)

export const openAccount = ({ utxos, refundAddress }) => ( 
  dispatch => {
    insight.feeEstimation(0, (err, estimation) => {
      const fee = !err && estimation.feePerKb > 0
        ? estimation.feePerKb
        : MIN_FEE_PER_KB
      dispatch(feePerKb(fee))
      const accountId = smoogs.savedAccountId()
      const dispatchController = account => {
        const ctrl = new AccountController(account) 
        dispatch(setController(ctrl))
        if (!ctrl.isFunded()) {
          dispatch(fundController({ 
            controller: ctrl, account, utxos, feePerKb: fee
          })) 
        }
      }
      const createAccount = _ => {
        Account.create({ refundAddress }, (err, inst) => {
          smoogs.saveAccountId(inst.id)
          dispatch(setAccount(inst))
          dispatchController(inst)
        })
      }
      if (accountId) {
        return Account.get(accountId, (err, inst) => {
          if (err) return createAccount()
          dispatch(setAccount(inst))
          dispatchController(inst)
        })
      }
      createAccount()
    })
  }
)

export const fundController = ({ 
  controller, account, utxos, feePerKb
}) => (
  dispatch => {
    const { consumer } = controller
    consumer.processFunding(utxos)
    consumer.commitmentTx.feePerKb(feePerKb)
    const refund = consumer.setupRefund()
    Account.sign(account.id, refund, (err, refund) => {
      if (err) return next(err)
      if (!consumer.validateRefund(refund.toObject())) {
        return next(new Error('Invalid signed refund'))
      }
      const refundTx = consumer.refundTx.toObject()
      Account.refund(account.id, refundTx, err => {
        if (err) throw err
        const commitmentTx = consumer.commitmentTx.toObject()
        Account.commit(account.id, commitmentTx, err => {
          if (err) throw err
        })
      })
    })
  }
)

export const expireFundingKey = _ => (
  dispatch => {
    smoogs.fundingKey = new PrivateKey() 
    dispatch(awaitUtxos(smoogs.fundingAddress.toString()))
  }
)

export const closeAccount = controller => {
  return dispatch => {
    controller.close(err => {
      if (err) throw err
      dispatch(expireFundingKey())
      dispatch(setFundingState('topup'))
      dispatch(unsetUtxos())
      dispatch(unsetAccount())
      dispatch(unsetRefundAddress())
    }) 
  }
}
