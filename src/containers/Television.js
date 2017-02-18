import React, { Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { getInitialVideos } from '../redux/modules/reddit'
import YouTube from '../components/YouTube'
import '../style/style.css'

export class Television extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    console.log('mounted')
    // getInitialVideos().then(() => console.log('done'))
    this.props.getInitialVideos()
  }

  render () {
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
        <div>
          <YouTube videoId='2g811Eo7K8U' opts={opts} />
        </div>
      </div>
    )
  }
}

function mapStateToProps ({ reddit }) {
  return {
    reddit
  }
}

function mapDispatchToProps (dispatch) {
  return bindActionCreators({ getInitialVideos }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Television)
