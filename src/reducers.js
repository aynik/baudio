import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { handleAction, handleActions } from 'redux-actions'

import {
  toggle, filter, sort, 
  pushStreams, pullStream, updateStreams,
  playStream, pauseStream,
  setStream, unsetStream, refreshStream,
  setStreamCancellation,
  setStreamChanges, confirmStreamChanges,
  registerUrl, registerOk, registerError,
  refundAddress, setFundingState, feePerKb,
  setUtxos, unsetUtxos,
  setRefundAddress, unsetRefundAddress,
  setAccount, setController, unsetAccount
} from './actions'

const assign = (prevstate, nextstate) => (
  Object.assign({}, prevstate, nextstate)
)

const computeChanges = (changes, state) => {
  const dest = Object.assign({}, state)
  Object.keys(changes).map(key => {
    const _key = key
    key = key[0] === '$' ? key.substr(1) : key
    dest[key] = typeof changes[key] === 'object'
      ? computeChanges(changes[key], dest[key])
      : key !== _key
        ? eval(`(${dest[key]})` + changes[_key])
        : changes[key]
  })
  return dest
}

export const filtering = handleAction(filter, {
  next: (state, { payload }) => payload
}, '')

export const toggles = handleAction(toggle, {
  next: (state, { payload }) => assign(state, {
    [payload]: !state[payload]
  })
}, {})

export const sorts = handleAction(sort, {
  next: (state, { payload }) => assign(state, {
    [payload]: ((1 + (state[payload] || 0) + 1) % 3) - 1
  })
}, {})

export const registerer = handleActions({
  [registerUrl]: (state, { payload }) => assign(state, {
    url: payload,
    state: 'alert',
    info: payload.length
      ? "Press 'Register' when you're done."
      : 'Please add a stream URL above.'
  }),
  [registerOk]: (state, { payload: { name, bph }}) => assign(state, {
    state: 'ok',
    info: `Registered stream '${name}' using price ${bph}.`
  }),
  [registerError]: (state, { payload }) => assign(state, {
    state: 'error',
    info: `${payload}.`
  })
}, {
  url: '',
  state: 'alert',
  info: 'Please add a stream URL above.'
})

export const streams = handleActions({
  [pushStreams]: (state, { payload }) => assign(state,
    payload.reduce((nextState, stream) => Object.assign(nextState, {
      [stream.id]: stream
    }), {})),
  [pullStream]: (state, { payload }) =>
    Object.keys(state).reduce((nextState, id) => {
      if (id !== payload) nextState[id] = state[id]
      return nextState
    }, {}),
  [updateStreams]: (state, { payload }) =>
    assign(state, Object.keys(payload).reduce((nextState, id) => {
      nextState[id] = computeChanges(payload[id], state[id])
      return nextState
    }, {}))
}, {})

export const player = handleActions({
  [unsetStream]: (state, { payload }) => assign(state, {
    stream: { name: 'No stream selected' },
    isConfirmed: true
  }),
  [setStream]: (state, { payload }) => assign(state, {
    stream: payload,
    isConfirmed: true
  }),
  [refreshStream]: (state) => assign(state, {
    isUpdated: false
  }),
  [setStreamCancellation]: (state, { payload }) => {
    if (state.cancellation) {
      state.cancellation.cancel()
    }
    return assign(state, {
      cancellation: payload
    })
  },
  [setStreamChanges]: (state, { payload }) => assign(state, {
    stream: assign(state.stream,
      computeChanges(payload, state.stream)),
    isUpdated: true,
    isConfirmed: false
  }),
  [confirmStreamChanges]: (state, { payload }) => assign(state, {
    isConfirmed: true
  }),
  [playStream]: (state) => assign(state, {
    isPlaying: true
  }),
  [pauseStream]: (state) => assign(state, {
    isPlaying: false
  })
}, {
  stream: { name: 'No stream selected' },
  isPlaying: false
})

export const funds = handleActions({
  [setFundingState]: (state, { payload }) => assign(state, {
    state: payload
  }),
  [feePerKb]: (state, { payload }) => assign(state, {
    feePerKb: payload
  }),
  [setUtxos]: (state, { payload }) => assign(state, {
    utxos: payload.map(u => u.toObject())
  }),
  [unsetUtxos]: (state) => assign(state, {
    utxos: null 
  }),
  [setRefundAddress]: (state, { payload }) => assign(state, {
    refundAddress: payload
  }),
  [unsetRefundAddress]: (state) => assign(state, {
    refundAddress: null 
  })
}, {
  state: 'topup',
  utxos: null,
  refundAddress: null
})

export const objects = handleActions({
  [setAccount]: (state, { payload }) => assign(state, {
    account: payload
  }),
  [setController]: (state, { payload }) => assign(state, {
    controller: payload
  }),
  [unsetAccount]: (state) => assign(state, {
    account: null,
    controller: null
  })
}, {
  account: null,
  controller: null
})

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    filtering,
    toggles,
    sorts,
    streams,
    registerer,
    player,
    router,
    funds,
    objects,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
