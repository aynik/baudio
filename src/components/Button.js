import React, { PropTypes } from 'react'

import classes from '../styles/styles.scss'

export const Button = (props) => (
  <button className={classes[props.value]} {...props} >
    { props.children }
  </button>
)

Button.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.node
}

export default Button
