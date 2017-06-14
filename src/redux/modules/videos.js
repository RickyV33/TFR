import { combineReducers } from 'redux'

import { request } from '../reddit'
import { addVideosToNext } from './channels'
import { FETCHED, FETCHING } from './entityHelper'
import { addToById, addToAllIds } from './entityHelper'

const ADD_VIDEOS_BY_ID = 'TelevisionForReddit/videos/ADD_VIDEOS_BY_ID'
const FETCHING_VIDEOS = 'TelevisionForReddit/videos/FETCHING_VIDEOS'
const FETCHED_VIDEOS = 'TelevisionForReddit/videos/FETCHED_VIDEOS'

function videosById (state = {}, action) {
  switch (action.type) {
    case ADD_VIDEOS_BY_ID:
      return {
        ...state,
        ...action.videosById
      }

    default:
      return state
  }
}

function allVideos (state = [], action) {
  switch (action.type) {
    case ADD_VIDEOS_BY_ID:
      return [ ...state, ...action.allVideos ]

    default:
      return state
  }
}

function fetchingStatus (state = FETCHED, action) {
  switch (action.type) {
    case ADD_VIDEOS_BY_ID:
      return FETCHED

    case FETCHING_VIDEOS:
      return FETCHING

    default:
      return state
  }
}

export default combineReducers({
  byId: videosById,
  allIds: allVideos,
  fetchingStatus
})

/**
 * Action Creators
 */

const addVideosById = (videosById, allVideos) => ({ type: ADD_VIDEOS_BY_ID, videosById, allVideos })

const fetchingVideos = () => ({ type: FETCHING_VIDEOS })

const fetchedVideos = () => ({ type: FETCHED_VIDEOS })

/**
 * Thunks
 */

export function getVideos (network, channel, after) {
  return (dispatch, getState) => {
    // dispatch(fetchingVideos())
    const accessToken = getState().authorization.accessToken
    return request(network, channel, accessToken, after).then(videos => {
      dispatch(addVideosById(videos.mappedToId, videos.sortedById))
      // dispatch(addVideosToNext(videos.sortedById, videos.after))
      // dispatch(updateAfter(videos.after))
      // return dispatch(fetchedVideos())
    }).catch(error => {
      console.error('getHotVideos -> ', error)
    })
  }
}
