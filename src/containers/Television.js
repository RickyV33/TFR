import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'
import IconButton from 'material-ui/IconButton'
import SkipNext from 'material-ui/svg-icons/av/skip-next'
import SkipPrevious from 'material-ui/svg-icons/av/skip-previous'
import { indigo500 } from 'material-ui/styles/colors'

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
      const televisionContainerStyle = {
      //   height: 'calc(100% - 117px) !important',
        border: '2px solid',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }

      const videoTitleStyle = {
        fontSize: '20px',
        lineHeight: '28px',
        fontWeight: '400',
        color: indigo500
      }

      const reactPlayerStyle = {
      }

      return (
        <div>
          <h2 style={videoTitleStyle} >{this.props.currentVideo.title}</h2>
          <div style={televisionContainerStyle} >
            <IconButton onTouchTap={this.handleGetPreviousVideo} >
              <SkipPrevious />
            </IconButton>
            <ReactPlayer
              url={this.props.currentVideo.url}
              onEnded={this.handleGetNextVideo}
              onError={this.handleGetNextVideo}
              height='100%'
              width='100%'
              style={reactPlayerStyle}
              youtubeConfig={opts} />
            <IconButton onTouchTap={this.handleGetNextVideo} >
              <SkipNext />
            </IconButton>
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
