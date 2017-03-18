import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'

import videos from './modules/videos'
import authorization from './modules/authorization'
import user from './modules/user'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers({
  routing: routerReducer,
  videos,
  authorization,
  user
})

const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState)
export default configureStore
