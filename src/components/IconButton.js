import React, { PropTypes } from 'react'

import classes from '../styles/styles.scss'

export const IconButton = (props) => (
  <button className={classes[`button-${props.value}`]} {...props} >
    <i className={classes[`icon-${props.value}`]} />
  </button>
)

IconButton.propTypes = {
  value: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired
}

export default IconButton
