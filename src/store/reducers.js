import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { handleAction, handleActions } from 'redux-actions'
import { toggle, filter, sort, pushStream } from './actions'

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

export const streams = handleActions({
  [pushStream]: (state, { payload }) => {
    return state.concat(payload)
      .sort((a, b) => a.Bph - b.Bph)
  }
}, [])

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    toggles,
    sorts,
    filtering,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
