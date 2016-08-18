import React, { PropTypes } from 'react'
import classNames from 'classnames'
import Streams from '../containers/Streams'
import Header from './Header'
import Controls from './Controls'
import Menu from './Menu'

import classes from '../styles/styles.scss'

export const Application = ({ showMenu, showFilter }) => (
  <div className={classes.root}>
    <section className={
      classNames(classes.container, {
        [classes['show-menu']]: showMenu
      })}>
      <section className={
        classNames(classes.content, {
          [classes['show-filter']]: showFilter
        })}>
        <Header />
        <Streams />
        <Controls />
      </section>
      <Menu />
    </section>
  </div>
)

Application.propTypes = {
  showMenu: PropTypes.bool,
  showFilter: PropTypes.bool
}

export default Application
