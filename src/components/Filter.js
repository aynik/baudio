import React from 'react'

import classes from '../styles/styles.scss'

export const Filter = (props) => (
  <section>
    <div>
      <i className={classes['icon-search']} />
      <input type='text' />
      <button className={classes.rate}>Users</button>
      <button className={classes.price}>Price</button>
    </div>
  </section>
)

export default Filter
