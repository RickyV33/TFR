const UPDATE_CURRENT_NETWORK = 'TelevisionForReddit/networks/UPDATE_CURRENT_NETWORK'

const initialState = {
  currentNetworkId: 0
}

export default function reducer (state = initialState, action) {
  switch (action.type) {

    case UPDATE_CURRENT_NETWORK:
      return {
        currentNetworkId: action.networkId
      }

    default:
      return state
  }
}

/**
 * Action Creators
 */

export const updateCurrentNetwork = networkId => {
  return {
    type: UPDATE_CURRENT_NETWORK,
    networkId
  }
}
