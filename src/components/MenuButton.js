import React, { PropTypes } from 'react'

import classes from '../styles/styles.scss'

export const MenuButton = (props) => (
  <button className={classes['toggle-menu']} {...props} >
    <i className={classes['icon-menu']} />
  </button>
)

MenuButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default MenuButton
