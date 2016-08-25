import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  filter: state.filtering
})

export const Filtered = connect(
	mapStateToProps,
	null
)

export default Filtered
