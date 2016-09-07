import { TOGGLE_NAV, SCROLLED, SET_CURRENT_LINK } from '../constants'

let initialState = {
  opened: false,
  nav: [{
    label: 'Sobre',
    link: '/sobre',
    active: false
  }, {
    label: 'Projetos',
    link: '/projetos',
    active: false
  }, {
    label: 'Playground',
    link: '/playground',
    active: false
  }, {
    label: 'Posts',
    link: '/posts',
    active: false
  }],
  current_link: null
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

    case SET_CURRENT_LINK:
      return Object.assign({}, state, {
        current_link: action.current_link
      })

    default:
      return state
  }
}

export default nav
