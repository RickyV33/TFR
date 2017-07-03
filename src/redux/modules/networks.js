import { createSelector } from 'reselect'
import shortid from 'shortid'
import { combineReducers } from 'redux'

import { addToById, addToAllIds } from './entityHelper'
import { initialState as channelsInitialState, createChannels,
  addChannels } from './channels'
import { channelNames } from './channelNames.js'

const ADD_NETWORK = 'TelevisionForReddit/networks/ADD_NETWORK'

function createNetwork (name, channels) {
  const id = shortid.generate()
  return {
    id,
    name,
    channels
  }
}

export const initialState = createNetwork('Videos', channelsInitialState.allIds)

function networksById (state = { [initialState.id]: initialState }, action) {
  switch (action.type) {
    case ADD_NETWORK:
      const { type, ...payload } = action
      return addToById(state, payload)

    default:
      return state
  }
}

function allNetworks (state = [initialState.id], action) {
  switch (action.type) {
    case ADD_NETWORK:
      console.log(action)
      return addToAllIds(state, action.id)

    default:
      return state
  }
}

export default combineReducers({
  byId: networksById,
  allIds: allNetworks
})

/**
 * Action Creators
 */

const addNetwork = (name, channels) => {
  return {
    type: ADD_NETWORK,
    ...createNetwork(name, channels)
  }
}

/**
 * Action Creators
 */

export const createNewNetwork = name => {
  return dispatch => {
    const channels = createChannels(channelNames)
    dispatch(addNetwork(name, channels.allIds))
    dispatch(addChannels(channels))
  }
}

/**
 * Selectors
 */

const currentNetworkIdSelector = state => state.user.currentNetworkId
const networksSelector = state => state.entities.networks.byId
const allNetworksSelector = state => state.entities.networks.allIds

export const selectCurrentNetwork = createSelector(
  [currentNetworkIdSelector, networksSelector],
  (currentNetworkId, networks) => networks[currentNetworkId]
)

export const selectAllNetworks = createSelector(
  [allNetworksSelector, networksSelector],
  (allNetworks, networks) => allNetworks.map(id => networks[id])
)
