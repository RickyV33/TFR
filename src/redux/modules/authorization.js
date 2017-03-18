import { authorize } from '../reddit'

// const ADD_VIDEOS = 'TelevisionForReddit/videos/ADD_VIDEOS'
const GET_ACCESS_TOKEN = 'TelevisionForReddit/authorization/GET_ACCESS_TOKEN'

const initialState = {
  accessToken: ''
}

export default function reducer (state = initialState, { type, accessToken }) {
  switch (type) {
    case GET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken: accessToken
      }
    default:
      return state
  }
}

/**
 * Action Creators
 */

const setAccessToken = accessToken => ({ type: GET_ACCESS_TOKEN, accessToken })

/**
 * Thunks
 */

export function getAccessToken () {
  return dispatch => {
    return authorize().then(data =>
      dispatch(setAccessToken(data.access_token))
    ).catch(error => {
      console.error('getAccessToken() -> ', error)
    })
  }
}
