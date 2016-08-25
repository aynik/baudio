import Streams from './Streams'
import Main from '../containers/Main'

export const createRoutes = (store) => ({
  path: '/',
  component: Main,
  indexRoute: {
    onEnter: (nextState, replace) => replace('streams')
  },
  childRoutes: [
    Streams(store)
  ]
})

export default createRoutes
