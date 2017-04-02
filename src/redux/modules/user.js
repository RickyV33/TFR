import { createStructuredSelector } from 'reselect'
// import isEqual from 'lodash.isEqual'
import { isEqual } from 'lodash'

const GET_PREVIOUSLY_PLAYED_VIDEO = 'TelevisionForReddit/user/GET_PREVIOUSLY_PLAYED_VIDEO'
const GET_NEXT_VIDEO = 'TelevisionForReddit/user/GET_NEXT_VIDEO'
const SET_NEXT_VIDEOS = 'TelevisionForReddit/user/SET_NEXT_VIDEOS'

const initialState = {
  upNext: [],
  current: '',
  played: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {

    case SET_PREVIOUSLY_PLAYED_VIDEO:
      return {
        upNext: [state.current, ...state.upNext],
        current: state.played.slice(-1).pop(),
        played: state.played.slice(0, state.played.length - 1)
      }

    case SET_NEXT_VIDEO:
      return {
        played: state.current ? [...state.played, state.current] : initialState.played,
        current: state.upNext[0],
        upNext: state.upNext.slice(1)
      }

    case SET_NEXT_VIDEOS:
      return {
        ...state,
        upNext: [...state.upNext, ...action.videos]
      }

    default:
      return state
  }
}

/**
 * Action Creators
 */

export const getPreviouslyPlayedVideo = () => ({ type: GET_PREVIOUSLY_PLAYED_VIDEO })

export const getNextVideo = () => ({ type: GET_NEXT_VIDEO })

export const setNextVideos = videos => ({ type: SET_NEXT_VIDEOS, videos })

/**
 * Selectors
 */

const currentVideo = state => state.videos.byId[state.user.current]
const nextVideo = state => state.videos.byId[state.user.upNext[0]]

export const selector = createStructuredSelector({ currentVideo, nextVideo })
