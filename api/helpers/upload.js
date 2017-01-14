const hat = require('hat')
const fs = require('fs')
const Promise = require('bluebird')
const path = require('path')
const im = require('imagemagick')
const imCrop = Promise.promisify(im.crop)

module.exports = {
  store: function (record, file, options) {
    return new Promise((resolve, reject) => {
      var name = file.hapi.filename
      var extension = name.split('.').reverse().shift()
      name = hat() + '.' + extension

      const folder = options && options.folder ? options.folder : 'uploads'
      const filepath = `./public/${folder}/${name}`
      const file_stream = fs.createWriteStream(filepath)
      
      file_stream.on('error', (err) => {
        reject(err)
      })
      
      file.pipe(file_stream)
      
      file.on('end', () => {
        if (true) {
          const fileinfo = { path: filepath, name: name }
          this.crop(fileinfo, record.getImageOptions()).then((data) => {
            resolve({ name: name, hapi: file.hapi, data: data })
          })
        } else {
          resolve({ name: name })
        }
      })
    })
  },
  crop: function (file, config) {
    var promises = []
    var default_options;
    var options;
    var size;
    for (size in config.sizes) {
      default_options = {
        srcPath: file.path,
        dstPath: `${config.output}${size}_${file.name}`,
        quality: 0.7,
        format: 'jpg'
      }
      options = Object.assign(default_options, config.sizes[size])
      promises.push(imCrop(options))
    }
    return Promise.all(promises)
  }
}
