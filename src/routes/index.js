import Streams from './Streams'
import StreamList from '../components/StreamList'
import Main from '../containers/Main'

export const createRoutes = (store) => ({
  path: '/',
  component: Main,
  indexRoute: {
    component: StreamList,
    onEnter: (nextState, replace) => replace('streams')
  },
  childRoutes: [
    Streams(store)
  ]
})

export default createRoutes
