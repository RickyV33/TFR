import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, browserHistory } from 'react-router'
import injectTapEventPlugin from 'react-tap-event-plugin'

import store from './redux/configureStore'
import Television from './containers/Television'
import Header from './containers/Header'

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin()

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path='/' component={Header}>
        <IndexRoute component={Television} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
