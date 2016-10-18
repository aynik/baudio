import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'
import createSocketIoMiddleware from 'redux-socket.io'
import io from 'socket.io-client'

import { makeRootReducer } from './reducers'

export default (initialState = {}, history) => {
  const middleware = [
    thunk,
    routerMiddleware(history),
    createSocketIoMiddleware(io('https://localhost:8000'))
  ]

  const enhancers = [compose(
    persistState([
      'streams',
      'sorts',
      'filtering',
      'toggles'
    ]),
  )]

  if (__DEBUG__) {
    const devToolsExtension = window.devToolsExtension
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  const store = Object.assign(createStore(
    makeRootReducer(),
    initialState,
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  ), { asyncReducers: {} })

  return store
}
