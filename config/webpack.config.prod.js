const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const webpackBaseConfig = require('./webpack.config.base');

const rootPath = path.resolve(__dirname, '../');
const publicPath = path.resolve(rootPath, 'public');
const buildPath = path.resolve(process.cwd(), 'build');

module.exports = merge.smart(webpackBaseConfig, {
  // Don't attempt to continue if there are any errors.
  bail: true,

  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: 'source-map',

  entry: [
    'babel-polyfill',
    path.resolve(rootPath, 'src', 'index.js'),
  ],

  output: {
    // The build folder.
    path: buildPath,

    // Generated JS file names (with nested folders).
    // There will be one main bundle, and one file per asynchronous chunk.
    // We don't currently advertise code splitting but Webpack supports it.
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },

  module: {
    rules: [
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader',
            'postcss-loader',
          ],
        }),
      },
    ],
  },

  plugins: [
    // set env variables
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(publicPath, 'index.html'),

      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),

    // Minify the code.
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
      },
      output: {
        comments: false,
      },
      sourceMap: true,
    }),

    // copy static assets
    new CopyWebpackPlugin([{
      from: 'public/*.css',
      flatten: true,
    }]),

    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin('[name].[chunkhash].css'),

    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin(),

    // split vendor js into its own file
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: (module) => {
        // any required modules inside node_modules are extracted to vendor
        const startsWithNodeModules = module.resource.indexOf(
          path.join(__dirname, '../node_modules'),
        ) === 0;

        return module.resource && /\.js$/.test(module.resource) && startsWithNodeModules;
      },
    }),
  ],
});
