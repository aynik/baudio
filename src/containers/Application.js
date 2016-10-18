import { connect } from 'react-redux'

const mapStateToProps = (state) => ({
  showFunds: state.toggles.funds,
  showFilter: state.toggles.filter,
  showAdd: state.toggles.add
})

export const Application = connect(
  mapStateToProps,
  null
)(require('../components/Application').default)

export default Application
