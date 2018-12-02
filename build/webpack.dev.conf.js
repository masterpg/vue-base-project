const base = require('./webpack.base.conf.js');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

/**
 * ターゲット環境
 */
const TARGET_ENV = 'development';

/**
 * 基準パス
 * 例: /boo/foo/woo/ (パスの最初と最後は"/"をつけること)
 */
const BASE_PATH = '/';

/**
 * ビルド結果の出力パス
 */
const OUTPUT_PATH = path.resolve(__dirname, path.join('../.dist', BASE_PATH));

module.exports = merge(base.config(TARGET_ENV, BASE_PATH, OUTPUT_PATH), {
  entry: {
    'test': path.resolve(__dirname, '../test/test.ts'),
    playground: path.resolve(__dirname, '../src/playground'),
  },

  plugins: [
    // ★ HMRに必要な設定
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      filename: 'test.html', // パスは`output.path`を基準
      template: './test/test.html',
      inject: false,
      bundledScript: 'test.bundle.js',
    }),

    new HtmlWebpackPlugin({
      filename: 'playground.html', // パスは`output.path`を基準
      template: './src/playground.html',
      inject: false,
      basePath: BASE_PATH,
      bundledScript: 'playground.bundle.js',
    }),

    // `to: xxx`の`xxx`は`output.path`が基準になる
    new CopyWebpackPlugin([
      { from: 'node_modules/mocha/mocha.css', to: 'node_modules/mocha' },
      { from: 'node_modules/mocha/mocha.js', to: 'node_modules/mocha' },
      { from: 'node_modules/chai/chai.js', to: 'node_modules/chai' },
    ]),
  ],

  devtool: 'source-map',

  devServer: base.devServer(OUTPUT_PATH),
});
