import { createSelector } from 'reselect'
import shortid from 'shortid'
import { combineReducers } from 'redux'

import { channelNames } from './channelNames.js'
import { addToById, addToAllIds } from './entityHelper'

const GET_PREVIOUS_VIDEO = 'TelevisionForReddit/channels/GET_PREVIOUS_VIDEO'
const GET_NEXT_VIDEO = 'TelevisionForReddit/channels/GET_NEXT_VIDEO'
const ADD_VIDEOS_TO_NEXT = 'TelevisionForReddit/channels/ADD_VIDEOS_TO_NEXT'
const UPDATE_AFTER = 'TelevisionForReddit/channels/UPDATE_AFTER'

// Helper Functions
function createChannel (id, nameId) {
  const templateChannel = {
    nameId: 0,
    id: 0,
    next: [],
    current: '',
    previous: [],
    after: null
  }
  return {
    ...templateChannel,
    nameId,
    id
  }
}

function createChannels (channelNames) {
  let id
  const initialState = {
    byId: {},
    allIds: []
  }

  return channelNames.allIds.reduce((accum, nameId) => {
    id = shortid.generate()
    accum.byId[id] = createChannel(id, nameId)
    accum.allIds.push(id)
    return accum
  }, initialState)
}

function shiftVideos (source, current, destination) {
  let videos
  if (source.length > 0) {
    videos = {
      source: source.slice(1),
      current: source[0],
      destination: current ? [current, ...destination] : []
    }
  } else {
    videos = {
      source,
      current,
      destination
    }
  }
  return video
}

export const initialState = createChannels(channelNames)

// byId Slice Reducer
function channelsById (state = initialState.byId, action) {
  const currentChannel = state[action.id]
  let previous, current, next, shiftedVideos, payload
  if (currentChannel) {
    previous = currentChannel.previous
    current = currentChannel.current
    next = currentChannel.next
  }

  switch (action.type) {
    case GET_PREVIOUS_VIDEO:
      shiftedVideos = shiftVideos(previous, current, next)
      payload = {
        next: shiftedVideos.destination,
        current: shiftedVideos.current,
        previous: shiftedVideos.previous
      }
      return addToById(state, payload)

    case GET_NEXT_VIDEO:
      shiftedVideos = shiftVideos(next, current, previous)
      payload = {
        next: shiftedVideos.previous,
        current: shiftedVideos.current,
        previous: shiftedVideos.destination
      }
      return addToById(state, payload)

    case ADD_VIDEOS_TO_NEXT:
      payload = {
        next: [...currentChannel.next, ...action.videos],
        after: action.after
      }
      return addToById(state, payload)

    default:
      return state
  }
}

// allIds Slice Reducer
function allChannels (state = initialState.allIds, action) {
  switch (action.type) {
    case ADD_VIDEOS_TO_NEXT:
      return addToAllIds(state, action.id)

    default:
      return state
  }
}

export default combineReducers({
  byId: channelsById,
  allIds: allChannels
})

/**
 * Action Creators
 */

export const getPreviousVideo = id => ({ type: GET_PREVIOUS_VIDEO, id })

export const getNextVideo = id => ({ type: GET_NEXT_VIDEO, id })

export const addVideosToNext = (id, videos) => ({ type: ADD_VIDEOS_TO_NEXT, id, videos, after })

/**
 * Selectors
 */

// const currentChannelId = state => state.entities.channels.currentChannelId
// const channels = state => state.entities.channels
//
// export const selectCurrentChannel = createSelector(
//   [currentChannelId, channels],
//   (currentChannelId, channels) => channels[currentChannelId])
