import settings from '../data/settings'

export default {
  get: function(name) {
    return settings[name]
  },
  getUrlToShare: function() {
    return window.location.href;
  }
}
