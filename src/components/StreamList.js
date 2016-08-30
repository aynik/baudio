import React, { PropTypes } from 'react'
import shallowEqual from 'shallowequal'
import classNames from 'classnames'

import { AutoSizer, VirtualScroll } from 'react-virtualized'
import 'react-virtualized/styles.css'

import classes from '../styles/styles.scss'

const calcColour = (bph) => `hsla(${100 - bph}, ${50 + bph / 2}%, 40%, 1)`

export class StreamList extends React.Component {
  static propTypes = {
    streams: PropTypes.array,
    filter: PropTypes.string,
    sortBph: PropTypes.number
  }

  shouldComponentUpdate (nextProps, nextState) {
    const render = !shallowEqual(nextProps, this.props)
    if (render && this.virtualScroll) this.virtualScroll.forceUpdateGrid()
    return render
  }

  renderItem = ({ index, isScrolling }) => {
    const { streams } = this.props
    const { name, listeners, bph } = streams[index]
    return (
      <div className={classes.stream}>
        <a style={{borderLeftColor: calcColour(bph)}}>
          {name}
        </a>
        <em>
          {listeners}&nbsp;
          <i className={classes['icon-headphones']} />
        </em>
        <span style={{color: calcColour(bph)}}>
          {bph} bph
        </span>
      </div>
    )
  }

  renderNoItems () {
    const { streams } = this.props
    const streamsLength = streams ? streams.length : 0

    return (<div className={classNames(classes.streams, {
      [classes.loading]: !('streams' in this.props),
      [classes['no-stream']]: !streamsLength
    })} />)
  }

  render () {
    const { streams } = this.props
    const streamsLength = streams ? streams.length : 0

    return (
      <section className={classes.streams}>
        { streamsLength
          ? <AutoSizer>
             {({ width, height }) => (
                <VirtualScroll
                  ref={(ref) => { this.virtualScroll = ref }}
                  height={height}
                  width={width}
                  className={classes['stream-list']}
                  overscanRowCount={0}
                  rowRenderer={this.renderItem}
                  rowCount={streamsLength}
                  rowHeight={36}
                />
              )}
          </AutoSizer>
          : this.renderNoItems()
        }
      </section>
    )
  }
}

export default StreamList
