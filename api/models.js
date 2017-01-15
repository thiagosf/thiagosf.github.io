const mongoose = require('mongoose')
const db = mongoose.connection
const api = require('./helpers/api')
const mongoosePaginate = require('mongoose-paginate')

const postSchema = mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Digite o título'],
  },
  slug: String,
  image: String,
  excerpt: String,
  body: String,
  active: {
    type: Boolean,
    default: true
  },
  tags: [String]
}, {
  timestamps: true
})

postSchema.index({ title: 'text', excerpt: 'text', body: 'text' }, {
  weights: {
    title: 10,
    excerpt: 9,
    body: 8,
  }
})

postSchema.methods.patchEntity = function (data) {
  if (data.title) this.set('title', data.title)
  if (data.slug) this.set('slug', data.slug)
  if (data.excerpt) this.set('excerpt', data.excerpt)
  if (data.body) this.set('body', data.body)
  if (data.image) this.set('image', data.image)
  if (data.createdAt) this.set('createdAt', data.createdAt)
  if (data.tags) this.set('tags', data.tags)
  return this
}

postSchema.methods.getImageOptions = function () {
  return {
    output: `./public/uploads/`,
    sizes: {
      large: {
        width: 500,
        height: 400
      },
      header: {
        width: 800,
        height: 350
      }
    }
  }
}

postSchema.methods.getLink = function () {
  return `/posts/${this.slug}`
}

postSchema.methods.getImage = function () {
  if (this.image) {
    return api.static(`/uploads/large_${this.image}`)
  }
}

postSchema.methods.getImageHeader = function () {
  if (this.image) {
    return api.static(`/uploads/header_${this.image}`)
  }
}

postSchema.methods.getLocalImages = function () {
  if (this.image) {
    return [
      `./public/uploads/${this.image}`,
      `./public/uploads/large_${this.image}`,
      `./public/uploads/header_${this.image}`
    ]
  }
}

postSchema.methods.apiFormat = function () {
  var output = {}
  output.id = this._id
  output.image = this.getImage()
  output.image_header = this.getImageHeader()
  output.title = this.title
  output.slug = this.slug
  output.link = this.getLink()
  output.created_at = this.createdAt
  output.excerpt = this.excerpt
  output.body = this.body
  output.tags = this.tags
  return output
}

postSchema.plugin(mongoosePaginate)

postSchema.pre('save', function(next) {
  var options = { slug: this.slug }
  if (this._id) {
    options._id = { $ne: this._id }
  }
  return Post.count(options).then((count) => {
    if (count > 0) return next(new Error('Esse slug já existe!'))
    next()
  })
})

const Post = db.model('Post', postSchema)

const userSchema = mongoose.Schema({
  username: String,
  password: String
}, {
  timestamps: false
})

const User = db.model('User', userSchema)

module.exports = {
  Post: Post,
  User: User
}
