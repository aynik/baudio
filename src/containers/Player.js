import { connect } from 'react-redux'
import { compose } from 'redux'

import PlayerToggler from './PlayerToggler'
import PlayerUpdater from './PlayerUpdater'

const computeSource = ({ id }) => (
  id ? `https://192.168.1.11:8000/stream/${id}` : ''
)

const mapStateToProps = (state) => ({
  source: computeSource(state.player.stream),
  stream: state.player.stream,
  isPlaying: state.player.isPlaying
})

export const Player = connect(
  mapStateToProps,
  null
)(compose(
  PlayerToggler,
  PlayerUpdater
)(require('../components/Player').default))

export default Player
