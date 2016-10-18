import { connect } from 'react-redux'
import { push } from 'react-router-redux'

const mapDispatchToProps = (dispatch, { value }) => {
  return {
    onClick: () => {
      dispatch(push(value))
    }
  }
}

export const Pusher = connect(
  null,
  mapDispatchToProps
)

export default Pusher
