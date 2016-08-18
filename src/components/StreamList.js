import React from 'react'

import classes from '../styles/styles.scss'

export const StreamList = (props) => (
  <section className={classes.streams}>
    <ul>
      { (() => {
        var words = ['Radio', 'FM', 'Signal', '84.4', 'News', 'Fantastic']
        var random = function () { return Math.round(Math.random()) }
        var elements = []
        for (var p, o, n = 0, d, l = 100; n < l; n++) {
          o = words.sort(random).slice(parseInt(Math.random() * 3, 10))
          o = o.slice(0, 1 + parseInt(Math.random() * 4, 10))
          p = 1 + parseInt(Math.random() * 99, 10)
          d = `hsla(${0 + (20 - p / 25)}, ${p}%, 40%, 1)`
          elements.push(<li key={n}>
            <a style={{borderLeftColor: d}}>
              {o.join(' ')}
            </a>
            <em>
              {Math.round(Math.random() * 1000)}&nbsp;
              <i className={classes['icon-headphones']} />
            </em>
            <span style={{color: d}}>
              {p} bph
            </span>
          </li>)
        }
        return elements
      })() }
    </ul>
  </section>
)

export default StreamList
