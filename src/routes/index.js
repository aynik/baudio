import Main from '../containers/Main'
import Streams from './Streams'

export const createRoutes = (store) => ({
  path: '/',
  component: Main,
  indexRoute: Streams,
  childRoutes: [
  ]
})

export default createRoutes
