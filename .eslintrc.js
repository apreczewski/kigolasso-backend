module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  rules: {
    'no-unused-vars': ['error', { 
      argsIgnorePattern: '^_', 
      varsIgnorePattern: '^_',
      args: 'after-used',
      vars: 'all',
      ignoreRestSiblings: true 
    }],
    'prefer-const': 'error',
    'no-var': 'error',
  },
  ignorePatterns: ['.eslintrc.js', 'dist/', 'node_modules/'],
};