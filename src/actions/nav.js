import { TOGGLE_NAV, SET_CURRENT_LINK } from '../constants'

export const toggleNav = () => {
  return {
    type: TOGGLE_NAV
  }
}

export const setCurrentLink = (current_link) => {
  return {
    type: SET_CURRENT_LINK,
    current_link
  }
}
