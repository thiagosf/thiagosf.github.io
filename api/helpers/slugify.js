const slugify = require('slugify2')

module.exports = function(value) {
  return slugify(value).replace(/_/, '-')
}
