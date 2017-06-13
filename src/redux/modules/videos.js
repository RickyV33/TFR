import { request } from '../reddit'
import { addVideosToNext } from './channels'
import { FETCHED, FETCHING } from './entityHelper'

const ADD_VIDEOS_BY_ID = 'TelevisionForReddit/videos/ADD_VIDEOS_BY_ID'
const FETCHING_VIDEOS = 'TelevisionForReddit/videos/FETCHING_VIDEOS'
const FETCHED_VIDEOS = 'TelevisionForReddit/videos/FETCHED_VIDEOS'

const initialState = {
  byId: {},
  fetchingStatus: FETCHED
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ADD_VIDEOS_BY_ID:
      return {
        ...state,
        byId: {
          ...state.byId,
          ...action.videos
        }
      }

    case FETCHING_VIDEOS:
      return {
        ...state,
        fetchingStatus: FETCHING
      }

    case FETCHED_VIDEOS:
      return {
        ...state,
        fetchingStatus: FETCHED
      }

    default:
      return state
  }
}

/**
 * Action Creators
 */

const addVideosById = videos => ({ type: ADD_VIDEOS_BY_ID, videos })

const fetchingVideos = () => ({ type: FETCHING_VIDEOS })

const fetchedVideos = () => ({ type: FETCHED_VIDEOS })

/**
 * Thunks
 */

export function getVideos (network, channel, after) {
  // return (dispatch, getState) => {
  //   dispatch(fetchingVideos())
  //   const accessToken = getState().authorization.accessToken
  //   return request(network, channel, accessToken, after).then(videos => {
  //     dispatch(addVideosById(videos.mappedToId))
  //     dispatch(addVideosToNext(videos.sortedById, videos.after))
  //     dispatch(updateAfter(videos.after))
  //     return dispatch(fetchedVideos())
  //   }).catch(error => {
  //     console.error('getHotVideos -> ', error)
  //   })
  // }
}
