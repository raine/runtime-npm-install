const { npmInstallTo, getPkgsToBeInstalled } = require('npm-install-to')
const tempy = require('tempy')
const path = require('path')
const util = require('util')
const fs = require('fs')

const readFile = util.promisify(fs.readFile)
const readJsonFile = (p) => readFile(p, 'utf8').then(JSON.parse)
const flip = (fn) => {
  return function(first, second) {
    var rest = [].slice.call(arguments, 2)
    return fn.apply(null, [second, first].concat(rest))
  }
}

const npmInstallAsync = async (
  packages,
  installPath = tempy.directory(),
  npmInstallToOpts
) => {
  const { packages: installed, npmOutput } = await npmInstallTo(
    installPath,
    packages,
    npmInstallToOpts
  )
  return {
    packages: await Promise.all(
      packages.map(async (pkg) => {
        const packagePath = installed[pkg]
        const packageJson = await readJsonFile(
          path.join(packagePath, 'package.json')
        )

        return {
          spec: pkg,
          name: packageJson.name,
          json: packageJson,
          path: packagePath
        }
      })
    ),
    npmOutput
  }
}

const npmImportAsync = async (packages, installPath = tempy.directory()) => {
  const { packages: installed } = await npmInstallTo(installPath, packages)
  return packages.map((pkg) => require(installed[pkg]))
}

module.exports = {
  npmInstallAsync,
  npmImportAsync,
  getPkgsToBeInstalled: flip(getPkgsToBeInstalled)
}
