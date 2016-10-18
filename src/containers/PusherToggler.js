import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { toggle } from '../actions'

const mapDispatchToProps = (dispatch, { value }) => {
  return {
    onClick: () => {
      dispatch(push(value))
      dispatch(toggle(value))
    }
  }
}

export const PusherToggler = connect(
  null,
  mapDispatchToProps
)

export default PusherToggler
