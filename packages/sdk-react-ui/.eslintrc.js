const path = require('path');

/**
 * @type {import('eslint').Linter.Config}
 */
module.exports = {
  extends: ['@metamask/eslint-config-typescript'],
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [path.resolve(__dirname, 'tsconfig.json')],
  },

  overrides: [
    {
      files: ['**/*.js'],
      extends: ['@metamask/eslint-config-nodejs'],
    },

    {
      files: ['**/*.ts'],
      extends: ['@metamask/eslint-config-typescript'],
      rules: {
        '@typescript-eslint/consistent-type-definitions': [
          'error',
          'interface',
        ],
        '@typescript-eslint/no-floating-promises': 'error',
        'no-async-promise-executor': 'error',
        'import/no-named-as-default': 0,
        'no-shadow': 'off',
        '@typescript-eslint/no-shadow': ['error'],
      },
    },

    {
      files: ['**/*.test.ts', '**/*.test.js'],
      extends: ['@metamask/eslint-config-jest'],
      rules: {
        '@typescript-eslint/no-shadow': [
          'error',
          { allow: ['describe', 'expect', 'it'] },
        ],
      },
    },
  ],

  rules: {
    'import/no-named-as-default': 0,
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
  },

  ignorePatterns: [
    '!.prettierrc.js',
    '**/.eslintrc.js',
    '**/dist*/',
    'rollup.config.js',
    'webpack.config.js',
    '**/coverage/**',
  ],
};