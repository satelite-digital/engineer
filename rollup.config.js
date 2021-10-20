import resolve from '@rollup/plugin-node-resolve';
import json from '@rollup/plugin-json';
import pkg from './package.json';

export default {
  input: 'src/index.js',
  external: ['fs-extra', 'decompress'],
  plugins: [json(), resolve()],
  output: [
    { file: pkg.main, format: 'cjs', exports: 'named' },
    { file: pkg.module, format: 'es', exports: 'named' },
  ],
};
