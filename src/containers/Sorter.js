import { connect } from 'react-redux'
import { sort } from '../actions'

const mapDispatchToProps = (dispatch, { value }) => {
  return {
    onClick: () => {
      dispatch(sort(value))
    }
  }
}

export const Sorter = connect(
  null,
  mapDispatchToProps
)

export default Sorter
