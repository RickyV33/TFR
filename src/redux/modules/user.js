import { createSelector } from 'reselect'

const SET_CURRENT_NETWORK_ID = 'TelevisionForReddit/user/SET_CURRENT_NETWORK_ID'
const SET_CURRENT_CHANNEL_ID = 'TelevisionForReddit/user/SET_CURRENT_CHANNEL_ID'

const initialState = {
  currentNetworkId: 0,
  currentChannelId: 0
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
