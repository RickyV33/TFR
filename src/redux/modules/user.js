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

    case GET_PREVIOUSLY_PLAYED_VIDEO:
      return {
        ...state,
        upNext: [state.current, ...state.upNext],
        current: state.played.slice(state.played.length),
        played: [...state.played(0, state.played.length)]
      }

    case GET_NEXT_VIDEO:
      return {
        ...state,
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

export const GetPreviouslyPlayedVideo = () => ({ type: GET_PREVIOUSLY_PLAYED_VIDEO })

export const getNextVideo = () => ({ type: GET_NEXT_VIDEO })

export const setNextVideos = videos => ({ type: SET_NEXT_VIDEOS, videos })
