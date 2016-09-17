'use strict'

const Hapi = require('hapi')
const Inert = require('inert')
const Immutable = require('immutable')
const fs = require('fs')
const util = require('util')

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
const server = new Hapi.Server()

server.register(Inert, () => {
  server.connection({ 
    host: host, 
    port: port,
    routes: {
      cors: true
    }
  })

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/posts', 
    handler: (request, reply) => {
      const filter = request.query.filter
      const limit = parseInt(request.query.limit || 10)
      const page = parseInt(request.query.page || 10)
      const index = (page - 1) * limit
      const posts = Immutable.List(require('./posts.json')).filter((item) => {
        return !filter || (item.title.toLowerCase().includes(filter.toLowerCase()) || item.body.toLowerCase().includes(filter.toLowerCase()) || item.excerpt.toLowerCase().includes(filter.toLowerCase()))
      }).sort((a, b) => {
        const date1 = new Date(a.created_at)
        const date2 = new Date(b.created_at)
        return date1 > date2 ? -1 : date1 < date2 ? 1 : 0
      }).slice(index, index + limit)

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
      const posts = Immutable.List(require('./posts.json')).filter((item) => {
        return item.id != request.query.current_post_id
      }).sort((a, b) => {
        const date1 = new Date(a.created_at)
        const date2 = new Date(b.created_at)
        return date1 > date2 ? -1 : date1 < date2 ? 1 : 0
      }).slice(0, 4)
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
})
