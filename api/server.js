'use strict'

const Hapi = require('hapi')
const Inert = require('inert')
const Immutable = require('immutable')
const fs = require('fs')
const util = require('util')
const Bcrypt = require('bcrypt')
const Basic = require('hapi-auth-basic')

const host = process.env.HOST || '0.0.0.0'
const port = process.env.PORT || 3000
const server = new Hapi.Server()
const slugify = require('./helpers/slugify')
const upload = require('./helpers/upload')

require('./database')
const Post = require('./models').Post
const User = require('./models').User
const Page = require('./models').Page

const onError = (reply, message, error) => {
  return reply({
    success: false,
    message: message,
    error: error ? error.message : undefined,
    validations: error ? error.errors : undefined
  }).code(400)
}

const validate = function (request, username, password, callback) {
  User.findOne({ username: username }).then((data) => {
    if (!data) return callback(null, false)
    Bcrypt.compare(password, data.password, (err, isValid) => {
      if (isValid) {
        request.user = data
      }
      callback(err, isValid, { name: data.name })
    })
  })
}

server.connection({
  host: host,
  port: port,
  routes: {
    cors: true
  }
})

server.register([Inert, Basic], (err) => {
  if (err) throw err

  server.auth.strategy('simple', 'basic', { validateFunc: validate })

  server.route({
    method: 'GET',
    path: '/{param*}',
    handler: {
      directory: {
        path: 'public'
      }
    }
  })

  // Posts
  server.route({
    method: 'GET',
    path: '/posts',
    handler: (request, reply) => {
      const filter = request.query.filter
      var limit = parseInt(request.query.limit || 10)
      var page = parseInt(request.query.page || 1)
      var params = { active: true }
      var options = { page: page, limit: limit, sort: '-createdAt' }
      if (filter) {
        limit = 20
        var sort = { score: { $meta: 'textScore' } }
        params.$text = {
          $search: filter,
          $caseSensitive: false,
          $diacriticSensitive: false
        }
        options = {
          score: {
            $meta: 'textScore'
          }
        }
        return Post.find(params, options).sort(sort).limit(limit).then((result) => {
          reply({
            success: true,
            data: result.map((item) => {
              return item.apiFormat()
            }),
            count: result.length,
            page: page,
            limit: limit,
            pages: 1
          })
        })
      } else {
        return Post.paginate(params, options).then((result) => {
          reply({
            success: true,
            data: result.docs.map((item) => {
              return item.apiFormat()
            }),
            count: result.total,
            page: page,
            limit: limit,
            pages: result.pages
          })
        })
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/posts',
    config: {
      auth: 'simple',
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        maxBytes: 1048576 * 5
      },
      handler: (request, reply) => {
        const data = new Post()
        let slug = request.payload.slug
        if (!slug) {
          slug = slugify(request.payload.title)
        }
        var create_data = {
          title: request.payload.title,
          slug: slug,
          image: null,
          excerpt: request.payload.excerpt,
          createdAt: new Date(),
          updatedAt: new Date(),
          body: request.payload.body,
          tags: request.payload.tags
        }
        if (request.payload.createdAt) {
          create_data.createdAt = request.payload.createdAt
        }
        data.patchEntity(create_data).save().then((data) => {
          const file = request.payload.image
          if (file) {
            upload.store(data, file).then((file_data) => {
              data.patchEntity({ image: file_data.name }).save().then((data) => {
                reply({
                  success: true,
                  data: data.apiFormat()
                })
              }).catch(onError.bind(this, reply, 'Erro ao salvar imagem'))
            }).catch(onError.bind(this, reply, 'Erro ao subir imagem'))
          } else {
            reply({
              success: true,
              data: data.apiFormat()
            })
          }
        }).catch(onError.bind(this, reply, 'Não foi possível salvar o post'))
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/posts/{slug}',
    handler: (request, reply) => {
      const slug = request.params.slug
      return Post.findOne({ slug: slug }).then((data) => {
        if (!data) throw Error('Post não encontrado')
        reply({
          success: true,
          data: data.apiFormat()
        })
      }).catch(onError.bind(this, reply, 'Post não encontrado'))
    }
  })

  server.route({
    method: 'GET',
    path: '/posts/latest',
    handler: (request, reply) => {
      const params = { active: true }
      if (request.query.current_post_id) {
        params._id = { $ne: request.query.current_post_id }
      }
      const options = { limit: 4, sort: '-createdAt' }
      return Post.paginate(params, options).then((result) => {
        reply({
          success: true,
          data: result.docs.map((item) => {
            return item.apiFormat()
          })
        })
      })
    }
  })

  server.route({
    method: 'PATCH',
    path: '/posts/{id}',
    config: {
      auth: 'simple',
      payload: {
        output: 'stream',
        parse: true,
        allow: 'multipart/form-data',
        maxBytes: 1048576 * 5
      },
      handler: (request, reply) => {
        const id = request.params.id
        return Post.findOne({ _id: id }).then((data) => {
          if (!data) throw Error('Post não encontrado')
          let slug = request.payload.slug
          if (!slug) {
            slug = slugify(request.payload.title)
          }
          var update_data = {
            title: request.payload.title,
            slug: slug,
            image: null,
            excerpt: request.payload.excerpt,
            updatedAt: new Date(),
            body: request.payload.body,
            tags: request.payload.tags
          }
          return new Promise((resolve, reject) => {
            const file = request.payload.image
            if (file) {
              upload.store(data, file).then((file_data) => {
                resolve(file_data)
              }).catch((error) => {
                reject(error)
              })
            } else {
              resolve(null)
            }
          }).then((file_data) => {
            if (file_data) {
              update_data.image = file_data.name
            }
            return data.patchEntity(update_data).save().then((data) => {
              reply({
                success: true,
                data: data.apiFormat()
              })
            }).catch(onError.bind(this, reply, 'Não foi possível remover post'))
          }).catch(onError.bind(this, reply, 'Não foi possível remover post'))
        }).catch(onError.bind(this, reply, 'Post não encontrado'))
      }
    }
  })

  server.route({
    method: 'DELETE',
    path: '/posts/{slug}',
    config: {
      auth: 'simple',
      handler: (request, reply) => {
        const slug = request.params.slug
        return Post.findOne({ slug: slug }).then((data) => {
          if (!data) throw Error('Post não encontrado')
          return data.remove().then((data) => {
            const images = data.getLocalImages();
            if (images) {
              images.map((image) => {
                fs.stat(image, (error, stats) => {
                  if (!error) {
                    fs.unlink(image)
                  }
                })
              })
            }
            reply({ success: true })
          }).catch(onError.bind(this, reply, 'Não foi possível remover post'))
        }).catch(onError.bind(this, reply, 'Post não encontrado'))
      }
    }
  })

  // Pages
  server.route({
    method: 'POST',
    path: '/pages',
    config: {
      auth: 'simple',
      handler: (request, reply) => {
        const data = new Page()
        let slug = request.payload.slug
        if (!slug) {
          slug = slugify(request.payload.title)
        }
        var create_data = {
          title: request.payload.title,
          slug: slug,
          body: request.payload.body,
          keyValues: request.payload.keyValues,
          pageItems: request.payload.pageItems
        }
        data.patchEntity(create_data).save().then((data) => {
          reply({
            success: true,
            data: data
          })
        }).catch(onError.bind(this, reply, 'Não foi possível salvar a página'))
      }
    }
  })
  server.route({
    method: 'PUT',
    path: '/pages/{slug}',
    config: {
      auth: 'simple',
      handler: (request, reply) => {
        const slug = request.params.slug
        return Page.findOne({ slug: slug }).then((data) => {
          if (!data) throw Error('Página não encontrada')
          var update_data = {
            body: request.payload.body,
            keyValues: request.payload.keyValues,
            pageItems: request.payload.pageItems
          }
          if (request.payload.createdAt) {
            update_data.createdAt = request.payload.createdAt
          }
          return data.patchEntity(update_data).save().then((data) => {
            reply({
              success: true,
              data: data.apiFormat()
            })
          }).catch(onError.bind(this, reply, 'Não foi possível atualizar a página'))
        }).catch(onError.bind(this, reply, 'Página não encontrada'))
      }
    }
  })

  server.route({
    method: 'GET',
    path: '/pages/{slug}',
    handler: (request, reply) => {
      const slug = request.params.slug
      return Page.findOne({ slug: slug }).then((data) => {
        if (!data) throw Error('Página não encontrada')
        reply({
          success: true,
          data: data
        })
      }).catch(onError.bind(this, reply, 'Página não encontrada'))
    }
  })

  // Login
  server.route({
    method: 'POST',
    path: '/users/login',
    config: {
      handler: (request, reply) => {
        let username = request.payload.username
        let password = request.payload.password

        User.findOne({ username: username }).then((data) => {
          if (!data) return callback(null, false)
          Bcrypt.compare(password, data.password, (err, isValid) => {
            if (isValid) {
              reply({
                success: true,
                message: 'Login efetuado com sucesso',
                data: {
                  id: data._id,
                  username: data.username,
                  active: data.active
                }
              })
            } else {
              reply({
                success: false,
                message: 'Credenciais inválidas'
              })
            }
          })
        })
      }
    }
  })

  server.start((err) => {
    if (err) throw err
    console.log('Server running at:', server.info.uri)
  })
})
