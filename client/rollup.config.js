import typescript from 'rollup-plugin-typescript'
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: './src/index.tsx',
  external: ['benchmark', 'd3', 'lodash', 'react', 'react-dom', 'plottable'],
  dest: './dist/bundle.js',
  format: 'iife',
  globals: {
    benchmark: 'Benchmark',
    lodash: '_',
    react: 'React',
    'react-dom': 'ReactDOM',
    plottable: 'Plottable'
  },
  moduleName: 'bigo',
  plugins: [
    commonjs(),
    // nodeResolve({
    //   jsnext: true,
    //   main: true
    // }),
    typescript()
  ]
}