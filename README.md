[This project is deprecated and will be replaced by [Instantcode](https://github.com/erickruano/instantcode)]

# Satelite Engineer

A next-gen Low-code/No-code tool that enables developers to turn their code into code generating platforms for any programming language.


## Getting started

### Prerequisites

- [NodeJS](https://nodejs.org/en/download/)
- [NPM](https://www.npmjs.com/get-npm)
- [GIT](https://git-scm.com/downloads)


### Installing

Install Satelite CLI:

```bash
npm i -g @satelite/engineer-cli
```

Initialize configuration file:

```
engineer init
```

This will create a *engineer.config.js* file that includes a minimal working configuration at the root of your project, as well as an *.engineer* folder containing an example input data JSON file and a *files* subfolder which contains an example code.js file that implements data from example input file.

```
.
├── engineer.config.js
├── .engineer
│   └── data.json
│   └── files
│       └── code.js

```

## Configuration

Engineer requires a JSON input file (will be adding YAML support next)

Open engineer.config.js and set path to your data input file

```
{
...,
"options" : [
    "data" : "./.engineer/data.json"
],
...
```

Next you can add files that are going to be processed by Engineer to generate the code

### Manual configuration

A resource is any file which implements a templating engine directives that match a section or your complete data input model to generate the finished code

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
      "description": "String with path to source file with template directives",
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
      "src" : "./dev/files/code.js",
      "dest" : "./src/code.js"
    },
    {
      "src" : "./dev/files/code.js",
      "key" : "demo"
      "dest" : "./src/[id]/[id]Code.js"
    }
]
```

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

* [Hanldebars](https://handlebarsjs.com/) - Used as template engine
* [Jetpack](https://github.com/szwacz/fs-jetpack) - Used for working with file system
* [Glob](https://github.com/isaacs/node-glob#readme) - Used for file fetching

## Contributing

Please read [CONTRIBUTING.md](https://github.com/satelite-digital/engineer/blob/master/CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

### To do

- Add support for XML, TOML, CSON and YAML data inputs

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

This software is being peer programmed by:

* **Erick Ruano** - *Initial work* - [Erick](https://github.com/ErickRuano)
* **William Chanchavac** - *Initial work* - [William](https://github.com/WilliamChanchavac)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.


## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

https://github.com/satelite-digital/engineer/graphs/contributors
