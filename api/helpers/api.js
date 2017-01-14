module.exports = {
  static: (path) => {
    var url = '//static.thiagosf.net'
    if (process.env.NODE_ENV == 'dev') {
      url = 'http://api.dev.azk.io'
    }
    return `${url}${path}`
  }
}
