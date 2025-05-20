const eslintPluginPrettier = require('eslint-plugin-prettier')
const eslintPluginImport = require('eslint-plugin-import')
const tseslint = require('typescript-eslint')

module.exports = tseslint.config({
  files: ['**/*.ts'],
  languageOptions: {
    parser: tseslint.parser,
    parserOptions: {
      project: './tsconfig.json',
    },
  },
  plugins: {
    '@typescript-eslint': tseslint.plugin,
    import: eslintPluginImport,
    prettier: eslintPluginPrettier,
  },
  ignores: ['node_modules', 'dist', 'eslint.config.js'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        endOfLine: 'auto',
      },
    ],
    'import/order': [
      'error',
      {
        groups: [
          'external',
          'type',
          ['builtin', 'internal'],
          ['parent', 'sibling'],
          'index',
          'unknown',
        ],

        pathGroups: [
          {
            pattern: '@**',
            group: 'internal',
            position: 'after',
          },
        ],

        'newlines-between': 'always',
      },
    ],
    '@typescript-eslint/no-explicit-any': 'warn',
    'no-console': 'error',
  },
})
