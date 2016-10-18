import { connect } from 'react-redux'
import { loadStreamChanges } from '../actions'

const mapStateToProps = (state) => ({
  isUpdated: state.player.isUpdated,
  isConfirmed: state.player.isConfirmed,
  updater: state.player.updater
})

const mapDispatchToProps = (dispatch, ownProps) => ({
  onUpdated: () => {
    const { id } = ownProps.stream
    dispatch(loadStreamChanges(id))
  }
})

export const PlayerUpdater = connect(
  mapStateToProps,
  mapDispatchToProps
)

export default PlayerUpdater
