# transmute
Model based, tecnology agnostic, code-first, automated file scaffolding tool


[![Maintenance](https://img.shields.io/badge/Maintained%3F-yes-green.svg)](https://GitHub.com/satelite-digital/library-template/graphs/commit-activity)



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
