import { createSelector, createStructuredSelector } from 'reselect'
import shortid from 'shortid'
import { combineReducers } from 'redux'

import { addToById, addToAllIds } from './entityHelper'

const ADD_NETWORK = 'TelevisionForReddit/networks/ADD_NETWORK'

function createNetwork (name, channels) {
  const id = shortid.generate()
  return {
    id,
    name,
    channels: channels || []
  }
}

export const initialState = createNetwork('videos')

function networksById (state = initialState, action) {
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

// const currentNetworkId = state => state.entities.networks.currentNetworkId
// const networks = state => state.entities.networks.byId
//
// export const selectCurrentNetwork = createSelector(
//   [currentNetworkId, networks],
//   (currentNetworkId, networks) => networks[currentNetworkId])
