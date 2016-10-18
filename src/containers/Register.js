import { connect } from 'react-redux'
import { toggle, registerUrl, registerStream } from '../actions'

const mapStateToProps = (state) => ({
  isRegistering: state.toggles.register,
  url: state.registerer.url,
  state: state.registerer.state,
  info: state.registerer.info
})

const mapDispatchToProps = (dispatch) => ({
  onClick: _ => {
    dispatch(registerUrl(''))
  },
  onChange: (e) => {
    dispatch(registerUrl(e.currentTarget.value))
  },
  onRegistering: (url) => {
    dispatch(toggle('register'))
    dispatch(registerStream(url))
  }
})

export const Register = connect(
  mapStateToProps,
  mapDispatchToProps
)(require('../components/Register').default)

export default Register
