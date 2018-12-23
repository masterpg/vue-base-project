module.exports = {
  plugins: {
    'autoprefixer': {},
    'postcss-import': {},
    'postcss-nesting': {},
    'postcss-extend': {},
    'postcss-mixins': {},
    'postcss-each': {},
    'postcss-for': {},
    'postcss-custom-properties': {
      preserve: false,
      importFrom: [
        './src/styles/partial/_colors.css',
        './src/styles/variables.css',
      ],
    },
  },
};
