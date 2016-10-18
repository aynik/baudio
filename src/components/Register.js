import React, { PropTypes } from 'react'
import Toggler from '../containers/Toggler'
import Button from './Button'
import IconButton from './IconButton'

const TogglerButton = Toggler(Button)

import classes from '../styles/styles.scss'

export class Register extends React.Component {
  componentDidUpdate = () => {
    if (this.props.isRegistering) {
      this.props.onRegistering(this.props.url)
    }
  }

  render = () => {
    const { url, state, info, onChange, onClick } = this.props
    return (<div>
      <i className={classes['icon-url']} />
      <input type='text' placeholder='Your stream URL'
        onChange={onChange} value={url} />
      { url.length
        ? <IconButton value='cancel' onClick={onClick} />
        : '' }
      { state === 'ok'
        ? <TogglerButton value='add'>
          Ok
        </TogglerButton>
        : <TogglerButton value='register'>
          Register
        </TogglerButton> }
      <p className={classes[state]}>
        <i className={classes[`icon-${state}`]} />
        { info }
      </p>
    </div>)
  }
}

Register.propTypes = {
  isRegistering: PropTypes.bool,
  url: PropTypes.string,
  info: PropTypes.string,
  state: PropTypes.string,
  onRegistering: PropTypes.func,
  onChange: PropTypes.func,
  onClick: PropTypes.func
}

export default Register
