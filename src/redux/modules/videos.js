import { createSelector } from 'reselect'
import { combineReducers } from 'redux'

import { request } from '../reddit'
import { FETCHED, FETCHING } from './entityHelper'
import { addToById, addToAllIds } from './entityHelper'
import { selectCurrentChannel, selectCurrentChannelName, addVideosToNext,
   getNextVideo, getPreviousVideo } from './channels'
import { selectCurrentNetwork } from './networks'

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

export function getVideos () {
  return (dispatch, getState) => {
    dispatch(fetchingVideos())
    const state = getState()
    const currentNetwork = selectCurrentNetwork(state).name
    const channelUrlPath = selectCurrentChannelName(state).urlPath
    const accessToken = state.authorization.accessToken
    const after = selectCurrentChannel(state).after
    const currentChannelId = state.user.currentChannelId
    console.log(currentNetwork, channelUrlPath, accessToken, after)
    return request(currentNetwork, channelUrlPath, accessToken, after).then(videos => {
      dispatch(addVideosById(videos.mappedToId, videos.sortedById))
      dispatch(addVideosToNext(currentChannelId, videos.sortedById, videos.after))
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

export const selectPreviousVideo = createSelector(
  [selectCurrentChannel, videosSelector],
  (currentChannel, videos) => videos[currentChannel.previous.slice(-1)[0]]
)

export const selectNextVideo = createSelector(
  [selectCurrentChannel, videosSelector],
  (currentChannel, videos) => videos[currentChannel.next[0]]
)
