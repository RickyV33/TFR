import { authorize } from '../reddit'
import { FETCHED, FETCHING } from '../constants'

const GET_ACCESS_TOKEN = 'TelevisionForReddit/authorization/GET_ACCESS_TOKEN'
const FETCHING_ACCESS_TOKEN = 'TelevisionForReddit/authorization/FETCHING_ACCESS_TOKEN'

const initialState = {
  accessToken: '',
  fetchingStatus: FETCHED
}

export default function reducer (state = initialState, { type, accessToken }) {
  switch (type) {
    case GET_ACCESS_TOKEN:
      return {
        ...state,
        accessToken,
        fetchingStatus: initialState.fetchingStatus
      }

    case FETCHING_ACCESS_TOKEN:
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

const setAccessToken = accessToken => ({ type: GET_ACCESS_TOKEN, accessToken })

const fetchingAccessToken = accessToken => ({ type: FETCHING_ACCESS_TOKEN })

/**
 * Thunks
 */

export function getAccessToken () {
  return dispatch => {
    dispatch(fetchingAccessToken())
    return authorize().then(data =>
      dispatch(setAccessToken(data.access_token))
    ).catch(error => {
      console.error('getAccessToken() -> ', error)
    })
  }
}
