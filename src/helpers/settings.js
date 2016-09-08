import settings from '../data/settings'

export default {
  get: function(name) {
    return settings[name]
  }
}
