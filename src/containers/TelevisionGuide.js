
import React, { Component } from 'react'
import MenuItem from 'material-ui/MenuItem'
import TextField from 'material-ui/TextField'
import FlatButton from 'material-ui/FlatButton'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right'
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline'
import Dialog from 'material-ui/Dialog'

import { selectAllChannels, getNextVideo } from '../redux/modules/channels'
import { selectAllNetworks, createNewNetwork } from '../redux/modules/networks'
import { setCurrentNetworkId, setCurrentChannelId } from '../redux/modules/user'
import { getVideos, selectCurrentVideo } from '../redux/modules/videos'

export class TelevisionGuide extends Component {
  constructor (props) {
    super(props)

    this.state = {
      openCreateNetwork: false,
      networkName: ''
    }
    this.networkMenuItems = this.networkMenuItems.bind(this)
    this.channelMenuItems = this.channelMenuItems.bind(this)
    this.handleChannelTouchTap = this.handleChannelTouchTap.bind(this)
    this.handleSubmitTouchTap = this.handleSubmitTouchTap.bind(this)
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

  handleSubmitTouchTap () {
    this.props.createNewNetwork(this.state.networkName)
    this.setState({ openCreateNetwork: false })
  }

  render () {
    const actions = [
      <FlatButton
        label='Cancel'
        primary
        onTouchTap={() => this.setState({ openCreateNetwork: false })}
      />,
      <FlatButton
        label='Submit'
        primary
        onTouchTap={this.handleSubmitTouchTap}
      />
    ]
    return (
      <div>
        <MenuItem
          leftIcon={<AddCircleOutline />}
          primaryText='Add Network'
          onTouchTap={() => this.setState({ openCreateNetwork: true })} />
        {this.networkMenuItems()}
        <Dialog
          actions={actions}
          title='Add a New Network'
          modal={false}
          open={this.state.openCreateNetwork}
          onRequestClose={() => this.setState({ openCreateNetwork: false })}
          contentStyle={{width: '30%'}} >
          <TextField
            hintText='listentothis, youtubehaiku, etc.'
            value={this.state.networkName}
            onChange={e => this.setState({ networkName: e.target.value })}
            autoFocus />
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
    setCurrentNetworkId, setCurrentChannelId, getNextVideo, getVideos, createNewNetwork
  }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(TelevisionGuide)
