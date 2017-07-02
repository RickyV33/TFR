import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ReactPlayer from 'react-player'
import IconButton from 'material-ui/IconButton'
import SkipNext from 'material-ui/svg-icons/av/skip-next'
import SkipPrevious from 'material-ui/svg-icons/av/skip-previous'
import { indigo500 } from 'material-ui/styles/colors'
import CircularProgress from 'material-ui/CircularProgress'

import { getAccessToken } from '../redux/modules/authorization'
import { selectCurrentChannel, selectCurrentChannelName,
   getNextVideo, getPreviousVideo } from '../redux/modules/channels'
import { selectCurrentNetwork } from '../redux/modules/networks'
import { getVideos, selectCurrentVideo } from '../redux/modules/videos'
import '../style/style.css'

export class Television extends Component {
  constructor (props) {
    super(props)

    this.state = {
      hoverPreviousButton: false,
      hoverNextButton: false
    }
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
    const televisionContainerStyle = {
      height: 'calc(100vh - 135px)',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }
    const videoTitleStyle = {
      fontSize: '20px',
      lineHeight: '28px',
      fontWeight: '400',
      color: indigo500,
      marginLeft: '48px',
      marginRight: '48px'
    }
    const iconButtonStyle = {
      height: '100%'
    }
    const grayStyle = {
      backgroundColor: '#cccccc'
    }
    const loadingScreenStyle = {
      ...televisionContainerStyle,
      justifyContent: 'center'
    }
    if (this.props.currentVideo) {
      let onHoverPreviousStyle = this.state.hoverPreviousButton ? grayStyle : {}
      let onHoverNextStyle = this.state.hoverNextButton ? grayStyle : {}
      return (
        <div>
          <h2 style={videoTitleStyle} >{this.props.currentVideo.title}</h2>
          <div style={televisionContainerStyle} >
            <IconButton
              onMouseOver={() => this.setState({ hoverPreviousButton: true })}
              onMouseLeave={() => this.setState({ hoverPreviousButton: false })}
              style={{...iconButtonStyle, ...onHoverPreviousStyle}}
              onTouchTap={this.handleGetPreviousVideo}
              disableTouchRipple >
              <SkipPrevious />
            </IconButton>
            <ReactPlayer
              url={this.props.currentVideo.url}
              onEnded={this.handleGetNextVideo}
              onError={this.handleGetNextVideo}
              playing
              height='100%'
              width='100%'
              youtubeConfig={opts} />
            <IconButton
              onMouseOver={() => this.setState({ hoverNextButton: true })}
              onMouseLeave={() => this.setState({ hoverNextButton: false })}
              style={{...iconButtonStyle, ...onHoverNextStyle}}
              onTouchTap={this.handleGetNextVideo}
              disableTouchRipple >
              <SkipNext />
            </IconButton>
          </div>
        </div>
      )
    }
    return (
      <div style={loadingScreenStyle} >
        <CircularProgress color={indigo500} size={80} thickness={5} />
      </div>
    )
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
