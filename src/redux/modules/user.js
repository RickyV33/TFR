import { createStructuredSelector } from 'reselect'
// import isEqual from 'lodash.isEqual'
import { isEqual } from 'lodash'

const GET_PREVIOUS_VIDEO = 'TelevisionForReddit/user/GET_PREVIOUS_VIDEO'
const GET_NEXT_VIDEO = 'TelevisionForReddit/user/GET_NEXT_VIDEO'
const SET_NEXT_VIDEOS = 'TelevisionForReddit/user/SET_NEXT_VIDEOS'

const initialState = {
  next: [],
  current: '',
  previous: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {

    case GET_PREVIOUS_VIDEO:
      return {
        next: [state.current, ...state.next],
        current: state.previous.slice(-1).pop(),
        previous: state.previous.slice(0, state.previous.length - 1)
      }

    case GET_NEXT_VIDEO:
      return {
        previous: state.current ? [...state.previous, state.current] : initialState.previous,
        current: state.next[0],
        next: state.next.slice(1)
      }

    case SET_NEXT_VIDEOS:
      return {
        ...state,
        next: [...state.next, ...action.videos]
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
