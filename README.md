# runtime-npm-install

Install npm modules programmatically

## key features

- under the hood, uses globally installed npm through
  [`npm-install-to`](https://github.com/raine/npm-install-to) 
- takes packages in the equivalent format as `npm install`
  - `@scope/name`
  - `name@tag/version`
  - `githubusername/repo`
  - etc.
- once installed packages will resolve instantly due to caching

## install

```sh
npm install runtime-npm-install
```

## usage

Provides two functions, of which `npmInstallAsync` returns metadata of installed
modules, while `npmImportAsync` returns a list of what installed modules export.

The argument `installPath` determines where modules should be `npm install`ed on
the file system. It defaults to a temporary directory, but should be given if
you wish subsequent invocations to either function to be quick. See
[`npm-install-to`](https://github.com/raine/npm-install-to/#caching) for more on
the caching.

The argument of `packages` is a list of package specs as strings, corresponding
to how `npm install` command is given packages to be installed. More information
on that available with `npm help install`.

### API

#### `npmInstallAsync(packages: string[], installPath?: string): Promise<...>`

Installs specified packages, returning a promise that resolves to an object
containing output of `npm install` and metadata of installed packages.

##### example

```js
const { npmInstallAsync } = require('../')
const path = require('path')
const tmpDir = path.join(require('os').tmpdir(), 'my-app')
npmInstallAsync([
  'treis@2.6.0',
  'lodash',
  'ramda@0.26.1'
], tmpDir)
.then(console.log)
```

##### output

```js
{ packages:
   [ { spec: 'treis@2.6.0',
       name: 'treis',
       json: [Object],
       path:
        '/var/folders/5w/g91lyqdd20b4wsrb2r434nwr0000gn/T/my-app/node_modules/treis' },
     { spec: 'lodash',
       name: 'lodash',
       json: [Object],
       path:
        '/var/folders/5w/g91lyqdd20b4wsrb2r434nwr0000gn/T/my-app/node_modules/lodash' },
     { spec: 'ramda@0.26.1',
       name: 'ramda',
       json: [Object],
       path:
        '/var/folders/5w/g91lyqdd20b4wsrb2r434nwr0000gn/T/my-app/node_modules/ramda' } ],
  npmOutput:
   '+ treis@2.6.0\n+ ramda@0.26.1\n+ lodash@4.17.11\nadded 12 packages from 9 contributors and audited 15 packages in 1.492s\nfound 0 vulnerabilities' }
```

#### `npmImportAsync(packages: string[], installPath?: string): Promise<...>`

Installs specified packages, returning exports corresponding to each package as
a list.

##### example

```js
const { npmImportAsync } = require('runtime-npm-install')

;(async () => {
  const [treis, _, R] = await npmImportAsync([
    'treis@2.6.0',
    'lodash',
    'ramda@0.26.1'
  ])

  R.add(1, _.add(5, 1)) // 7
})()
```

### demo of debug logging and cache


```js
const { npmInstallAsync } = require('npm-install-to')
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
```

![](https://raine.github.io/runtime-npm-install/screenshot-1.png?3)
