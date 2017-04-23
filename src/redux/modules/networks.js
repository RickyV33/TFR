import { request } from '../reddit'
import * as userActions from './user'
/*-
networks: {
  byId: {
    0: {
      name: 'videos',
      channels: [0, 1, 2], // then use these to grab the name for tabs
      lastChannel: '',
      id: 0
    },
    1: {
      name: 'rickandmorty',
      channels: [],
      lastChannel: '',
      id: 1
    },
  }
},
*/

const ADD_VIDEOS_BY_ID = 'TelevisionForReddit/networks/'

const initialState = {
  byId: {}
}

export default function reducer (state = initialState, action) {
  switch (action.type) {
    default:
      return state
  }
}

/**
 * Action Creators
 */

/**
 * Thunks
 */
