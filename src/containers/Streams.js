import sortBy from 'sort-by'
import { connect } from 'react-redux'
import Filtered from './Filtered'
import Sorted from './Sorted'
import StreamList from '../components/StreamList'

const sortField = (order, field) => order ? (order > 0 ? '' : '-') + field : false

export const computeStreams = (state) => {
  if (!state.streams) return []

  return Object.keys(state.streams).map(id => state.streams[id])
    .filter(item => state.filtering ? item.name.indexOf(state.filtering) > -1 : true)
    .sort(sortBy(sortField(state.sorts.bph, 'bph') || '-listeners'))
}

const mapStateToProps = (state) => ({
  streams: computeStreams(state)
})

export const Streams = connect(
  mapStateToProps,
  null
)(Filtered(Sorted(StreamList)))

export default Streams
