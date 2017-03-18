import { fetchHotVideos } from '../reddit'

const ADD_VIDEOS = 'TelevisionForReddit/videos/ADD_VIDEOS'

const initialState = {
  videos: []
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ADD_VIDEOS:
      return {
        videos: [...state.videos, ...action.videos]
      }
    default:
      return state
  }
}

/**
 * Action Creators
 */

function addVideos (videos) {
  return {
    type: ADD_VIDEOS,
    videos
  }
}

/**
 * Thunks
 */

export function getHotVideos (subreddit) {
  return function (dispatch) {
    return fetchHotVideos(subreddit).then(
      response => {
        const youtubeVideos = response.data.filter(video => video.domain.match(/^(youtube.com|youtu.be)$/))
        return dispatch(addVideos(youtubeVideos))
      }).catch(error => {
        console.error(error)
      })
  }
}
