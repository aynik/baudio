import { connect } from 'react-redux'
import Application from '../components/Application'

const mapStateToProps = (state) => ({
  showMenu: state.toggles.menu,
  showFilter: state.toggles.filter
})

export const Main = connect(
	mapStateToProps,
	null
)(Application)

export default Main
