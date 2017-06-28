import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'

import { getAccessToken } from '../redux/modules/authorization'
import { selectCurrentChannel, selectCurrentChannelName,
   getNextVideo, getPreviousVideo } from '../redux/modules/channels'
import { selectCurrentNetwork } from '../redux/modules/networks'
import { getVideos, selectCurrentVideo, selectPreviousVideo,
  selectNextVideo } from '../redux/modules/videos'
import '../style/style.css'

export class Television extends Component {
  constructor (props) {
    super(props)

    this.getNextVideoClickHandler = this.getNextVideoClickHandler.bind(this)
    this.getPreviousVideoClickHandler = this.getPreviousVideoClickHandler.bind(this)
    this.getVideos = this.getVideos.bind(this)
  }

  componentWillMount () {
    this.props.getAccessToken()
      .then(() => this.getVideos())
      .then(() => this.props.getNextVideo(this.props.currentChannel.id))
  }

  getNextVideoClickHandler () {
    this.props.getNextVideo(this.props.currentChannel.id)
    this.getVideos()
  }

  getPreviousVideoClickHandler () {
    this.props.getPreviousVideo(this.props.currentChannel.id)
  }

  getVideos () {
    const networkName = this.props.currentNetwork.name
    const channelUrlPath = this.props.currentChannelName.urlPath
    const channelId = this.props.currentChannel.id
    const after = this.props.currentChannel.after
    return this.props.getVideos(networkName, channelUrlPath, channelId, after)
  }

  render () {
    const opts = {
      height: '500',
      width: '1000',
      // https://developers.google.com/youtube/player_parameters
      playerVars: {
        autoplay: 1,
        showinfo: 0,
        fs: 0,
        rel: 0
      }
    }
    if (this.props.currentVideo) {
      const channelId = this.props.currentChannel.id
      return (
        <div>
          <h1>{this.props.currentNetwork.name}</h1>
          <h1>{this.props.currentChannelName.name}</h1>
          <h1>{this.props.nextVideo.title}</h1>
          <h1>{this.props.currentVideo.title}</h1>
          <input type='button' onClick={this.getPreviousVideoClickHandler} value='prev' />
          <ReactPlayer url={this.props.currentVideo.url} opts={opts} />
          <input type='button' onClick={this.getNextVideoClickHandler} value='next' />
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
    currentVideo: selectCurrentVideo(state),
    prevousVideo: selectPreviousVideo(state),
    nextVideo: selectNextVideo(state)
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getAccessToken, getVideos, getNextVideo, getPreviousVideo
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Television)
