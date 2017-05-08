const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

// local config
const rootPath = path.resolve(__dirname, '../');
const srcPath = path.resolve(rootPath, 'src');
const publicPath = path.resolve(rootPath, 'public');

module.exports = {
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      src: srcPath,
    },
  },

  module: {
    rules: [
      // {
      //   test: /\.js$/,
      //   use: {
      //     loader: 'eslint-loader'
      //   },
      //   include: srcPath,
      // },
      {
        test: /\.js$/,
        include: [
          srcPath
        ],
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: path.resolve(publicPath, 'img/[name].[hash:7].[ext]'),
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 10000,
              name: path.resolve(publicPath, 'fonts/[name].[hash:7].[ext]'),
            },
          },
        ],
      },
    ],
  },
}
