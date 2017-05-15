import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'

import authorization from './modules/authorization'
import videos from './modules/videos'
import networks from './modules/networks'
import channels from './modules/channels'
import user from './modules/user'
import channelNames from './modules/channelNames'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const entities = combineReducers({
  videos,
  networks,
  channels,
  channelNames
})
const reducer = combineReducers({
  user,
  routing: routerReducer,
  authorization,
  entities
})

const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState)
export default configureStore
