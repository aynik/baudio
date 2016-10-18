import { connect } from 'react-redux'
import { compose } from 'redux'

import Filterer from './Filterer'
import Sorted from './Sorted'

export const Filter = connect(state => state)(compose(
  Filterer,
  Sorted
)(require('../components/Filter').default))

export default Filter
