
import React, { Component } from 'react'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

export default class TelevisionGuide extends Component {
  constructor (props) {
    super(props)
  }
  render () {
    return (
      <div>
        <Menu>
          <MenuItem>One</MenuItem>
          <MenuItem>Two</MenuItem>
        </Menu>
      </div>
    )
  }
}
