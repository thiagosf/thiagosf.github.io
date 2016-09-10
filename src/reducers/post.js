import {
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_POST,
  RECEIVE_POST,
  FILTER_POSTS
} from '../constants'

let initialState = {
  fetch_posts: false,
  posts: [],
  post: {},
  filters: []
}

const post = (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_POSTS:
    case REQUEST_POST:
      return Object.assign({}, state, {
        fetch_posts: true,
        posts: [],
        post: {}
      })

    case RECEIVE_POSTS:
      return Object.assign({}, state, {
        fetch_posts: false,
        posts: action.posts
      })

    case RECEIVE_POST:
      return Object.assign({}, state, {
        fetch_posts: false,
        post: action.post
      })

    case FILTER_POSTS:
      console.log(state.filters)
      return Object.assign({}, state, {
        filters: [action.filter].concat(state.filters)
      })

    default:
      return state
  }
}

export default post
