import { connect } from 'react-redux'
import { filter } from '../actions'

const mapStateToProps = (state) => ({
  filter: state.filtering
})

const mapDispatchToProps = (dispatch) => {
  return {
    onChange: (e) => {
      dispatch(filter(e.currentTarget.value))
    },
    onClick: () => {
      dispatch(filter(''))
    }
  }
}

export const Filterer = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default Filterer
