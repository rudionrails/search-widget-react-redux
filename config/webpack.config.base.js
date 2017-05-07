const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');

// local config
const rootPath = path.resolve(__dirname, '../');
const srcPath = path.resolve(rootPath, 'src');
const publicPath = path.resolve(rootPath, 'public');

// webpack config
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
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          }, 
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: function () {
                return [
                  autoprefixer({
                    browsers: [
                      '>1%',
                      'last 4 versions',
                      'Firefox ESR',
                      'not ie < 9', // React doesn't support IE8 anyway
                    ]
                  }),
                ];
              }
            }
          }
        ]
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

