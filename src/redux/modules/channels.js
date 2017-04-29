import { createSelector, createStructuredSelector } from 'reselect'
import { isEqual } from 'lodash'

const GET_PREVIOUS_VIDEO = 'TelevisionForReddit/channels/GET_PREVIOUS_VIDEO'
const GET_NEXT_VIDEO = 'TelevisionForReddit/channels/GET_NEXT_VIDEO'
const ADD_NEXT_VIDEOS = 'TelevisionForReddit/channels/ADD_NEXT_VIDEOS'
const UPDATE_CURRENT_CHANNEL_ID = 'TelevisionForReddit/channels/UPDATE_CURRENT_CHANNEL_ID'
// const SET_AFTER = 'TelevisionForReddit/channels/SET_AFTER'

const initialState = {
  currentChannelId: 0,
  0: {
    next: [],
    current: '',
    previous: []
  }
}

export default function reducer (state = initialState, action) {
  const currentChannelId = state.currentChannelId
  const currentChannel = state[currentChannelId]
  if (currentChannel) {
    const previous = currentChannel.previous
    const current = currentChannel.current
    const next = currentChannel.next
  }

  switch (action.type) {
    case GET_PREVIOUS_VIDEO:
      return {
        ...state,
        currentChannelId: {
          next: [currentChannel.current, ...currentChannel.next],
          current: currentChannel.previous.slice(-1).pop(),
          previous: currentChannel.previous.slice(0, previous.length - 1)
        }
      }

    case GET_NEXT_VIDEO:
      return {
        ...state,
        currentChannelId: {
          previous: current ? [...previous, current] : initialState.previous,
          current: next[0],
          next: next.slice(1)
        }
      }

    case ADD_NEXT_VIDEOS:
      return {
        ...state,
        currentChannelId: {
          next: [...next, ...action.videos]
        }
      }

    case UPDATE_CURRENT_CHANNEL_ID:
      return {
        ...state,
        currentChannelId: action.currentChannelId
      }

    default:
      return state
  }
}

/**
 * Action Creators
 */

export const getPreviousVideo = () => ({ type: GET_PREVIOUS_VIDEO })

export const getNextVideo = () => ({ type: GET_NEXT_VIDEO })

export const addNextVideos = videos => ({ type: ADD_NEXT_VIDEOS, videos })

export const updateCurrentChannelId = channelId => ({ type: UPDATE_CURRENT_CHANNEL_ID, channelId })

/**
 * Selectors
 */

const currentChannelId = state => state.entities.channels.currentChannelId
const channels = state => state.entities.channels

export const selectCurrentChannel = createSelector(
  [currentChannelId, channels],
  (currentChannelId, channels) => channels[currentChannelId])
