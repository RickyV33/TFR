import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

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
    return (
      <div>
        <h1>Television for Reddit</h1>
        <p>watch shit here bro</p>
      </div>
    )
  }
}

// const mapStateToProps = ({ reddit }) => ({ reddit })
const mapDispatchToProps = dispatch => bindActionCreators({ getHotVideos, getAccessToken }, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(Television)
