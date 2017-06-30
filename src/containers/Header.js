import React, { Component } from 'react'
import darkBaseTheme from 'material-ui/styles/baseThemes/darkBaseTheme'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import getMuiTheme from 'material-ui/styles/getMuiTheme'
// import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'

import TelevisionGuide from './TelevisionGuide'

export default class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      openDrawer: false
    }
    this.handleMenuTouchTap = this.handleMenuTouchTap.bind(this)
  }

  handleMenuTouchTap () {
    this.setState({ openDrawer: !this.state.openDrawer })
  }

  render () {
    /*
    <AppBar
                  title='Television for Reddit'
                  onLeftIconButtonTouchTap={this.handleMenuTouchTap} />
     */
    return (
      <div>
        <MuiThemeProvider muiTheme={getMuiTheme(darkBaseTheme)}>
          <div>
            <Toolbar style={{backgroundColor: '#00BCD4'}}>
              <ToolbarGroup firstChild>
                <IconButton onTouchTap={this.handleMenuTouchTap}>
                  <MenuIcon />
                </IconButton>
                <ToolbarTitle text='Television for Reddit' />
              </ToolbarGroup>
              <ToolbarGroup />
              <ToolbarGroup />
              <ToolbarGroup lastChild />
            </Toolbar>
            <Drawer
              docked={false}
              width={200}
              open={this.state.openDrawer}
              onRequestChange={openDrawer => this.setState({openDrawer})} >
              <TelevisionGuide closeMenu={this.handleMenuTouchTap} />
            </Drawer>
            {this.props.children}
          </div>
        </MuiThemeProvider>
      </div>
    )
  }
}
