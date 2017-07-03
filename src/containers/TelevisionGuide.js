
import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline'
import Dialog from 'material-ui/Dialog'

import { selectAllChannels, getNextVideo } from '../redux/modules/channels'
import { selectAllNetworks } from '../redux/modules/networks'
import { setCurrentNetworkId, setCurrentChannelId } from '../redux/modules/user'
import { getVideos, selectCurrentVideo } from '../redux/modules/videos'

export class TelevisionGuide extends Component {
  constructor (props) {
    super(props)

    this.state = { openCreateNetwork: false }
    this.networkMenuItems = this.networkMenuItems.bind(this)
    this.channelMenuItems = this.channelMenuItems.bind(this)
    this.handleChannelTouchTap = this.handleChannelTouchTap.bind(this)
  }

  componentDidUpdate (prevProps) {
    const isSameChannel = this.props.currentChannelId === prevProps.currentChannelId
    if (!isSameChannel && !this.props.currentVideo) {
      this.props.getVideos()
        .then(() => this.props.getNextVideo(this.props.currentChannelId))
    }
  }

  handleChannelTouchTap (networkId, channelId) {
    this.props.setCurrentChannelId(channelId)
    this.props.setCurrentNetworkId(networkId)
    this.props.closeMenu()
  }

  channelMenuItems (networkId, ids) {
    return ids.map(id => {
      return <MenuItem
        key={id}
        primaryText={this.props.allChannels[id].name}
        checked={this.props.currentChannelId === id}
        onTouchTap={() => this.handleChannelTouchTap(networkId, id)} />
    })
  }

  networkMenuItems () {
    return this.props.allNetworks.map(network => {
      return <MenuItem
        key={network.id}
        primaryText={network.name}
        menuItems={this.channelMenuItems(network.id, network.channels)}
        rightIcon={<ArrowDropRight />}
        checked={this.props.currentNetworkId === network.id} />
    })
  }

  render () {
    return (
      <div>
        <MenuItem
          leftIcon={<AddCircleOutline />}
          primaryText='Add Network'
          onTouchTap={() => this.setState({ openCreateNetwork: true })} />
        {this.networkMenuItems()}
        <Dialog
          title='Add a New Network'
          modal={false}
          open={this.state.openCreateNetwork}
          onRequestClose={() => this.setState({ openCreateNetwork: false })} >
          Search for the network you want to add.
        </Dialog>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    allChannels: selectAllChannels(state),
    allNetworks: selectAllNetworks(state),
    currentNetworkId: state.user.currentNetworkId,
    currentChannelId: state.user.currentChannelId,
    currentVideo: selectCurrentVideo(state)
  }
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({
    setCurrentNetworkId, setCurrentChannelId, getNextVideo, getVideos
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TelevisionGuide)
