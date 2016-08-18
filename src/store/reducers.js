import { combineReducers } from 'redux'
import { routerReducer as router } from 'react-router-redux'
import { isToggle } from './actions'

function display (state = {}, action) {
  if (isToggle(action)) {
    return Object.assign({}, state, {
      [action.target]: !state[action.target]
    })
  }
  return state
}

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    display,
    router,
    ...asyncReducers
  })
}

export const injectReducer = (store, { key, reducer }) => {
  store.asyncReducers[key] = reducer
  store.replaceReducer(makeRootReducer(store.asyncReducers))
}

export default makeRootReducer
