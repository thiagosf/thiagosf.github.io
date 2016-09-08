import { AFTER_TRANSITION } from '../constants'

export const enterPage = (dispatch) => {
  setTimeout(() => {
    dispatch({
      type: AFTER_TRANSITION
    })
  }, 500)
}
