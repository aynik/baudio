import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import vmeter from 'volume-meter'
import classNames from 'classnames'

import classes from '../styles/styles.scss'

export class Player extends React.Component {
  static propTypes = {
    source: PropTypes.string,
    stream: PropTypes.object,
    isPlaying: PropTypes.bool,
    isUpdated: PropTypes.bool,
    isConfirmed: PropTypes.bool,
    onProgress: React.PropTypes.func,
    onTimeUpdate: React.PropTypes.func,
    onEnd: React.PropTypes.func,
    onUpdated: React.PropTypes.func
  }

  static defaultProps = {
    source: '',
    stream: {},
    isPlaying: false,
    isUpdated: false,
    isConfirmed: false,
    onProgress () {},
    onTimeUpdate () {},
    onEnd () {},
    onUpdated () {}
  }

  componentDidMount = () => {
    const audio = this.audio = new Audio()
    const context = this.context = new AudioContext()
    const src = context.createMediaElementSource(audio)

    const node = ReactDOM.findDOMNode(this)

    const meter = this.meter = vmeter(context, { tweenIn: 2, tweenOut: 6 }, vol => {
      const { bph } = this.props.stream
      const hsla = `hsla(${100 - (bph || 100)}, 100%, ${vol}%, ${vol ? 1 : 0})`
      node.style.borderColor = hsla
    })

    src.connect(meter)
    src.connect(context.destination)

    audio.addEventListener('progress', this.handleProgress)
    audio.addEventListener('timeupdate', this.handleTimeUpdate)
    audio.addEventListener('ended', this.handleMediaEnd)

    this.updateIsPlaying()
  }

  componentDidUpdate = (prevProps) => {
    if (prevProps.source !== this.props.source) {
      this.updateSource()
    }

    if (prevProps.isPlaying !== this.props.isPlaying) {
      this.updateIsPlaying()
    }

    if (this.props.isUpdated) {
      this.props.onUpdated()
    }
  }

  componentWillUnmount = () => {
    const { audio } = this

    audio.removeEventListener('progress', this.handleProgress)
    audio.removeEventListener('timeupdate', this.handleTimeUpdate)
    audio.removeEventListener('ended', this.handleMediaEnd)
  }

  handleTimeUpdate = () => {
    const { audio } = this
    const { currentTime } = audio

    this.props.onTimeUpdate({
      currentTime
    })
  }

  handleMediaEnd = () => {
    this.props.onEnd()
  }

  handleProgress = () => {
    const { audio } = this
    const { buffered } = audio

    this.props.onProgress({
      buffered
    })
  }

  updateIsPlaying = () => {
    const { audio } = this
    const { isPlaying } = this.props

    if (isPlaying) {
      audio.play()
    } else {
      audio.pause()
    }
  }

  updateSource = () => {
    const { audio } = this
    const { source, isPlaying } = this.props

    audio.pause()

    this.props.onTimeUpdate({
      currentTime: 0
    })

    audio.crossOrigin = 'anonymous'
    audio.preload = 'none'
    audio.src = source

    if (source && isPlaying) {
      audio.play()
    }
  }

  render = () => {
    const { isPlaying, stream, source, onClick } = this.props
    const { isConfirmed } = this.props
    let info = stream.info || ''
    return (
      <footer>
        <section className={classes.controls}>
          <button id='play' className={classNames(classes.play, {
            [classes.active]: isPlaying
          })} onClick={onClick} value={isPlaying ? 'playing' : ''} >
            <i />
          </button>
        </section>
        <section>
          <article className={classNames({
            [classes.invalid]: !source
          })}>
            <main>{stream.name}</main>
            {info ? <summary
              className={classNames({
                [classes.incoming]: !isConfirmed
              })}><em>&lt;</em>&nbsp;{info}</summary> : ''}
          </article>
        </section>
      </footer>
    )
  }
}

Player.propTypes = {
  isPlaying: PropTypes.bool,
  stream: PropTypes.object,
  source: PropTypes.string,
  onClick: PropTypes.func
}

export default Player
