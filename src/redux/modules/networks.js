import { createSelector, createStructuredSelector } from 'reselect'
import shortid from 'shortid'
import { combineReducers } from 'redux'

import { addToById, addToAllIds } from './entityHelper'
import { initialState as channelsInitialState } from './channels'

const ADD_NETWORK = 'TelevisionForReddit/networks/ADD_NETWORK'

function createNetwork (name, channels) {
  const id = shortid.generate()
  return {
    id,
    name,
    channels: channels
  }
}

export const initialState = createNetwork('Videos', channelsInitialState.allIds)

function networksById (state = { [initialState.id]: initialState }, action) {
  switch (action.type) {
    case ADD_NETWORK:
      const { name, id, channels } = action
      const payload = {
        name,
        id,
        channels
      }
      return addToById(state, payload)

    default:
      return state
  }
}

function allNetworks (state = [initialState.id], action) {
  switch (action.type) {
    case ADD_NETWORK:
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
