const mongoose = require('mongoose')
const db = mongoose.connection

const userSchema = mongoose.Schema({
  username: String,
  password: String
}, {
  timestamps: false
})

const User = db.model('User', userSchema)

module.exports = User
