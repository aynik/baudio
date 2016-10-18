import React, { PropTypes } from 'react'
import classNames from 'classnames'
import Sorter from '../containers/Sorter'
import Button from './Button'
import IconButton from './IconButton'

import classes from '../styles/styles.scss'

const SorterButton = Sorter(Button)

const sortClass = (order) => classNames({
  [classes['sort-desc']]: order > 0,
  [classes['sort-asc']]: order < 0
})

export const Filter = ({ sortBph, filter, onChange, onClick }) => (
  <div>
    <i className={classes['icon-search']} />
    <input type='text' placeholder='Stream name'
      onChange={onChange} value={filter} />
    { filter ? <IconButton value='cancel' onClick={onClick} /> : '' }
    <SorterButton value='bph'
      className={`${classes.price} ${sortClass(sortBph)}`}>
        Price
    </SorterButton>
  </div>
)

Filter.propTypes = {
  sortBph: PropTypes.number,
  filter: PropTypes.string,
  onClick: PropTypes.func,
  onChange: PropTypes.func
}

export default Filter
