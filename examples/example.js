const { npmInstallAsync } = require('../')
const path = require('path')
const taim = require('taim')

const tmpDir = path.join(require('os').tmpdir(), 'my-app')
console.log('tmpDir', tmpDir)

;(async () => {
  await taim('first npmInstallAsync', npmInstallAsync)([
    'treis@2.6.0',
    'lodash',
    'ramda@0.26.1'
  ], tmpDir)

  await taim('second npmInstallAsync', npmInstallAsync)([
    'treis@2.6.0',
    'lodash',
    'ramda@0.26.1'
  ], tmpDir)
})()
