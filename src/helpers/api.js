import settings from '../data/settings'
import { env } from './'

export default {
  endpoint: function() {
    if (env.isProduction()) {
      return settings.api.production
    }
    return settings.api.development
  },
  url: function(path) {
    return `${this.endpoint()}${path}`
  },
  params: function(params) {
    return params
  }
}
