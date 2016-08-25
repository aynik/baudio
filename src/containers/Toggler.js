import { connect } from 'react-redux'
import { toggle } from '../store/actions'

const mapDispatchToProps = (dispatch, { value }) => {
  return {
    onClick: () => {
      dispatch(toggle(value))
    }
  }
}

export const Toggler = connect(
  null,
  mapDispatchToProps
)

export default Toggler
