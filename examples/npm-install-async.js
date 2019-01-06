const { npmInstallAsync } = require('../')
const path = require('path')
const tmpDir = path.join(require('os').tmpdir(), 'my-app')
npmInstallAsync([
  'treis@2.6.0',
  'lodash',
  'ramda@0.26.1'
], tmpDir)
.then(console.log)
