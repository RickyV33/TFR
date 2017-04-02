import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import getYoutubeId from 'get-youtube-id'

import { getPreviouslyPlayedVideo, getNextVideo, selector } from '../redux/modules/user'
import { getHotVideos } from '../redux/modules/videos'
import { getAccessToken } from '../redux/modules/authorization'
import YouTube from '../components/YouTube'
import '../style/style.css'

export class Television extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.getAccessToken().then(() => {
      return this.props.getHotVideos('videos')
    }).then(() => {
      this.props.getNextVideo()
    })
  }

  render () {
    let videoPlayer
    const opts = {
      height: '500',
      width: '1000',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1,
        showinfo: 0,
        fs: 0,
        rel: 0
      }
    }
    if (this.props.currentVideo) {
      let videoId = getYoutubeId(this.props.currentVideo.url)
      let videoTitle = this.props.currentVideo.title
      let upNextTitle = this.props.nextVideo.title
      return (
        <div>
          <h2>Up Next: {upNextTitle}</h2>
          <h1>{videoTitle}</h1>
          <input type='button' onClick={() => this.props.getHotVideos('videos')} value='more' />
          <input type='button' onClick={this.props.getPreviouslyPlayedVideo} value='prev' />
          <YouTube videoId={videoId} opts={opts} />
          <input type='button' onClick={this.props.getNextVideo} value='next' />
        </div>
      )
    }
    return <div>loading</div>
  }
}

const mapStateToProps = state => selector(state)

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getHotVideos, getAccessToken, getPreviouslyPlayedVideo, getNextVideo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Television)
