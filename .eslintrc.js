'use strict';

module.exports = {
  root: true,
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'script',
  },
  env: {
    node: true,
    es2022: true,
  },
  extends: ['eslint:recommended'],
  rules: {
    strict: ['error', 'global'],
  },
  overrides: [
    {
      files: ['build/**/*.mjs'],
      parserOptions: {
        sourceType: 'module',
      },
    },
  ],
};
