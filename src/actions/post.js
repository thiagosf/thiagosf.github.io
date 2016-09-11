import request from 'superagent'
import { api } from '../helpers'
import {
  REQUEST_HOME_POSTS,
  RECEIVE_HOME_POSTS,
  REQUEST_POSTS,
  RECEIVE_POSTS,
  REQUEST_POST,
  RECEIVE_POST,
  FILTER_POSTS
} from '../constants'

export const fetchHomePosts = () => {
  return dispatch => {
    dispatch({ type: REQUEST_HOME_POSTS })
    request
      .get(api.url('/posts'))
      .query(api.params({
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
            type: RECEIVE_HOME_POSTS,
            posts
          })
        }
      })
  }
}

export const fetchPosts = ({ page = 1, limit = 10, filter = null }) => {
  return dispatch => {
    dispatch({ type: REQUEST_POSTS, page: page })
    request
      .get(api.url('/posts'))
      .query(api.params({
        page: page,
        limit: limit,
        filter: filter
      }))
      .set('Accept', 'application/json')
      .end((err, res) => {
        if (err) {
          error.handleAjax(err, res, dispatch)
        } else {
          let [posts, count] = [[], 0]
          if (res.body.success) {
            posts = res.body.data
            count = res.body.count
          }
          dispatch({
            type: RECEIVE_POSTS,
            posts,
            count
          })
        }
      })
  }
}

export const fetchPost = (slug) => {
  return dispatch => {
    dispatch({ type: REQUEST_POST })
    setTimeout(() => {
      let post = {
        id: 1,
        image: 'http://cdn1.tnwcdn.com/wp-content/blogs.dir/1/files/2015/03/materialdesign.jpg',
        title: 'Sites estáticos com Middleman',
        link: '/posts-test',
        excerpt: 'Criar sites estáticos com são bem chatos para dar manutenção. Que tal deixar mais dinâmico com geradores? Essa é a proposta do Middleman e outros similares.',
        created_at: Date.now()
      }
      dispatch({ type: RECEIVE_POST, post })
    }, 1000)
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
