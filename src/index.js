import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-intl-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'

import * as reducers from './reducers'
import * as containers from './containers'

require('../scss/index.scss')

let store = createStore(
  combineReducers({ ...reducers }),
  applyMiddleware(thunkMiddleware)
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={containers.AppContainer}>
        <IndexRoute component={containers.HomeContainer} />
        <Route path="*" component={containers.NoMatchContainer} />
      </Route>
    </Router>
  </Provider>, 
  document.getElementById('app')
)
