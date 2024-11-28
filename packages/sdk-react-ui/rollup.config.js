import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import { terser } from 'rollup-plugin-terser';
import external from 'rollup-plugin-peer-deps-external';
import postcss from 'rollup-plugin-postcss';
import json from '@rollup/plugin-json';


const packageJson = require('./package.json');

/**
 * @type {import('rollup').RollupOptions}
 */
const config =
  [
    {
      external: ["react", "react-dom"],
      input: 'src/index.ts',
      output: [
        {
          file: packageJson.module,
          inlineDynamicImports: true,
          format: 'esm',
          sourcemap: true,
        },
      ],
      plugins: [
        external(),
        nodeResolve({
          browser: true,
        }),
        commonjs(),
        typescript({ tsconfig: './tsconfig.json' }),
        postcss({
          config: {
            path: './postcss.config.js',
          },
          extensions: ['.css'],
          minimize: true,
          inject: {
            insertAt: 'top',
          },
        }),
        json(),
        terser(),
      ],
    },
  ];

export default config;