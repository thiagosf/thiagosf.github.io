import { TOGGLE_NAV, SET_CURRENT_LINK } from '../constants'
import { enterPage } from './page'

export const toggleNav = () => {
  return {
    type: TOGGLE_NAV
  }
}

export const setCurrentLink = (link) => {
  return dispatch => {
    window.scrollTo(0, 0)
    enterPage(dispatch)
    dispatch({
      type: SET_CURRENT_LINK,
      link
    })
  }
}

export const checkLink = (location) => {
  return dispatch => {
    if (location.pathname) {
      let link = location.pathname
      if (link.includes('/posts')) link = '/posts'
      dispatch(setCurrentLink(link));
    }
  }
}
