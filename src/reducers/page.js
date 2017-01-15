import { Map } from 'immutable'
import {
  AFTER_TRANSITION,
  SET_CURRENT_LINK,
  REQUEST_PAGE,
  RECEIVE_PAGE
} from '../constants'

let initialState = {
  current_link: null,
  enter: true,
  fetch_pages: false,
  page: {}
}

const page = (state = initialState, action) => {
  switch (action.type) {
    case SET_CURRENT_LINK:
      return Object.assign({}, state, {
        current_link: action.link,
        enter: state.current_link != action.link
      })

    case AFTER_TRANSITION:
      return Object.assign({}, state, {
        enter: false
      })

    case REQUEST_PAGE:
      return Map(state).merge({
        fetch_pages: true,
        page: {}
      }).toJS()

    case RECEIVE_PAGE:
      return Map(state).merge({
        fetch_pages: false,
        page: action.page
      }).toJS()

    default:
      return state
  }
}

export default page
