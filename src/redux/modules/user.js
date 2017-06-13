import { createSelector } from 'reselect'

import { initialState as channelsInitialState } from './channels'
import { initialState as networksInitialState } from './networks'

const SET_CURRENT_NETWORK_ID = 'TelevisionForReddit/user/SET_CURRENT_NETWORK_ID'
const SET_CURRENT_CHANNEL_ID = 'TelevisionForReddit/user/SET_CURRENT_CHANNEL_ID'

// Initial state points to netowrk videos and netowrk hot
const initialState = {
  currentNetworkId: networksInitialState.id,
  currentChannelId: channelsInitialState.allIds[0]
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_NETWORK_ID:
      return {
        ...state,
        currentNetworkId: action.id
      }

    case SET_CURRENT_NETWORK_ID:
      return {
        ...state,
        currentChannelId: action.id
      }

    default:
      return state
  }
}

/**
 * Action Creators
 */

export const setCurrentNetworkId = id => ({ type: SET_CURRENT_NETWORK_ID, id })

export const setCurrentChannelId = id => ({ type: SET_CURRENT_CHANNEL_ID, id })

/**
 * Selectors
 */
