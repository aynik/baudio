import { connect } from 'react-redux'
import { filter } from '../store/actions'

const mapDispatchToProps = (dispatch, props) => {
  return {
    onChange: (e) => {
      dispatch(filter(e.target.value))
    },
    onClick: () => {
      dispatch(filter(''))
    }
  }
}

const mapStateToProps = (state) => ({
  filter: state.filtering
})

export const Filterer = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default Filterer
