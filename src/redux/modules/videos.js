import { fetchHotVideos } from '../reddit'
import * as userActions from './user'

const ADD_VIDEOS_BY_ID = 'TelevisionForReddit/videos/ADD_VIDEOS_BY_ID'

const initialState = {
  byId: {}
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    case ADD_VIDEOS_BY_ID:
      return {
        byId: {
          ...state.byId,
          ...action.videos
        }
      }
    default:
      return state
  }
}

/**
 * Action Creators
 */

const addVideosById = videos => ({ type: ADD_VIDEOS_BY_ID, videos })

/**
 * Thunks
 */

export function getHotVideos (subreddit) {
  return function (dispatch, getState) {
    const accessToken = getState().authorization.accessToken
    return fetchHotVideos(subreddit, accessToken).then(videos => {
      // ---- Move this to reddit.js -----
      const youtubeVideos = videos.filter(video => video.domain.match(/^(youtube.com|youtu.be)$/))
      const mapToIds = {}
      youtubeVideos.forEach(video => {
        mapToIds[video.id] = video
      })
      const sortedByIds = youtubeVideos.map(video => video.id)
      console.log(sortedByIds)
      // --------------------------------
      dispatch(addVideosById(mapToIds))
      dispatch(userActions.setNextVideos(sortedByIds))
      dispatch(userActions.getNextVideo())
    }).catch(error => {
      console.error('getHotVideos -> ', error)
    })
  }
}
