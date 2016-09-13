'use strict'

const Hapi = require('hapi')
const Immutable = require('immutable')
const fs = require('fs')
const util = require('util')

const port = process.env.PORT || 3000
const server = new Hapi.Server()

server.connection({ 
  host: '0.0.0.0', 
  port: port,
  routes: {
    cors: true
  }
})

server.route({
  method: 'GET',
  path: '/posts', 
  handler: (request, reply) => {
    const filter = request.query.filter
    const limit = parseInt(request.query.limit || 10)
    const page = parseInt(request.query.page || 10)
    const posts = Immutable.List(require('./posts.json')).filter((item) => {
      return !filter || item.title.toLowerCase().includes(filter.toLowerCase())
    })
    return reply({
      success: true,
      data: posts,
      count: posts.toJS().length,
      page: page,
      limit: limit
    })
  }
})

server.route({
  method: 'GET',
  path: '/posts/{slug}',
  handler: (request, reply) => {
    const slug = request.params.slug
    const list = Immutable.List(require('./posts.json'))
    const post = list.find(item => item.slug == slug)
    return reply({ success: true, data: post })
  }
})

server.route({
  method: 'GET',
  path: '/posts/latest', 
  handler: (request, reply) => {
    const posts = Immutable.List(require('./posts.json'))
    return reply({
      success: true,
      data: posts
    })
  }
})

server.start((err) => {
  if (err) throw err
  console.log('Server running at:', server.info.uri)
})
