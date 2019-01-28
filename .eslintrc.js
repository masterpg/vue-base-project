module.exports = {
  root: true,
  env: {
    node: true,
  },
  parserOptions: {
    parser: 'typescript-eslint-parser',
  },
  extends: [
    'plugin:vue/recommended',
    'eslint:recommended',
    '@vue/prettier',
    '@vue/typescript',
  ],
  plugins: [ 'typescript' ],
  rules: {
    'prettier/prettier': [
      'off',
      {
        printWidth: 150,
        singleQuote: true,
        semi: false,
        trailingComma: 'all',
        bracketSpacing: false,
        jsxBracketSameLine: false,
        arrowParens: 'avoid',
      },
    ],
    'array-bracket-spacing': [ 'error', 'always' ],
    'comma-dangle': [
      'error',
      {
        arrays: 'always-multiline',
        objects: 'always-multiline',
        imports: 'always-multiline',
        exports: 'always-multiline',
        functions: 'never',
      },
    ],
    'comma-spacing': [ 'error', { before: false, after: true } ],
    'computed-property-spacing': [ 'error', 'never' ],
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-dupe-class-members': 'off',
    'no-unreachable': 'error',
    'no-var': 'error',
    'object-curly-spacing': [ 'error', 'always' ],
    quotes: [ 'error', 'single' ],
    semi: [ 'error', 'never', { beforeStatementContinuationChars: 'never' } ],
    'space-before-function-paren': [
      'error',
      {
        anonymous: 'never',
        named: 'never',
        asyncArrow: 'always',
      },
    ],
    'space-in-parens': [ 'error', 'never' ],
    'variable-name': {
      options: [
        'ban-keywords',
        'check-format',
        'allow-leading-underscore',
        'allow-trailing-underscore',
        'allow-pascal-case',
        'allow-snake-case',
      ],
    },
    'typescript/member-delimiter-style': [
      'error',
      {
        delimiter: 'none',
        overrides: {
          typeLiteral: {
            delimiter: 'comma',
            requireLast: true,
            ignoreSingleLine: true,
          },
        },
      },
    ],
    'typescript/no-angle-bracket-type-assertion': [ 'error' ],
    'typescript/type-annotation-spacing': [ 'error' ],
  },
}
