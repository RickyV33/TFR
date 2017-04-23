import { createStructuredSelector } from 'reselect'
// import isEqual from 'lodash.isEqual'
import { isEqual } from 'lodash'

const GET_PREVIOUS_VIDEO = 'TelevisionForReddit/user/GET_PREVIOUS_VIDEO'
const GET_NEXT_VIDEO = 'TelevisionForReddit/user/GET_NEXT_VIDEO'
const SET_NEXT_VIDEOS = 'TelevisionForReddit/user/SET_NEXT_VIDEOS'
const SET_CURRENT_CHANNEL_ID = 'TelevisionForReddit/user/SET_CURRENT_CHANNEL_ID'
const SET_AFTER = 'TelevisionForReddit/user/SET_AFTER'

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
  const previous = currentChannel.previous
  const current = currentChannel.current
  const next = currentChannel.next

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

    case SET_NEXT_VIDEOS:
      return {
        ...state,
        currentChannelId: {
          next: [...next, ...action.videos]
        }
      }

    case SET_CURRENT_CHANNEL_ID:
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

export const setNextVideos = videos => ({ type: SET_NEXT_VIDEOS, videos })

/**
 * Selectors
 */

const previousVideo = state => state.videos.byId[state.user.previous.slice(-1).pop()]
const currentVideo = state => state.videos.byId[state.user.current]
const nextVideo = state => state.videos.byId[state.user.next[0]]

export const selector = createStructuredSelector({ previousVideo, currentVideo, nextVideo })
