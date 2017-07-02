import { createStore, applyMiddleware, compose, combineReducers } from 'redux'
import thunk from 'redux-thunk'

import authorization from './modules/authorization'
import videos from './modules/videos'
import networks from './modules/networks'
import channels from './modules/channels'
import user from './modules/user'
import channelNames from './modules/channelNames'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose
const entities = combineReducers({
  videos,
  networks,
  channels,
  channelNames
})
const reducer = combineReducers({
  user,
  authorization,
  entities
})

const store = createStore(reducer, /* preloadedState, */ composeEnhancers(
  applyMiddleware(thunk)
))

export default store
