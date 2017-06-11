import { createSelector } from 'reselect'

import { channelNames } from './channelNames.js'

const GET_PREVIOUS_VIDEO = 'TelevisionForReddit/channels/GET_PREVIOUS_VIDEO'
const GET_NEXT_VIDEO = 'TelevisionForReddit/channels/GET_NEXT_VIDEO'
const ADD_VIDEOS_TO_NEXT = 'TelevisionForReddit/channels/ADD_VIDEOS_TO_NEXT'
const UPDATE_AFTER = 'TelevisionForReddit/channels/UPDATE_AFTER'

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

function createChannels (channelNames, count) {
  let id
  const initialState = {
    byId: {},
    allIds: []
  }

  return channelNames.allIds.reduce((accum, nameId) => {
    id = count++
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

function addToById (state, id, payload) {
  return {
    ...state.byId,
    [id]: {
      ...state.byId[id],
      ...payload
    }
  }
}

function addToAllIds (state, id) {
  return [...state.allIds, id]
}

export default function reducer (state = createChannels(channelNames, 0), action) {
  const currentChannel = state.byId[action.id]
  let previous, current, next
  if (currentChannel) {
    previous = currentChannel.previous
    current = currentChannel.current
    next = currentChannel.next
  }
  let shiftedVideos
  let payload

  switch (action.type) {
    case GET_PREVIOUS_VIDEO:
      shiftedVideos = shiftVideos(previous, current, next)
      payload = {
        next: shiftedVideos.destination,
        current: shiftedVideos.current,
        previous: shiftedVideos.previous
      }
      return {
        ...state,
        byId: addToById(state, action.id, payload)
      }

    case GET_NEXT_VIDEO:
      shiftedVideos = shiftVideos(next, current, previous)
      payload = {
        next: shiftedVideos.previous,
        current: shiftedVideos.current,
        previous: shiftedVideos.destination
      }
      return {
        ...state,
        byId: addToById(state, action.id, payload)
      }

    case ADD_VIDEOS_TO_NEXT:
      payload = {
        next: [...currentChannel.next, ...action.videos]
      }
      return {
        ...state,
        byId: addToById(state, action.id, payload),
        allIds: addToAllIds(state, action.id)
      }

    case UPDATE_AFTER:
      payload = {
        after: action.after
      }
      return {
        ...state,
        byId: addToById(state, action.id, payload)
      }

    default:
      return state
  }
}

/**
 * Action Creators
 */

export const getPreviousVideo = id => ({ type: GET_PREVIOUS_VIDEO, id })

export const getNextVideo = id => ({ type: GET_NEXT_VIDEO, id })

export const addNextVideos = (id, videos) => ({ type: ADD_VIDEOS_TO_NEXT, videos, id })

export const updateAfter = (id, after) => ({ type: UPDATE_AFTER, id, after })

/**
 * Selectors
 */

// const currentChannelId = state => state.entities.channels.currentChannelId
// const channels = state => state.entities.channels
//
// export const selectCurrentChannel = createSelector(
//   [currentChannelId, channels],
//   (currentChannelId, channels) => channels[currentChannelId])
