import { createSelector, createStructuredSelector } from 'reselect'

const ADD_NETWORK = 'TelevisionForReddit/networks/ADD_NETWORK'
const ADD_CHANNEL_TO_NETWORK = 'TelevisionForReddit/networks/ADD_CHANNEL_TO_NETWORK'
const UPDATE_CURRENT_NETWORK = 'TelevisionForReddit/networks/UPDATE_CURRENT_NETWORK'

let id = 0
const initialState = {
  currentNetworkId: 0,
  byId: {
    0: {
      name: 'videos',
      channels: [],
      id: 0
    }
  },
  allIds: [0]
}

export default function reducer (state = initialState, action) {
  const networkId = action.networkId
  const network = state.byId[networkId]
  let updatedNetwork

  switch (action.type) {
    case ADD_NETWORK:
      return {
        ...state,
        byId: {
          ...state.byId,
          networkId: action.network
        },
        allIds: [...allIds, networkId]
      }

    case ADD_CHANNEL_TO_NETWORK:
      updatedNetwork = {
        ...network,
        channels: [...network.channels, action.channelId]
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          networkId: updatedNetwork
        }
      }

    case UPDATE_CURRENT_NETWORK:
      return {
        ...state,
        currentNetworkId: action.payload.networkId
      }

    default:
      return state
  }
}

/**
 * Action Creators
 */

const addNetwork = network => {
  let updatedId = ++id
  return {
    type: ADD_NETWORK,
    network: {
      ...network,
      id: updatedId
    },
    updatedId
  }
}

const addChannelToNetwork = (networkId, channelId) => {
  return {
    type: ADD_CHANNEL_TO_NETWORK,
    networkId,
    channelId
  }
}

const updateCurrentNetwork = networkId => {
  return {
    type: UPDATE_CURRENT_NETWORK,
    networkId
  }
}

/**
 * Selectors
 */

const currentNetworkId = state => state.entities.networks.currentNetworkId
const networks = state => state.entities.networks.byId

export const selectCurrentNetwork = createSelector(
  [currentNetworkId, networks],
  (currentNetworkId, networks) => networks[currentNetworkId])
