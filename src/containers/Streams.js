import sortBy from 'sort-by'
import { connect } from 'react-redux'
import { compose } from 'redux'

import Filtered from './Filtered'
import Sorted from './Sorted'
import Loader from './Loader'

const sortField = (order, field) => order ? (order > 0 ? '' : '-') + field : false

export const computeStreams = ({ streams, filtering, sorts }) => {
  return Object.keys(streams).map(id => streams[id])
    .filter(item => filtering ? item.name.indexOf(filtering) > -1 : true)
    .sort(sortBy(sortField(sorts.bph, 'bph') || '-listeners'))
}

const mapStateToProps = (state) => ({
  streams: computeStreams(state),
  stream: state.player.stream
})

export const Streams = connect(
  mapStateToProps,
  null
)(compose(
  Filtered,
  Sorted,
  Loader
)(require('../components/Streams').default))

export default Streams
