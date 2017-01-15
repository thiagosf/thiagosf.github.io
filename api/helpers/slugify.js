module.exports = function(str) {
  str = str.replace(/^\s+|\s+$/g, '')
  str = str.toLowerCase()
  const from = "ãàáäâèéëêìíïîõòóöôùúüûñç·/_,:;"
  const to = "aaaaaeeeeiiiiooooouuuunc------"
  for (var i = 0, l = from.length; i<l ; i++) {
    str = str.replace(new RegExp(from.charAt(i), 'g'), to.charAt(i))
  }
  str = str.replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
  return str
}
