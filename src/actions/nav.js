import { TOGGLE_NAV, SET_CURRENT_LINK } from '../constants'

export const toggleNav = () => {
  return {
    type: TOGGLE_NAV
  }
}

export const setCurrentLink = (link) => {
  return {
    type: SET_CURRENT_LINK,
    link
  }
}

export const checkLink = (location) => {
  return dispatch => {
    if (location.pathname) {
      let link = location.pathname
      if (link.startsWith('/posts')) link = '/posts'
      dispatch(setCurrentLink(link));
    }
  }
}
