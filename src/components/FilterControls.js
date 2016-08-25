import React, { PropTypes } from 'react'
import classNames from 'classnames'
import Sorter from '../containers/Sorter'
import Button from './Button'

import classes from '../styles/styles.scss'

const SorterButton = Sorter(Button)

const sortClass = (order) => classNames({
  [classes['sort-desc']]: order > 0,
  [classes['sort-asc']]: order < 0
})

export const FilterControls = ({ sortListeners, sortBph, onChange }) => (
  <section>
    <div>
      <i className={classes['icon-search']} />
      <input type='text' onChange={onChange} />
      <SorterButton value='listeners' className={sortClass(sortListeners)}>
        Users
      </SorterButton>
      <SorterButton value='bph'
        className={`${classes.price} ${sortClass(sortBph)}`}>
          Price
      </SorterButton>
    </div>
  </section>
)

FilterControls.propTypes = {
  sortListeners: PropTypes.number,
  sortBph: PropTypes.number,
  onChange: PropTypes.func
}

export default FilterControls
