import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import getYoutubeId from 'get-youtube-id'

import { getAccessToken } from '../redux/modules/authorization'
import { selectCurrentChannel, selectCurrentChannelName,
   getNextVideo, getPreviousVideo } from '../redux/modules/channels'
import { selectCurrentNetwork } from '../redux/modules/networks'
import { getVideos, selectCurrentVideo } from '../redux/modules/videos'
import YouTube from '../components/YouTube'
import '../style/style.css'

export class Television extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    this.props.getAccessToken().then(() => {
      const networkName = this.props.currentNetwork.name
      const channelName = this.props.currentChannelName.name
      const channelUrlPath = this.props.currentChannelName.urlPath
      const channelId = this.props.currentChannel.id
      return this.props.getVideos(networkName, channelUrlPath, channelId)
    }).then(() => {
      this.props.getNextVideo(this.props.currentChannel.id)
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
    const channelId = this.props.currentChannel.id
    // console.log(this.props.currentChannel)
    // console.log(this.props.currentNetwork)
      // let videoTitle = this.props.currentVideo.title
      // let upNextTitle = this.props.nextVideo.title
          // <input type='button' onClick={() => this.props.getHotVideos('videos')} value='more' />
    if (this.props.currentVideo) {
      const videoId = getYoutubeId(this.props.currentVideo.url)
      return (
        <div>
          <h1>{this.props.currentNetwork.name}</h1>
          <h1>{this.props.currentChannelName.name}</h1>
          <input type='button' onClick={() => this.props.getPreviousVideo(channelId)} value='prev' />
          <YouTube videoId={videoId} opts={opts} />
          <input type='button' onClick={() => this.props.getNextVideo(channelId)} value='next' />
        </div>
      )
    }
    return <div>LOADING</div>
  }
}

const mapStateToProps = state => {
  return {
    currentChannel: selectCurrentChannel(state),
    currentChannelName: selectCurrentChannelName(state),
    currentNetwork: selectCurrentNetwork(state),
    currentVideo: selectCurrentVideo(state)
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getAccessToken, getVideos, getNextVideo, getPreviousVideo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Television)
