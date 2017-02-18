import { createStore, applyMiddleware, combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import thunk from 'redux-thunk'

import reddit from './modules/reddit'

const createStoreWithMiddleware = applyMiddleware(thunk)(createStore)
const reducer = combineReducers({
  routing: routerReducer,
  reddit
})
const configureStore = (initialState) => createStoreWithMiddleware(reducer, initialState)
export default configureStore
