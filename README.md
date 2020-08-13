# Satelite Engineer

Data oriented and language agnostic automated code generation tool


## Getting started

### Prerequisites

- [NodeJS](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/get-npm)
- [GIT](https://git-scm.com/downloads)


### Installing

Install Satelite CLI and Satelite Engineer:

```bash
npm install @satelite/cli @satelite/engineer
```

Initialize configuration file:

```
npx @satelite/cli init
```

This will create a *satelite.engineer.config.js* file that includes a minimal working configuration at the root of your project, as well as an *engineer* folder containing an example data input JSON file and a *files* subfolder which contains an example code.js file that implements data from example input file.

```
.
├── satelite.engineer.config.js
├── data
│   └── data.json
│   └── files
│       └── code.js

```

## Configuration

Engineer requires a JSON input file (will be adding YAML support next)

Open satelite.engineer.config.js and set path to your data input file

```
{
...,
"resources" : [
    "src" : "./satelite-engineer/files/",
]
```

Next you can add files that are going to be parsed by Engineer to generate the code

### Manual configuration

A resource is any file which implements Handlebars.js directives that match a section or your complete data input model to generate the finished code

You can add a resources Key to your configuration object which must be an array containing objects with the following schema:

```
{
  "$schema": "http://json-schema.org/draft-07/schema#",
  "$id": "http://satelite.digital/engineer.resource.schema.json",
  "title": "Resource",
  "description": "A resource definition for Satelite Engineer",
  "type": "object",
  "properties": {
    "src": {
      "description": "A glob compliant pattern string to select a set of source files, a folder or a single file",
      "type": "string"
    },
    "dest": {
      "description": "A file system path relative to the root of the project to which source files are going to be written once parsed and compiled",
      "type": "string"
    },
     "key": {
      "description": "A _lodash.get compliant key address to specify which section of your data model should be used for this file or set of files",
      "type": "string"
    }
  },
  "required": [ "src" ]
}
```

For example:

```
{
...,
"resources" : [
    {
      "src" : "./engineer/files",
      "dest" : "./src/"
    },
    {
      "src" : "./node_modules/@satelite/client/template",
      "dest" : "./node_modules/@satelite/client/src"
    },
    {
      "src" : "./node_modules/@satelite/views/template",
      "dest" : "./node_modules/@satelite/views/src"
    },
    {
      "src" : "./node_modules/@satelite/forms/template",
      "dest" : "./node_modules/@satelite/forms/src"
    }
]
```

### Automatic configuration

pending documentation


## Building and maintaining

`npm run build` builds the library to `dist`, generating three files:

* `dist/lib.cjs.js`
    A CommonJS bundle, suitable for use in Node.js, that `require`s the external dependency. This corresponds to the `"main"` field in package.json
* `dist/lib.esm.js`
    an ES module bundle, suitable for use in other people's libraries and applications, that `import`s the external dependency. This corresponds to the `"module"` field in package.json

`npm run dev` builds the library, then keeps rebuilding it whenever the source files change using [rollup-watch](https://github.com/rollup/rollup-watch).

`npm test` builds the library, then tests it.

## Running the tests

Pending documentation

```
npm run test
```

## Deployment

Add additional notes about how to deploy this on a live system

## Built With

* [Glob](https://github.com/isaacs/node-glob#readme) - Used for file fetching

## Contributing

Please read [CONTRIBUTING.md](https://github.com/satelite-digital/engineer/contributing.md) for details on our code of conduct, and the process for submitting pull requests to us.

### To do

- Add support for XML, TOML, CSON and YAML data inputs

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

This software is being peer programmed by:

* **Erick Ruano** - *Initial work* - [Erick](https://github.com/ErickRuano)
* **William Chanchavac** - *Initial work* - [William]https://github.com/WilliamChanchavac)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

https://github.com/satelite-digital/engineer/graphs/contributors
