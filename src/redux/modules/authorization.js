import { authorize } from '../reddit'
import { FETCHED, FETCHING } from './entityHelper'

const SET_ACCESS_TOKEN = 'TelevisionForReddit/authorization/SET_ACCESS_TOKEN'
const FETCHING_ACCESS_TOKEN = 'TelevisionForReddit/authorization/FETCHING_ACCESS_TOKEN'
const FETCHED_ACCESS_TOKEN = 'TelevisionForReddit/authorization/FETCHED_ACCESS_TOKEN'

const initialState = {
  accessToken: '',
  fetchingStatus: FETCHED
}

export default function reducer (state = initialState, { type, accessToken }) {
  switch (type) {
    case SET_ACCESS_TOKEN:
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

    case FETCHED_ACCESS_TOKEN:
      return {
        ...state,
        fetchingStatus: FETCHED
      }

    default:
      return state
  }
}

/**
 * Action Creators
 */

const setAccessToken = accessToken => ({ type: SET_ACCESS_TOKEN, accessToken })

const fetchingAccessToken = () => ({ type: FETCHING_ACCESS_TOKEN })

const fetchedAccessToken = () => ({ type: FETCHED_ACCESS_TOKEN })

/**
 * Thunks
 */

export function getAccessToken () {
  return dispatch => {
    dispatch(fetchingAccessToken())
    return authorize().then(data => {
      dispatch(setAccessToken(data.access_token))
      return dispatch(fetchedAccessToken())
    }).catch(error => {
      console.error('getAccessToken() -> ', error)
      return dispatch(fetchedAccessToken())
    })
  }
}
