# library-template

[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/satelite-digital/library-template/graphs/commit-activity)

[![GitHub stars](https://img.shields.io/github/stars/Naereen/StrapDown.js.svg?style=social&label=Star&maxAge=2592000)](https://GitHub.com/satelite-digital/library-template/stargazers/)

[![GitHub watchers](https://img.shields.io/github/watchers/Naereen/StrapDown.js.svg?style=social&label=Watch&maxAge=2592000)](https://GitHub.com/satelite-digital/library-temlpate/watchers/)


Este repositorio contiene una plantilla para librerías.  Implementa Rollup para generar la distribución.

Actualmente contiene una función de ejemplo:

```js
console.log(lib.greet());

// Results
Hello World!
```

```js
console.log(lib.greet("Erick"));

// Results
Hello Erick!
```


## Getting started

Clona este repositorio

```bash
npx degit satelite-digital/library-template
```


## Building and maintaining

`npm run build` builds the library to `dist`, generating three files:

* `dist/lib.cjs.js`
    A CommonJS bundle, suitable for use in Node.js, that `require`s the external dependency. This corresponds to the `"main"` field in package.json
* `dist/lib.esm.js`
    an ES module bundle, suitable for use in other people's libraries and applications, that `import`s the external dependency. This corresponds to the `"module"` field in package.json
* `dist/lib.umd.js`
    a UMD build, suitable for use in any environment (including the browser, as a `<script>` tag), that includes the external dependency. This corresponds to the `"browser"` field in package.json

`npm run dev` builds the library, then keeps rebuilding it whenever the source files change using [rollup-watch](https://github.com/rollup/rollup-watch).

`npm test` builds the library, then tests it.

## License

[MIT](LICENSE).


## To do

- Agregar documentación
- Jest para pruebas