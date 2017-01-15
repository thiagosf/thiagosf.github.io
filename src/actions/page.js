import request from 'superagent'
import { api, error } from '../helpers'
import {
  AFTER_TRANSITION,
  REQUEST_PAGE,
  RECEIVE_PAGE
} from '../constants'

export const enterPage = (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: AFTER_TRANSITION
    })
  }, 500)
}

let cachePages = {}

export const fetchPage = (slug) => {
  return dispatch => {
    if (cachePages[slug]) {
      dispatch({
        type: RECEIVE_PAGE,
        page: cachePages[slug]
      })
    } else {
      dispatch({ type: REQUEST_PAGE })
      request
        .get(api.url(`/pages/${slug}`))
        .set('Accept', 'application/json')
        .end((err, res) => {
          if (err) {
            error.handleAjax(err, res, dispatch)
          } else {
            let page = {}
            if (res.body.success) {
              page = res.body.data
              cachePages[slug] = page
            }
            dispatch({
              type: RECEIVE_PAGE,
              page
            })
          }
        })
    }
  }
}
