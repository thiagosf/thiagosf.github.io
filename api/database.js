const mongoose = require('mongoose')
const Promise = require('bluebird')

mongoose.Promise = Promise
mongoose.connect(process.env.MONGODB_URI).then(() => {
  if (process.env.DROP_DATABASE == true) {
    mongoose.connection.db.dropDatabase(() => {
      console.log('- Drop database')
    })
  }
})
