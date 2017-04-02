import { fetchHotVideos } from '../reddit'
import * as userActions from './user'
import { FETCHED, FETCHING } from '../constants'

const ADD_VIDEOS_BY_ID = 'TelevisionForReddit/videos/ADD_VIDEOS_BY_ID'
const FETCHING_VIDEOS = 'TelevisionForReddit/videos/FETCHING_VIDEOS'

const initialState = {
  byId: {},
  fetchingStatus: FETCHED
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ADD_VIDEOS_BY_ID:
      return {
        byId: {
          ...state.byId,
          ...action.videos
        },
        fetchingStatus: initialState.fetchingStatus
      }

    case FETCHING_VIDEOS:
      return {
        ...state,
        fetchingStatus: FETCHING
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

/**
 * Thunks
 */

export function getHotVideos (subreddit) {
  return (dispatch, getState) => {
    dispatch(fetchingVideos())
    const accessToken = getState().authorization.accessToken
    return fetchHotVideos(subreddit, accessToken).then(videos => {
      dispatch(addVideosById(videos.mappedToId))
      dispatch(userActions.setNextVideos(videos.sortedById))
    }).catch(error => {
      console.error('getHotVideos -> ', error)
    })
  }
}
