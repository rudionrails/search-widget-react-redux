const path = require('path');

// local config
const rootPath = path.resolve(__dirname, '../');
const srcPath = path.resolve(rootPath, 'src');

module.exports = {
  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      src: srcPath,
    },
  },

  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.js$/,
        include: srcPath,
        use: {
          loader: 'eslint-loader',
        },
      },
      {
        test: /\.js$/,
        include: [
          srcPath,
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
              name: 'assets/img/[name].[hash:7].[ext]',
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
              name: 'assets/fonts/[name].[hash:7].[ext]',
            },
          },
        ],
      },
    ],
  },
};
