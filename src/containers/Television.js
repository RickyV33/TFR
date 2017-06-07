import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import getYoutubeId from 'get-youtube-id'

import { getAccessToken } from '../redux/modules/authorization'
// import { selectCurrentChannel } from '../redux/modules/channels'
// import { selectCurrentNetwork } from '../redux/modules/networks'
import { getVideos } from '../redux/modules/videos'
import YouTube from '../components/YouTube'
import '../style/style.css'

export class Television extends Component {
  constructor (props) {
    super(props)
  }

  componentWillMount () {
    // this.props.getAccessToken().then(() => {
    //   const { getVideos, currentChannel, currentNetwork } = this.props
    //   const currentChannelAfter = currentChannel.after
    //   const currentChannelName = currentChannel.name
    //   const currentNetworkName = currentNetwork.name
    //   return getVideos(currentNetworkName, currentChannelName, currentChannelAfter)
    // }).then(() => {
    //   // this.props.getNextVideo()
    // })
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
    // console.log(this.props.currentChannel)
    // console.log(this.props.currentNetwork)
      // let videoId = getYoutubeId(this.props.currentVideo.url)
      // let videoTitle = this.props.currentVideo.title
      // let upNextTitle = this.props.nextVideo.title
          // <input type='button' onClick={() => this.props.getHotVideos('videos')} value='more' />
          // <input type='button' disabled={this.props.previousVideo} onClick={this.props.getPreviousVideo} value='prev' />
          // <YouTube videoId={videoId} opts={opts} />
          // <input type='button' onClick={this.props.getNextVideo} value='next' />
        // <h1>{this.props.currentNetwork.name}</h1>
        // <h1>{this.props.currentChannel.name}</h1>
    return (
      <div>
        LOADED
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    // currentChannel: selectCurrentChannel(state),
    // currentNetwork: selectCurrentNetwork(state)
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    getAccessToken, getVideos
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Television)
