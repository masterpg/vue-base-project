const merge = require('lodash/merge')

const prettierConfig = require('./prettier.config')

const eslintConfig = merge(
  require('web-base-lib/.eslintrc.base.js'),
  {
    'extends': [
      'plugin:vue/recommended',
      '@vue/typescript',
    ],
    'rules': {
      'prettier/prettier': ['error', prettierConfig],
      'vue/html-self-closing': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/singleline-html-element-content-newline': 'off',
    },
  },
)

module.exports = eslintConfig
