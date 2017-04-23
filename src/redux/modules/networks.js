const ADD_NETWORK = 'TelevisionForReddit/networks/ADD_NETWORK'
const ADD_CHANNEL_TO_NETWORK = 'TelevisionForReddit/networks/ADD_CHANNEL_TO_NETWORK'
const UPDATE_CURRENT_CHANNEL = 'TelevisionForReddit/networks/UPDATE_CURRENT_CHANNEL'

let id = 0
const initialState = {
  byId: {
    0: {
      name: 'videos',
      channels: [],
      currentChannel: '',
      id: 0
    }
  }
  allIds: [0]
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ADD_NETWORK:
      return {
        ...state,
        byId: {
          ...state.byId,
          action.payload.id: action.payload
        },
        allIds: [...allIds, action.payload.id]
      }

    case ADD_CHANNEL_TO_NETWORK:
      const network = state.byId[action.payload.networkId]
      const updatedNetwork = {
        ...network,
        channels: [...network.channels, action.payload.channelId]
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          action.payload.networkId: updatedNetwork
        }
      }

    case UPDATE_CURRENT_CHANNEL:
      const network = state.byId[action.payload.networkId]
      const updatedNetwork = {
        ...network,
        currentChannel: action.payload.channelId
      }
      return {
        ...state,
        byId: {
          ...state.byId,
          action.payload.networkId: updatedNetwork
        }
      }

    default:
      return state
  }
}

/**
 * Action Creators
 */

const addNetwork = network = {
  return {
    type: ADD_NETWORK,
    payload:  {
      ...network,
       ++id
     }
  }
}

const addChannelToNetwork = (networkId, channelId) = {
  return {
    type: ADD_CHANNEL_TO_NETWORK,
    payload: {
      networkId,
      channelId
    }
  }
}

const updateCurrentChannel = (networkId, channelId) = {
  return {
    type: ADD_CHANNEL_TO_NETWORK,
    payload: {
      networkId,
      channelId
    }
  }
}
