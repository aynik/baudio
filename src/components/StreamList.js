import React, { PropTypes } from 'react'
import sortBy from 'sort-by'

import classes from '../styles/styles.scss'

const calcColour = (bph) => `hsla(${bph / 10}, ${bph * 4}%, 40%, 1)`

const reverseSort = (order) => order ? order > 0 ? -1 : 1 : 0
const sortField = (order, field) => order ? (order > 0 ? '' : '-') + field : false

export const StreamList = ({ streams, filter, sortListeners = 0, sortBph = 0 }) => (
  <section className={classes.streams}>
    <ul>
    {streams.filter(
      item => filter ? item.Name.indexOf(filter) > -1 : true
    ).sort(sortBy(
      sortField(reverseSort(sortListeners), 'Listeners') ||
      sortField(sortBph, 'Bph')
    )).map(({ Name, Listeners, Bph }, n) => (
       <li key={n}>
          <a style={{borderLeftColor: calcColour(Bph)}}>
            {Name}
          </a>
          <em>
            {Listeners}&nbsp;
            <i className={classes['icon-headphones']} />
          </em>
          <span style={{color: calcColour(Bph)}}>
            {Bph} bph
          </span>
        </li>
    ))}
    </ul>
  </section>
)

StreamList.propTypes = {
  streams: PropTypes.array,
  filter: PropTypes.string,
  sortListeners: PropTypes.number,
  sortBph: PropTypes.number
}

export default StreamList
