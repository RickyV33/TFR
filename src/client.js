import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'

import configureStore from './redux/configureStore'
import Television from './containers/Television'

const store = configureStore()

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' >
        <IndexRoute component={Television} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
