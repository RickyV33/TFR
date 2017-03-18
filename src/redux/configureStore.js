import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'

import videos from './modules/videos'
import authorization from './modules/authorization'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers({
  routing: routerReducer,
  videos,
  authorization
})

const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState)
export default configureStore
