const path = require('path')

module.exports = {
  INPUT_DIR: path.resolve(path.join(__dirname, '/..')),
  OUTPUT_DIR: path.resolve(__dirname + '/../../_site'),
  PATH_PREFIX: "/"
}