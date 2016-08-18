import { connect } from 'react-redux'
import { toggle } from '../store/actions'

export const Toggler = (type) => {
  const mapDispatchToProps = (dispatch) => {
    return {
      onClick: (e) => {
        dispatch(toggle(type))
      }
    }
  }

  return connect(
    null,
    mapDispatchToProps
  )
}

export default Toggler
