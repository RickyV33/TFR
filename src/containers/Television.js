import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import getYoutubeId from 'get-youtube-id'

import { getHotVideos } from '../redux/modules/videos'
import { getAccessToken } from '../redux/modules/authorization'
import { getPreviouslyPlayedVideo, getNextVideo } from '../redux/modules/user'
import YouTube from '../components/YouTube'
import '../style/style.css'

export class Television extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    this.props.getAccessToken().then(() => {
      this.props.getHotVideos('videos')
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
    if (this.props.user.current) {
      let videoId = getYoutubeId(this.props.videos.byId[this.props.user.current].url)
      let videoTitle = this.props.videos.byId[this.props.user.current].title
      let upNextTitle = this.props.videos.byId[this.props.user.upNext[0]].title
      return (
        <div>
          <h2>Up Next: {upNextTitle}</h2>
          <h1>{videoTitle}</h1>
          <input type='button' onClick={this.props.getPreviouslyPlayedVideo} value='prev' />
          <YouTube videoId={videoId} opts={opts} />
          <input type='button' onClick={this.props.getNextVideo} value='next' />
        </div>
      )
    }
    return <div>loading</div>
  }
}

const mapStateToProps = ({ videos, user }) => ({ videos, user })
const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getHotVideos, getAccessToken, getPreviouslyPlayedVideo, getNextVideo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Television)
