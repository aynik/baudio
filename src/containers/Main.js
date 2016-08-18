import { connect } from 'react-redux'
import Application from '../components/Application'

const mapStateToProps = (state) => ({
  showMenu: state.display.menu,
  showFilter: state.display.filter
})

export const Main = connect(
	mapStateToProps,
	null
)(Application)

export default Main
