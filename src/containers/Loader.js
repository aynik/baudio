import { connect } from 'react-redux'
import { setStream, loadStream } from '../actions'

const mapDispatchToProps = (dispatch, { value }) => {
  return {
    onClick: (e) => {
      dispatch(setStream({ name: 'Loading...' }))
      dispatch(loadStream(e.currentTarget.value))
    }
  }
}

export const Loader = connect(
  null,
  mapDispatchToProps
)

export default Loader
