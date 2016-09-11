export default {
  isProduction: function() {
    const location = window.location
    return location.host.includes('thiagosf.net') || location.host.includes('thiagosf.github.io')
  }
}
