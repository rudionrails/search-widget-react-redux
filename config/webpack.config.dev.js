const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const FriendlyErrors = require('friendly-errors-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

const webpackBaseConfig = require('./webpack.config.base');

const rootPath = path.resolve(__dirname, '../');
const publicPath = path.resolve(rootPath, 'public');

const ADDRESS = 'http://127.0.0.1:8080';

module.exports = merge.smart(webpackBaseConfig, {
  devtool: 'cheap-module-eval-source-map',

  entry: [
    'babel-polyfill',
    `webpack-dev-server/client?${ADDRESS}`,
    path.resolve(rootPath, 'src', 'index.js'),
  ],

  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'style-loader',
          { loader: 'css-loader', options: { importLoaders: 1 } },
          'postcss-loader',
        ],
      },
    ],
  },

  plugins: [
    // set env variables
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
      },
    }),

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

    // Circular dependencies are often a necessity in complex software,
    // the presence of a circular dependency doesn't always imply a bug,
    // but in the case where the you believe a bug exists, this module may help find it.
    new CircularDependencyPlugin({
      exclude: /a\.js|node_modules/, // exclude node_modules
      failOnError: false, // show a warning when there is a circular dependency
    }),

    // Synchronized browser testing
    // https://www.browsersync.io/
    new BrowserSyncPlugin({
      open: false,
      proxy: ADDRESS,
    }, { // Plugin options
      reload: false,
    }),

    new FriendlyErrors(),
  ],

  // from `webpack-dev-server` module
  devServer: {
    contentBase: publicPath,
    inline: true, // embed the webpack-dev-server runtime into the bundle
  },
});
