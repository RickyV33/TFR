import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'

import authorization from './modules/authorization'
import videos from './modules/videos'
import networks from './modules/networks'
import channels from './modules/channels'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const entities = combineReducers({
  videos,
  networks,
  channels
})
const reducer = combineReducers({
  routing: routerReducer,
  authorization,
  entities
})

const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState)
export default configureStore
