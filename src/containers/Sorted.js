import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  sortBph: state.sorts.bph,
  sortListeners: state.sorts.listeners
})

export const Sorted = connect(
	mapStateToProps,
  null
)

export default Sorted
