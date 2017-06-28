import React, { Component } from 'react'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer';

import TelevisionGuide from './TelevisionGuide'

export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openDrawer: false
    }
  }

  handleToggle = () => {
    this.setState({ openDrawer: !this.state.openDrawer })
  }

  handleClose = () => {
    this.setState({ openDrawer: false })
  }

  render () {
    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div>
            <AppBar
              title='Television for Reddit'
              onLeftIconButtonTouchTap={this.handleToggle} />
            <Drawer
              docked={false}
              width={200}
              open={this.state.openDrawer}
              onRequestChange={openDrawer => this.setState({openDrawer})} >
              <TelevisionGuide />
            </Drawer>
            {this.props.children}
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
