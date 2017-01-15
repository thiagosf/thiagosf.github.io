import React from 'react'
import ReactDOM from 'react-dom'
import { connect } from 'react-redux'
import { Provider } from 'react-intl-redux'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Router, Route, browserHistory, IndexRoute } from 'react-router'
import { routerReducer } from 'react-router-redux'
import ReactGA from 'react-ga'
import moment_pt from 'moment/locale/pt'

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

ReactGA.initialize('UA-1966000-17')
const logPageView = () => {
  ReactGA.set({ page: window.location.pathname })
  ReactGA.pageview(window.location.pathname)
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory} onUpdate={logPageView}>
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
