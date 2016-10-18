import { createAction } from 'redux-actions'
import promisify from 'es6-promisify'
import axios from 'axios'
import xhrAdapter from 'axios-cancel'
import smoogs from 'smoogs-client'
import { Cancellation, CancellationError } from 'axios-cancel/cancel'

const client = axios.create({
  baseURL: 'https://192.168.1.11:8000'
})

smoogs.url = 'https://test.smoogs.io/api/v1'
smoogs.network = 'testnet'

const { insight } = smoogs

const watchUtxos = promisify(insight.watchUnspentUtxos, insight)
const estimateFee = promisify(insight.feeEstimation, insight)

export const error = createAction('ERROR')
export const toggle = createAction('TOGGLE')
export const filter = createAction('FILTER')
export const get = createAction('GET')
export const post = createAction('POST')
export const sort = createAction('SORT')
export const funding = createAction('FUNDING')

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

export const refundAddress = createAction('REFUND_ADDRESS')

export const loadStreams = (n = -1) => {
  return (dispatch) => {
    if (n === -1) n = 0
    else if (n === 0) return Promise.resolve()
    const path = `/streams/1000/${n}`
    dispatch(get(path))
    return client.get(path)
      .then(({ data: [n, streams] }) =>
        dispatch(loadStreams(n)) &&
        dispatch(pushStreams(streams)))
  }
}

export const loadStream = (id) => {
  return (dispatch) => {
    const path = `/stream/${id}`
    dispatch(get(path))
    return client.get(path)
      .then(res => dispatch(setStream(res.data)))
      .then(_ => dispatch(playStream()))
      .then(_ => dispatch(loadStreamChanges(id)))
  }
}

export const loadStreamChanges = (id) => {
  return (dispatch) => {
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
}

export const registerStream = (url) => {
  return (dispatch) => {
    console.log('url', url)
    const path = '/stream'
    dispatch(post(path))
    return client.post(path, { url: url })
      .then(res => dispatch(registerOk(res.data)))
      .catch(err => dispatch(registerError(err.message)))
  }
}

export const awaitUtxos = (address) => {
  return dispatch => {
    watchUtxos(address)
      .then(utxos => {
        estimateFee(0)
          .then(estimation => {
            let feePerKb = 5000
            if (estimation.feePerKb > 0) {
              feePerKb = estimation.feePerKb
            }
            dispatch(funding({ utxos, feePerKb }))
            client.get(`/address/${address}`)
              .then(res => dispatch(refundAddress(res.data)))
              .catch(err => {
                if (err.response.status !== 404) throw err
              })
          })
      })
  }
}
