import React from 'react'
import './video.scss'
import 'video-react/dist/video-react.css'
import {
  Player,
  ControlBar,
  ReplayControl,
  ForwardControl,
  CurrentTimeDisplay,
  TimeDivider,
  PlaybackRateMenuButton,
  VolumeMenuButton,
  BigPlayButton,
} from 'video-react'
import videoClose from './images/close.png'

class Video extends React.Component {
  constructor() {
    super()
    this.state = {}
    this.play = this.play.bind(this)
    this.pause = this.pause.bind(this)
    this.closeFn = this.closeFn.bind(this)
  }

  componentDidMount() {
    // do something here
    this.play()
  }

  play() {
    this.players.load()
    this.players.play()
  }

  pause() {
    this.players.pause()
  }

  closeFn() {
    const {
      videoFlagFn,
    } = this.props
    this.pause()
    videoFlagFn(false)
  }

  render() {
    const {
      videoSrc,
      videoImg,
    } = this.props
    return (
      <div className="video">
        <div className="video-player">
          <Player
            ref={(players) => {
              this.players = players
            }}
            fluid={false}
            width={880}
            height={496}
            poster={videoImg}
          >
            <source src={videoSrc} />
            <BigPlayButton position="center" />
            <ControlBar>
              <ReplayControl seconds={10} order={1.1} />
              <ForwardControl seconds={30} order={1.2} />
              <CurrentTimeDisplay order={4.1} />
              <TimeDivider order={4.2} />
              <PlaybackRateMenuButton
                rates={[5, 2, 1, 0.5, 0.1]}
                order={7.1}
              />
              <VolumeMenuButton disabled />
            </ControlBar>
          </Player>
          <div className="video-close" onClick={this.closeFn}>
            <img src={videoClose} alt="close" />
          </div>
        </div>
      </div>
    )
  }
}

export default Video
