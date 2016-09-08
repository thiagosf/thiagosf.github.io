import { settings } from './'

export default {
  setTitle: (title) => {
    if (title != document.title) {
      document.title = title
    }
  },
  setSubTitle: (sub_title) => {
    let title = `${sub_title} – ${settings.get('short_title')}`
    if (title != document.title) {
      document.title = title
    }
  }
}
