import { AFTER_TRANSITION, SET_CURRENT_LINK } from '../constants'

let initialState = {
  current_link: null,
  enter: true
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

    default:
      return state
  }
}

export default page
