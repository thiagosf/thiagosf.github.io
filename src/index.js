import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-intl-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Router, Route, browserHistory, IndexRoute, routerReducer } from 'react-router'

import * as reducers from './reducers'
import * as containers from './containers'

require('../scss/index.scss')

const store = createStore(
  combineReducers({
    ...reducers,
    routing: routerReducer
  }),
  applyMiddleware(thunkMiddleware)
)

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={containers.AppContainer}>
        <IndexRoute component={containers.HomeContainer} />
        <Route path="/sobre" component={containers.AboutContainer} />
        <Route path="/projetos" component={containers.ProjectsContainer} />
        <Route path="/playground" component={containers.PlaygroundContainer} />
        <Route path="/playground/:slug" component={containers.PlaygroundContainer} />
        <Route path="/posts" component={containers.PostsContainer} />
        <Route path="/posts-test" component={containers.PostViewContainer} />
        <Route path="/posts/:slug" component={containers.PostViewContainer} />
        <Route path="*" component={containers.NoMatchContainer} />
      </Route>
    </Router>
  </Provider>, 
  document.getElementById('app')
)
