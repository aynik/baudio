import React, { PropTypes } from 'react'
import classNames from 'classnames'
import Player from '../containers/Player'
import Streams from '../containers/Streams'
import Funding from '../containers/Funding'
import Header from './Header'

import classes from '../styles/styles.scss'

export const Application = ({ showFunds, showFilter, showAdd }) => (
  <div className={classes.root}>
    <section className={
      classNames(classes.container, {
        [classes['show-funds']]: showFunds
      })}>
      <section className={
        classNames(classes.content, {
          [classes['show-add']]: showAdd,
          [classes['show-filter']]: showFilter
        })}>
        <Header />
        <Streams />
        <Player />
      </section>
      <Funding />
    </section>
  </div>
)

Application.propTypes = {
  showFunds: PropTypes.bool,
  showFilter: PropTypes.bool,
  showAdd: PropTypes.bool,
  fundingState: PropTypes.string
}

export default Application
