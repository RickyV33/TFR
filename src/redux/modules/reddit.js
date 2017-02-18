import axios from 'axios'

const ADD_VIDEOS = 'TelevisionForReddit/reddit/ADD_VIDEOS'

const initialState = {
  videos: []
}

export default function reducer (state = initialState, action = {}) {
  switch (action.type) {
    case ADD_VIDEOS:
      console.log('state->', state.videos)
      return {
        ...state,
        videos: [...state.videos, ...action.videos]
      }
    default:
      return state
  }
}

function fetchInitialVideos () {
  return axios('/api/videos/hot')
}

function addVideos (videos) {
  return {
    type: ADD_VIDEOS,
    videos
  }
}

export function getInitialVideos () {
  return function (dispatch) {
    return fetchInitialVideos().then(
      response => {
        const youtubeVideos = response.data
        .filter(video => video.domain.match(/^(youtube.com|youtu.be)$/))
        return dispatch(addVideos(youtubeVideos))
      },
      error => {
        console.log(error)
      })
  }
}
