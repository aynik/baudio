import { connect } from 'react-redux'
import { filter } from '../store/actions'

const mapDispatchToProps = (dispatch, props) => {
  return {
    onChange: (e) => {
      dispatch(filter(e.target.value))
    }
  }
}

export const Filterer = connect(
  null,
  mapDispatchToProps
)

export default Filterer
