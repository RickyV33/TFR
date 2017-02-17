import React, { Component } from 'react'

import YouTube from './YouTube'

export default class App extends Component {
  constructor (props) {
    super(props)

    this.onReady = this.onReady.bind(this)
  }
  onReady (event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }

  render () {
    const opts = {
      height: '390',
      width: '640',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 1
      }
    }
    return (
      <div>
        <div>Hello World</div>
        <div>
          <YouTube videoId='2g811Eo7K8U' opts={opts} onReady={this.onReady} />
        </div>
      </div>
    )
  }
}
