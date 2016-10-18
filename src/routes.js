import Application from './containers/Application'
import { injectReducer } from './reducers'
import { loadStreams } from './actions'

export default (store) => ({
  path: '/',
  getComponent (_, cb) {
    require.ensure([], (require) => {
      const reducer = require('./reducers').streams
      injectReducer(store, { key: 'streams', reducer })
      store.dispatch(loadStreams())
      cb(null, Application)
    })
  }
})
