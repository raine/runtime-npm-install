# runtime-npm-install

Provides an API for `npm install`
through[`npm-install-to`](https://github.com/raine/npm-install-to)

## introduction

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
[`npm-install-to`](https://github.com/raine/npm-install-to/#caching) for more.

### API

#### `npmInstallAsync(packages: string[], installPath?: string): Promise<...>`

##### example

```js
const tmpDir = path.join(require('os').tmpdir(), 'my-app')
npmInstallAsync([
  'treis@2.6.0',
  'lodash',
  'ramda@0.26.1'
], tmpDir)
.then(console.log)
```

```
[ { spec: 'treis@2.6.0',
    name: 'treis',
    json: [Object], // package.json
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
     '/var/folders/5w/g91lyqdd20b4wsrb2r434nwr0000gn/T/my-app/node_modules/ramda' } ]
```

#### `npmImportAsync(packages: string[], installPath?: string): Promise<...>`

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
