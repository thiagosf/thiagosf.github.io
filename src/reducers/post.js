import { Map, Set } from 'immutable'
import {
  REQUEST_HOME_POSTS,
  RECEIVE_HOME_POSTS,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_POST,
  RECEIVE_POST,
  FILTER_POSTS,
  REQUEST_LATEST_POST,
  RECEIVE_LATEST_POST
} from '../constants'


let initialState = {
  fetch_posts: false,
  home_posts: [],
  posts: [],
  post: {},
  filters: [],
  filter: null,
  page: 1,
  count: 0,
  limit: 5,
  pages: 0,
  fetch_latest_posts: false,
  latest_posts: []
}

const post = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_HOME_POSTS:
      return Map(state).merge({
        fetch_posts: true,
        home_posts: []
      }).toJS()

    case REQUEST_LATEST_POST:
      return Map(state).merge({
        fetch_latest_posts: true,
        latest_posts: []
      }).toJS()

    case REQUEST_POSTS:
    case REQUEST_POST:
      return Map(state).merge({
        fetch_posts: true,
        post: {},
        posts: (action.page != 1 ? state.posts : []),
        page: action.page || state.page
      }).toJS()

    case RECEIVE_HOME_POSTS:
      return Map(state).merge({
        fetch_posts: false,
        home_posts: action.posts
      }).toJS()

    case RECEIVE_POSTS:
      return Map(state).merge({
        fetch_posts: false,
        posts: Set(state.posts).union(action.posts).toJS(),
        count: action.count,
        pages: action.pages
      }).toJS()

    case RECEIVE_POST:
      return Map(state).merge({
        fetch_posts: false,
        post: action.post
      }).toJS()

    case FILTER_POSTS:
      let list = Set(state.filters)
      if (action.add_filter && action.filter) {
        list = list.add(action.filter).reverse()
      }
      list = list.take(5)
      return Map(state).merge({
        filter: action.filter,
        filters: list
      }).toJS()

    case RECEIVE_LATEST_POST:
      return Map(state).merge({
        fetch_latest_posts: false,
        latest_posts: action.posts
      }).toJS()

    default:
      return state
  }
}

export default post
