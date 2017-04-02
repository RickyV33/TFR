import { createStructuredSelector } from 'reselect'
// import isEqual from 'lodash.isEqual'
import { isEqual } from 'lodash'

const SET_PREVIOUSLY_PLAYED_VIDEO = 'TelevisionForReddit/user/SET_PREVIOUSLY_PLAYED_VIDEO'
const SET_NEXT_VIDEO = 'TelevisionForReddit/user/SET_NEXT_VIDEO'
const SET_NEXT_VIDEOS = 'TelevisionForReddit/user/SET_NEXT_VIDEOS'

const initialState = {
  upNext: [],
  current: '',
  played: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {

    case SET_PREVIOUSLY_PLAYED_VIDEO:
      let updatedPlayed = state.played.slice(0, state.played.length - 1)
      return {
        upNext: [state.current, ...state.upNext],
        current: state.played.slice(-1).pop(),
        played: isEqual(state.played, updatedPlayed) ? state.played : updatedPlayed
      }

    case SET_NEXT_VIDEO:
      let updatedUpNext = state.upNext.slice(1)
      return {
        played: state.current ? [...state.played, state.current] : initialState.played,
        current: state.upNext[0],
        upNext: isEqual(state.upNext, updatedUpNext) ? state.upNext : state.upNext.slice(1)
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

export const setPreviouslyPlayedVideo = () => ({ type: SET_PREVIOUSLY_PLAYED_VIDEO })

export const setNextVideo = () => ({ type: SET_NEXT_VIDEO })

export const setNextVideos = videos => ({ type: SET_NEXT_VIDEOS, videos })

/**
 * Selectors
 */

const currentVideo = state => state.videos.byId[state.user.current]
const nextVideo = state => state.videos.byId[state.user.upNext[0]]

export const selector = createStructuredSelector({ currentVideo, nextVideo })
