import React, { PropTypes } from 'react'

import classes from '../styles/styles.scss'

export const FilterButton = (props) => (
  <button className={classes['toggle-filter']} {...props} >
    <i className={classes['icon-filter']} />
  </button>
)

FilterButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default FilterButton
