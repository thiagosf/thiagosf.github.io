import { SCROLLED } from '../constants'

export const onScroll = (scroll_top, direction) => {
  return {
    type: SCROLLED,
    scroll_top,
    direction
  }
}
