import typescript from 'rollup-plugin-typescript'
import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve'

export default {
  entry: './src/index.tsx',
  external: ['react', 'react-dom', 'plottable', 'd3'],
  dest: './dist/bundle.js',
  format: 'iife',
  globals: {
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