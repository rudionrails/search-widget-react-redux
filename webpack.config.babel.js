import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import StyleLintWebpackPlugin from 'stylelint-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import WebpackManifestPlugin from 'webpack-manifest-plugin';
import CompressionWebpackPlugin from 'compression-webpack-plugin';
import FriendlyErrorsWebpackPlugin from 'friendly-errors-webpack-plugin';

// local config
const srcPath = path.resolve(__dirname, 'src');
const publicPath = path.resolve(__dirname, 'public');

// see: https://github.com/webpack/webpack/issues/2537
const isProd = process.argv.indexOf('-p') !== -1;

const config = {
  context: __dirname,

  // Don't attempt to continue if there are any errors in production
  bail: isProd,

  // We generate sourcemaps in production. This is slow but gives good results.
  // You can exclude the *.map files from the build during deployment.
  devtool: isProd ? 'source-map' : 'cheap-module-eval-source-map',

  entry: {
    main: [
      !isProd && 'babel-polyfill',
      path.resolve(srcPath, 'index.js'),
    ].filter(e => e !== false),
  ],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: isProd ? '[hash]/[name].js' : '[name].js',
    library: 'SearchWidget',
    libraryTarget: 'umd',
  },

  resolve: {
    extensions: ['.js'],
    alias: {
      src: srcPath,
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        enforce: 'pre',
        include: srcPath,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'postcss-loader',
          ],
        }),
      },
    ],
  },

  plugins: [
    // @since webpack3 to enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),

    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: path.resolve(publicPath, 'index.html'),
      inject: true,

      minify: isProd && {
        // removeComments: true,
        // collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        // minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },

      chunksSortMode: 'dependency',
    }),

    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin({
      filename: isProd ? '[hash]/[name].css' : '[name].css',
    }),

    new StyleLintWebpackPlugin({
      context: srcPath,
      files: '**/*.css',
    }),

    new FriendlyErrorsWebpackPlugin({
      compilationSuccessInfo: {
        messages: ['Project is running at http://localhost:8080'],
        notes: ['Run linter with: yarn lint', 'Run tests with: yarn test'],
      },
    }),
  ],

  // from `webpack-dev-server` module
  devServer: {
    contentBase: publicPath,
    noInfo: true,
    quiet: true,

    // Shows a full-screen overlay in the browser when there
    // are compiler errors or warnings.
    overlay: {
      warnings: true,
      errors: true,
    },
  },
};

if (isProd) {
  config.plugins.push(
    // copy static assets (everything in /public)
    new CopyWebpackPlugin([
      { from: 'public/*', flatten: true },
    ]),

    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new WebpackManifestPlugin(),

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

    // compress
    new CompressionWebpackPlugin({
      asset: '[path].gz[query]',
      algorithm: 'gzip',
      test: /\.js$|\.html$|\.css$/,
      minRatio: 0.8,
    }),
  );
}

module.exports = config;
