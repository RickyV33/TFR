import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'

import { getAccessToken } from '../redux/modules/authorization'
import { selectCurrentChannel, selectCurrentChannelName,
   getNextVideo, getPreviousVideo } from '../redux/modules/channels'
import { selectCurrentNetwork } from '../redux/modules/networks'
import { getVideos, selectCurrentVideo } from '../redux/modules/videos'
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
      playerVars: {
        showinfo: 0,
        fs: 0,
        rel: 0,
        controls: 1
      }
    }
    if (this.props.currentVideo) {
      return (
        <div>
          <h1>{this.props.currentNetwork.name} - {this.props.currentChannelName.name}</h1>
          <h1>{this.props.currentVideo.title}</h1>
          <div style={{height: '75vh'}}>
            <input style={{float: 'left', width: '5%'}} type='button' onClick={this.handleGetPreviousVideo} value='prev' />
            <ReactPlayer
              url={this.props.currentVideo.url}
              onEnded={this.handleGetNextVideo}
              playing
              height='100%'
              width='90%'
              style={{display: 'inline-block', width: 'calc(100% - 80px)'}}
              youtubeConfig={opts} />
            <input style={{float: 'right', width: '5%'}} type='button' onClick={this.handleGetNextVideo} value='next' />
          </div>
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
