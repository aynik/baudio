import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { Router, useRouterHistory } from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import { Provider } from 'react-redux'
import createStore from './store/createStore'
import defaultRoute from './routes/index'

const browserHistory = useRouterHistory(createBrowserHistory)({
  basename: __BASENAME__
})

const initialState = window.___INITIAL_STATE__

const store = createStore(initialState, browserHistory,
  window.devToolsExtension && window.devToolsExtension())

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: (state) => state.router
})

const MOUNT_NODE = document.getElementById('root')

let render = () => {
  const routes = defaultRoute(store)

  ReactDOM.render(
    <Provider store={store}>
      <Router history={history} children={routes} />
    </Provider>,
    MOUNT_NODE
  )
}

render()
