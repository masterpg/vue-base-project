const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

// ベースURLの設定
const baseUrl = process.env.VUE_APP_BASE_URL

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
}
if (process.env.VUE_APP_IS_DEVELOPMENT === 'true') {
  Object.assign(pages, {
    playground: {
      entry: 'src/playground.ts',
      template: 'src/playground.html',
      filename: 'playground.html',
      title: 'Vue WWW Base Playground',
    },
  })
}

module.exports = {
  baseUrl,

  pages,

  transpileDependencies: [],

  pwa: {
    name: 'vue-www-base',
    iconPaths: {
      favicon32: 'img/icons/manifest/favicon-32x32.png',
      favicon16: 'img/icons/manifest/favicon-16x16.png',
      appleTouchIcon: 'img/icons/manifest/apple-touch-icon-152x152.png',
      maskIcon: 'img/icons/manifest/safari-pinned-tab.svg',
      msTileImage: 'img/icons/manifest/msapplication-icon-144x144.png',
    },
    workboxOptions: {
      // skipWaitingについては以下を参照
      // https://developers.google.com/web/fundamentals/primers/service-workers/lifecycle?hl=ja#updates
      skipWaiting: true,

      // ServiceWorkerインストール時にキャッシュされるファイルを設定
      include: [/\.html$/, /\.js$/, /\.css$/, /^favicon\.ico$/],
      exclude: [/\.map$/],

      // `/`以下のパスで存在しないファイルまたはディレクトリが
      // 指定された場合にindex.htmlへフォールバックするよう設定
      navigateFallback: '/index.html',
      navigateFallbackWhitelist: [/^\//],

      // フェッチ時にキャッシュされるパスを設定
      runtimeCaching: [
        {
          urlPattern: /\/api\//,
          handler: 'networkFirst',
        },
        {
          urlPattern: /\/icons\//,
          handler: 'networkFirst',
        },
      ],
    },
  },

  chainWebpack: config => {
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
        .end()

    // PolymerのCustom Properties、CSS Mixinを.vueファイルで記述するための設定
    const polymerRule = config.module
      .rule('polymer')
      .test(/\.polymer$/)
      .oneOf('vue')
      .resourceQuery(/\?vue/)
    polymerRule
      .use('example-loader')
        .loader('./extension/example-loader/index.js')
        .end()
      .use('vue-polymer-style-loader')
        .loader('vue-polymer-style-loader')
        .options({
          sourceMap: false,
          shadowMode: false,
        })
        .end()
      .use('css-loader')
        .loader('css-loader')
        .options({
          sourceMap: false,
          importLoaders: 1,
          modules: false,
        })
        .end()
      .use('postcss-loader')
        .loader('postcss-loader')
        .options({
          sourceMap: false,
        })
        .end()

    // 必要なリソースファイルのコピー
    let copyFiles = [{from: 'node_modules/@webcomponents/webcomponentsjs/**/*.js'}]
    if (process.env.VUE_APP_IS_DEVELOPMENT === 'true') {
      copyFiles = [
        ...copyFiles,
        {from: 'node_modules/mocha/mocha.css', to: 'node_modules/mocha'},
        {from: 'node_modules/mocha/mocha.js', to: 'node_modules/mocha'},
        {from: 'node_modules/chai/chai.js', to: 'node_modules/chai'},
      ]
    }
    config
      .plugin('copy-prod')
        .use(CopyWebpackPlugin, [copyFiles])
        .after('copy')
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
}
