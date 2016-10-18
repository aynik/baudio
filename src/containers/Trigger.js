import { connect } from 'react-redux'
import { trigger } from '../actions'

const mapDispatchToProps = (dispatch, { value }) => {
  return {
    onClick: () => {
      dispatch(trigger(value))
    }
  }
}

export const Trigger = connect(
	null,
  mapDispatchToProps
)

export default Trigger
