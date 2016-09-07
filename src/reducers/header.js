import { SCROLLED } from '../constants'

let initialState = {
  small: false
}

const header = (state = initialState, action) => {
  switch (action.type) {
    case SCROLLED:
      return Object.assign({}, state, {
        small: action.scroll_top > 50 && action.direction == 'down'
      })

    default:
      return state
  }
}

export default header
