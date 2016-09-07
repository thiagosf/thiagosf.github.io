import { TOGGLE_NAV, SCROLLED } from '../constants'

let initialState = {
  opened: false
}

const nav = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NAV:
      return Object.assign({}, state, {
        opened: !state.opened
      })

    case SCROLLED:
      return Object.assign({}, state, {
        opened: false
      })

    default:
      return state
  }
}

export default nav
