import babel from 'rollup-plugin-babel';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import { eslint } from 'rollup-plugin-eslint';
import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  input: 'src/game.js',
  output: {
    file: 'lib/jogo-da-velha.js',
    format: 'umd'
  },
  name: 'Game',
  plugins: [
    eslint({
      exclude: [
        'node_modules/**',
        'lib/**'
      ]
    }),
    babel({
      exclude: 'node_modules/**'
    }),
    resolve({
      module: true,
      jsnext: true,
      main: true,
      browser: true
    }),
    commonjs(),
    replace({
      exclude: 'node_modules/**',
      ENV: JSON.stringify(process.env.NODE_ENV || 'development'),
    }),
    (process.env.NODE_ENV === 'production' && uglify()),
  ]
};
