import { injectReducer } from '../store/reducers'
import { fetchStreams } from '../store/actions'

const Streams = (store) => ({
  path: 'streams',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Streams = require('../containers/Streams').default
      const reducer = require('../store/reducers').streams
      injectReducer(store, { key: 'streams', reducer })
      store.dispatch(fetchStreams())
      cb(null, Streams)
    }, 'streams')
  }
})

export default Streams
