import React, { Component } from 'react'
import Drawer from 'material-ui/Drawer'
import MenuIcon from 'material-ui/svg-icons/navigation/menu'
import IconButton from 'material-ui/IconButton'
import { Toolbar, ToolbarGroup, ToolbarTitle } from 'material-ui/Toolbar'
import { indigo500 } from 'material-ui/styles/colors'

import TelevisionGuide from '../containers/TelevisionGuide'

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
    const toolBarStyle = {
      backgroundColor: indigo500
    }

    const toolBarTitleStyle = {
      color: '#FFFFFF'
    }

    const menuStyle = {
      color: '#FFFFFF'
    }

    return (
      <div>
        <Toolbar style={toolBarStyle} >
          <ToolbarGroup firstChild >
            <IconButton iconStyle={menuStyle} onTouchTap={this.handleMenuTouchTap} >
              <MenuIcon />
            </IconButton>
            <ToolbarTitle style={toolBarTitleStyle} text='Television for Reddit' />
          </ToolbarGroup>
        </Toolbar>
        <Drawer
          docked={false}
          width={200}
          open={this.state.openDrawer}
          onRequestChange={this.handleMenuTouchTap} >
          <TelevisionGuide closeMenu={this.handleMenuTouchTap} />
        </Drawer>
      </div>
    )
  }
}
