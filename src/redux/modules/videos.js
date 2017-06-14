import { createSelector } from 'reselect'
import { combineReducers } from 'redux'

import { request } from '../reddit'
import { addVideosToNext, selectCurrentChannel } from './channels'
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

export function getVideos (network, channelUrlPath, channelId, after) {
  return (dispatch, getState) => {
    dispatch(fetchingVideos())
    const accessToken = getState().authorization.accessToken
    return request(network, channelUrlPath, accessToken, after).then(videos => {
      dispatch(addVideosById(videos.mappedToId, videos.sortedById))
      dispatch(addVideosToNext(channelId, videos.sortedById, videos.after))
    }).catch(error => {
      console.error('getHotVideos -> ', error)
    })
  }
}

/**
 * Thunks
 */
const videosSelector = state => state.entities.videos.byId

export const selectCurrentVideo = createSelector(
  [selectCurrentChannel, videosSelector],
  (currentChannel, videos) => videos[currentChannel.current]
)
