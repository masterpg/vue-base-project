const path = require('path');
const CopyWebpackPlugin = require('copy-webpack-plugin');

// ベースURLの設定
const baseUrl = process.env.VUE_APP_ENV === 'production' ? '/vue-www-base/' : '/';

// 各エントリーポイントの設定
const pages = {
  index: {
    // entry for the page
    entry: 'src/index.ts',
    // the source template
    template: 'src/index.html',
    // output as dist/playground.html
    filename: 'index.html',
    // template title tag needs to be <title><%= htmlWebpackPlugin.options.title %></title>
    title: 'Vue WWW Base',
  },
};
if (process.env.VUE_APP_ENV !== 'production') {
  Object.assign(pages, {
    test: {
      entry: 'test/test.ts',
      template: 'test/test.html',
      filename: 'test.html',
      title: 'Vue WWW Base Unit Test',
    },
    playground: {
      entry: 'src/playground.ts',
      template: 'src/playground.html',
      filename: 'playground.html',
      title: 'Vue WWW Base Playground',
    },
  });
}

module.exports = {
  baseUrl,

  pages,

  transpileDependencies: [],

  pwa: {
    name: 'vue-www-base',
    workboxOptions: {
      skipWaiting: true,
      // exclude: [/index\.html$/],
    },
    iconPaths: {
      favicon32: 'img/icons/manifest/favicon-32x32.png',
      favicon16: 'img/icons/manifest/favicon-16x16.png',
      appleTouchIcon: 'img/icons/manifest/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/manifest/safari-pinned-tab.svg',
      msTileImage: 'img/icons/manifest/msapplication-icon-144x144.png',
    },
  },

  chainWebpack: (config) => {
    // Vue I18n 単一ファイルコンポーネントの設定
    // http://kazupon.github.io/vue-i18n/guide/sfc.html
    config.module
      .rule('i18n')
      .resourceQuery(/blockType=i18n/)
      .type('javascript/auto')
      .use('i18n')
        .loader('@kazupon/vue-i18n-loader')
        .end()
      .use('yaml')
        .loader('yaml-loader')
        .end();
    // Babelの設定
    // ※ @vue/cli-plugin-babel を試したが、IE11でPolymerがうまく
    // 動かなかったため、プレンーな @babel/preset-env を使用して対応。
    config.module
      .rule('js')
      .test(/\.js$/)
      .use('babel-loader')
        .loader('babel-loader')
        .end();
  },

  configureWebpack: (config) => {
    const plugins = [
      new CopyWebpackPlugin([
        {
          from: path.resolve(__dirname, 'node_modules/@webcomponents/webcomponentsjs/**/*.js'),
        },
      ]),
    ];
    if (process.env.VUE_APP_ENV !== 'production') {
      plugins.push(
        new CopyWebpackPlugin([
          { from: 'node_modules/mocha/mocha.css', to: 'node_modules/mocha' },
          { from: 'node_modules/mocha/mocha.js', to: 'node_modules/mocha' },
          { from: 'node_modules/chai/chai.js', to: 'node_modules/chai' },
        ]),
      );
    }
    return {
      plugins,
    };
  },

  devServer: {
    port: 5000,
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:5010',
        secure: false,
      },
    },
  },
};
