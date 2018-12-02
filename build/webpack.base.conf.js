const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

//--------------------------------------------------
//  config
//--------------------------------------------------

/**
 * Webpack設定のベースを取得します。
 * @param targetEnv ターゲット環境を指定。
 * @param basePath 基準パスを指定。
 *   例: /boo/foo/woo/ (パスの最初と最後は"/"をつけること)
 * @param outputPath ビルド結果の出力パスを指定。
 */
exports.config = (targetEnv, basePath, outputPath) => {
  const settings = (() => {
    let mode;
    if (targetEnv === 'development') {
      mode = 'development';
    } else {
      mode = 'production';
    }
    return { mode };
  })();

  return {
    mode: settings.mode,

    entry: {
      index: path.resolve(__dirname, '../src/index.ts'),
    },

    output: {
      path: outputPath,
      filename: '[name].bundle.js',
      chunkFilename: '[name].bundle.js',
      // ★ HMRに必要な設定
      // 参照: http://dackdive.hateblo.jp/entry/2016/05/07/183335
      publicPath: basePath,
    },

    resolve: {
      // この拡張子のファイルをビルド対象に設定
      extensions: ['.ts', '.js', '.vue', '.json'],

      alias: {
        vue$: 'vue/dist/vue.esm.js',
      },
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          exclude: /node_modules|vue\/src/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                // 「.vue」のファイルに接尾辞「.ts」がファイル名に追加されるよう設定
                // 参照: https://github.com/TypeStrong/ts-loader#user-content-appendtssuffixto-regexp-default
                appendTsSuffixTo: [/\.vue$/],
              },
            },
            {
              loader: 'tslint-loader',
            },
          ],
        },
        // 「.vue」ファイルをvue-loaderがハンドルするよう設定
        // 参照: https://github.com/vuejs-templates/webpack-simple/blob/master/template/webpack.config.js
        {
          test: /\.vue$/,
          use: [
            {
              loader: 'vue-loader',
              options: {
                esModule: true,
                scss: 'vue-style-loader!css-loader!sass-loader',
                postcss: {
                  config: {
                    path: path.resolve(__dirname, 'postcss.config.js'),
                  },
                },
              },
            },
          ],
        },
        {
          test: /\.css$/,
          use: [
            'vue-style-loader',
            'css-loader',
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  path: path.resolve(__dirname, 'postcss.config.js'),
                },
              },
            },
          ],
        },
        {
          test: /\.styl$/,
          loader: ['vue-style-loader', 'css-loader', 'stylus-loader'],
        },
        {
          resourceQuery: /blockType=i18n/,
          type: 'javascript/auto',
          loader: ['@kazupon/vue-i18n-loader', 'yaml-loader'],
        },
      ],
    },

    plugins: [
      new VueLoaderPlugin(),

      new webpack.DefinePlugin({
        'process.env': {
          TARGET_ENV: JSON.stringify(targetEnv),
        },
      }),

      new HtmlWebpackPlugin({
        filename: 'index.html', // パスは`output.path`を基準
        template: './src/index.html',
        inject: false,
        basePath: basePath,
        bundledScript: 'index.bundle.js',
      }),

      new CleanWebpackPlugin([outputPath], {
        root: path.resolve(__dirname, '..'),
        verbose: true,
      }),

      // `to: xxx`の`xxx`は`output.path`が基準になる
      new CopyWebpackPlugin([
        { from: path.resolve(__dirname, '../src/manifest.json') },
        {
          from: path.resolve(__dirname, '../src/assets/images'),
          to: 'assets/images',
        },
        {
          from: path.resolve(__dirname, '../node_modules/@webcomponents/webcomponentsjs/webcomponents-bundle.js'),
          to: 'node_modules/@webcomponents/webcomponentsjs',
        },
      ]),
    ],
  };
};

//--------------------------------------------------
//  devServer
//--------------------------------------------------

/**
 * webpack-dev-serverの設定
 * @param outputPath ビルド結果の出力パスを指定
 */
exports.devServer = (outputPath) => {
  return {
    contentBase: outputPath,
    port: 5000,
    host: '0.0.0.0',
    disableHostCheck: true,
    proxy: {
      '/api': {
        target: 'http://0.0.0.0:5010',
        secure: false,
      },
    },
    // statsの設定は以下URLを参照:
    // https://webpack.js.org/configuration/stats/
    // https://github.com/webpack/webpack/blob/5b5775f9e2fc73fea46629f2d6a3ed7a1f8424d3/lib/Stats.js#L696-L730
    // stats: 'minimal',
    stats: {
      assets: false,
      children: false,
      chunks: false,
      entrypoints: false,
      hash: false,
      moduleTrace: false,
      modules: false,
      publicPath: false,
      reasons: false,
      source: false,
      timings: false,
      version: false,
      errors: true,
      errorDetails: true,
      warnings: true,
    },
    // historyApiFallbackの設定は以下URLを参照:
    // https://github.com/webpack/docs/wiki/webpack-dev-server#the-historyapifallback-option
    historyApiFallback: {
      rewrites: [],
    },
    // ★ HMRに必要な設定
    hot: true,
  };
};

//--------------------------------------------------
//  plugins
//--------------------------------------------------

exports.newSWPrecacheWebpackPlugin = (basePath, outputPath) => {
  return new SWPrecacheWebpackPlugin({
    staticFileGlobs: [
      path.join(outputPath, basePath, 'assets/**/*'),
      path.join(outputPath, basePath, '*.bundle.js'),
      path.join(outputPath, basePath, 'index.html'),
      path.join(outputPath, basePath, 'manifest.json'),
    ],
    runtimeCaching: [
      {
        urlPattern: /\/node_modules\//,
        handler: 'cacheFirst',
      },
    ],
    navigateFallback: 'index.html',
    navigateFallbackWhitelist: [/^(?!\/api\/).*$/],
    stripPrefix: path.join(outputPath, basePath),
  });
};

exports.newImageminPlugin = () => {
  return new ImageminPlugin({
    test: /src\/assets\/images\/[^\.]+\.(jpe?g|png|gif|svg)$/i,
  });
};
