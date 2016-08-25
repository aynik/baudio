import { connect } from 'react-redux'
import Filtered from './Filtered'
import Sorted from './Sorted'
import StreamList from '../components/StreamList'

const mapStateToProps = (state) => ({
  streams: state.streams
})

export const Streams = connect(
	mapStateToProps,
	null
)(Filtered(Sorted(StreamList)))

export default Streams
