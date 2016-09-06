import { TOGGLE_NAV } from '../constants'

let initialState = {
  opened: false
}

const nav = (state = initialState, action) => {
  switch (action.type) {
    case TOGGLE_NAV:
      return Object.assign({}, state, {
        opened: !state.opened
      })

    default:
      return state
  }
}

export default nav
