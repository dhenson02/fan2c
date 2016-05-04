import babel from 'rollup-plugin-babel';
import uglify from 'rollup-plugin-uglify';
import nodeResolve from 'rollup-plugin-node-resolve';
import { minify } from 'uglify-js';

export default {
    entry: 'src/js/Main.js',
    format: 'umd',
    plugins: [
        babel(),
        nodeResolve({
            jsnext: true,
            main: true
        }),
        uglify({}, minify)
    ],
    dest: 'dist/js/_App.js'
};
