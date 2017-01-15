const mongoose = require('mongoose')
const db = mongoose.connection

const PageKeyValue = mongoose.Schema({
  key: String,
  value: String
}, {
  timestamps: false
})

const PageItem = mongoose.Schema({
  title: String,
  description: String,
  link: String
}, {
  timestamps: false
})

const pageSchema = mongoose.Schema({
  title: String,
  slug: String,
  body: String,
  keyValues: [PageKeyValue],
  pageItems: [PageItem]
}, {
  timestamps: true
})

pageSchema.index({ title: 'text', body: 'text' }, {
  weights: {
    title: 10,
    body: 9,
  }
})

pageSchema.methods.patchEntity = function (data) {
  if (data.title) this.set('title', data.title)
  if (data.slug) this.set('slug', data.slug)
  if (data.body) this.set('body', data.body)
  if (data.keyValues) this.set('keyValues', data.keyValues)
  if (data.pageItems) this.set('pageItems', data.pageItems)
  return this
}

pageSchema.pre('save', function(next) {
  var options = { slug: this.slug }
  if (this._id) {
    options._id = { $ne: this._id }
  }
  return Page.count(options).then((count) => {
    if (count > 0) return next(new Error('Esse slug já existe!'))
    next()
  })
})

const Page = db.model('Page', pageSchema)

module.exports = Page
