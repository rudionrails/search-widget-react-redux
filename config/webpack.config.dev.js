'use strict';

const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const webpackBaseConfig = require('./webpack.config.base');
const rootPath = path.resolve(__dirname, '../');
const publicPath = path.resolve(rootPath, 'public');

const ADDRESS = 'http://127.0.0.1:8080';

module.exports = merge.smart(webpackBaseConfig, {
  devtool: 'cheap-module-source-map',

  entry: [
    'babel-polyfill',
    `webpack-dev-server/client?${ADDRESS}`,
    path.resolve(rootPath, 'src', 'index.js')
  ],

  plugins: [
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In development, this will be an empty string.
    // new InterpolateHtmlPlugin(env.raw),
    // new InterpolateHtmlPlugin(),

    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: path.resolve(publicPath, 'index.html'),
      inject: true,

      minify: {
        removeComments: true,
        collapseWhitespace: true,
      },
      chunksSortMode: 'dependency',
    }),

    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'development') { ... }. See `./env.js`.
    // new webpack.DefinePlugin(env.stringified),

    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin(),

    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    new CaseSensitivePathsPlugin(),


    // Synchronized browser testing
    // https://www.browsersync.io/
    new BrowserSyncPlugin({
      proxy: ADDRESS,
    }, { // Plugin options
      reload: false,
    }),
  ],


  // from `webpack-dev-server` module
  devServer: {
    contentBase: publicPath,
    inline: true, // embed the webpack-dev-server runtime into the bundle
  }
});
