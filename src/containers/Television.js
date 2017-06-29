import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'
import Paper from 'material-ui/Paper'

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

    this.handleGetNextVideo = this.handleGetNextVideo.bind(this)
    this.handleGetPreviousVideo = this.handleGetPreviousVideo.bind(this)
  }

  componentWillMount () {
    this.props.getAccessToken()
      .then(this.props.getVideos)
      .then(() => this.props.getNextVideo(this.props.currentChannel.id))
  }

  handleGetNextVideo () {
    this.props.getNextVideo(this.props.currentChannel.id)
    this.props.getVideos()
  }

  handleGetPreviousVideo () {
    this.props.getPreviousVideo(this.props.currentChannel.id)
  }

  render () {
    const opts = {
      height: '500',
      width: '1000',
      // https://developers.google.com/youtube/player_parameters
      playerVars: {
        showinfo: 0,
        fs: 0,
        rel: 0,
        controls: 1
      }
    }
    if (this.props.currentVideo) {
      return (
        <Paper zDepth={2} >
          <h1>{this.props.currentNetwork.name} - {this.props.currentChannelName.name}</h1>
          <h1>next: {this.props.nextVideo.title}</h1>
          <h1>current: {this.props.currentVideo.title}</h1>
          <input type='button' onClick={this.handleGetPreviousVideo} value='prev' />
          <ReactPlayer
            url={this.props.currentVideo.url}
            playing
            onEnded={this.handleGetNextVideo}
            youtubeConfig={opts} />
          <input type='button' onClick={this.handleGetNextVideo} value='next' />
        </Paper>
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
