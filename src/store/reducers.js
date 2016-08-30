import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { handleAction } from 'redux-actions'
import { toggle, filter, sort, pushStreams } from './actions'

export const toggles = handleAction(toggle, {
  next: (state, action) => Object.assign({}, state, {
    [action.payload]: !state[action.payload]
  })
}, {})

export const filtering = handleAction(filter, {
  next: (state, action) => action.payload
}, '')

export const sorts = handleAction(sort, {
  next: (state, action) => {
    return {
      [action.payload]: ((1 + (state[action.payload] || 0) + 1) % 3) - 1
    }
  }
}, {})

export const streams = handleAction(pushStreams, {
  next: (state, { payload }) => {
    return Object.assign({}, state,
      payload.reduce((nextState, stream) => Object.assign(nextState, {
        [stream.id]: stream
      }), {}))
  }
}, {})

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    toggles,
    filtering,
    sorts,
    streams,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
