import request from 'superagent'
import { api, error } from '../helpers'
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

export const fetchHomePosts = () => {
  return dispatch => {
    dispatch({ type: REQUEST_HOME_POSTS })
    request
      .get(api.url('/posts'))
      .query(api.params({
        home: true,
        page: 1,
        limit: 5
      }))
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          dispatch({
            type: RECEIVE_HOME_POSTS,
            posts: []
          })
          error.handleAjax(err, res, dispatch)
        } else {
          let posts = []
          if (res.body.success) posts = res.body.data
          dispatch({
            type: RECEIVE_HOME_POSTS,
            posts
          })
        }
      })
  }
}

export const fetchPosts = ({ page = 1, filter = null }) => {
  return (dispatch, getState) => {
    const { post } = getState()
    dispatch({ type: REQUEST_POSTS, page: page })
    request
      .get(api.url('/posts'))
      .query(api.params({
        page: page,
        limit: post.limit,
        filter: filter
      }))
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          error.handleAjax(err, res, dispatch)
        } else {
          let [posts, count, pages] = [[], 0, 0]
          if (res.body.success) {
            posts = res.body.data
            count = res.body.count
            pages = res.body.pages
          }
          dispatch({
            type: RECEIVE_POSTS,
            posts,
            count,
            pages
          })
        }
      })
  }
}

let cachePosts = {}

export const fetchPost = (slug) => {
  return dispatch => {
    if (cachePosts[slug]) {
      dispatch({
        type: RECEIVE_POST,
        post: cachePosts[slug]
      })
    } else {
      dispatch({ type: REQUEST_POST })
      request
        .get(api.url(`/posts/${slug}`))
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            error.handleAjax(err, res, dispatch)
          } else {
            let post = {}
            if (res.body.success) {
              post = res.body.data
              cachePosts[slug] = post
            }
            dispatch({
              type: RECEIVE_POST,
              post
            })
          }
        })
    }
  }
}

export const filterPosts = (filter, add_filter = true) => {
  return dispatch => {
    dispatch({ type: FILTER_POSTS, filter: filter, add_filter: add_filter })
    dispatch(fetchPosts({ filter: filter }))
  }
}

export const nextPage = () => {
  return (dispatch, getState) => {
    const post = getState().post
    dispatch(fetchPosts({
      page: post.page + 1,
      filter: post.filter
    }))
  }
}

export const fetchLatestPosts = (current_post_id) => {
  return dispatch => {
    dispatch({ type: REQUEST_LATEST_POST })
    request
      .get(api.url('/posts/latest'))
      .query(api.params({
        current_post_id: current_post_id,
        home: true,
        page: 1,
        limit: 10
      }))
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          error.handleAjax(err, res, dispatch)
        } else {
          let posts = []
          if (res.body.success) posts = res.body.data
          dispatch({
            type: RECEIVE_LATEST_POST,
            posts
          })
        }
      })
  }
}
