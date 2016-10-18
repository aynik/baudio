import { connect } from 'react-redux'
import { playStream, pauseStream } from '../actions'

const mapDispatchToProps = (dispatch) => {
  return {
    onClick: (e) => {
      const playing = e.currentTarget.value === 'playing'
      dispatch(playing ? pauseStream() : playStream())
    }
  }
}

export const PlayerToggler = connect(
  null,
  mapDispatchToProps
)

export default PlayerToggler
