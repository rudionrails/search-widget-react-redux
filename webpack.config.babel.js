import path from 'path';
import webpack from 'webpack';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import DashboardPlugin from 'webpack-dashboard/plugin';
import StyleLintPlugin from 'stylelint-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import ManifestPlugin from 'webpack-manifest-plugin';

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

  entry: [
    'babel-polyfill',
    path.resolve(srcPath, 'index.js'),
  ],

  output: {
    path: path.resolve(__dirname, 'build'),
    filename: isProd ? '[hash]/[name].js' : '[name].js',
  },

  resolve: {
    extensions: ['.js', '.jsx'],
    alias: {
      src: srcPath,
    },
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        include: srcPath,
        use: [
          'babel-loader',
          'eslint-loader',
        ],
      },
      // {
      //   test: /\.css$/,
      //   use: [
      //     'style-loader',
      //     { loader: 'css-loader', options: { importLoaders: 1 } },
      //     'postcss-loader',
      //   ],
      // },
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
    // Makes some environment variables available in index.html.
    // The public URL is available as %PUBLIC_URL% in index.html, e.g.:
    // <link rel="shortcut icon" href="%PUBLIC_URL%/favicon.ico">
    // In production, it will be an empty string unless you specify "homepage"
    // in `package.json`, in which case it will be the pathname of that URL.
    // new InterpolateHtmlPlugin(env.raw),

    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      template: path.resolve(publicPath, 'index.html'),
      inject: true,

      minify: isProd && {
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

      chunksSortMode: 'dependency',
    }),

    // Note: this won't work without ExtractTextPlugin.extract(..) in `loaders`.
    new ExtractTextPlugin({
      filename: isProd ? '[hash]/[name].css' : '[name].css',
    }),

    new StyleLintPlugin({
      context: 'src',
      files: '**/*.css',
    }),
  ],

  // from `webpack-dev-server` module
  devServer: {
    contentBase: publicPath,
  },
};

if (isProd) {
  config.plugins.push(
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

    // Generate a manifest file which contains a mapping of all asset filenames
    // to their corresponding output file so that tools can pick it up without
    // having to parse `index.html`.
    new ManifestPlugin(),
  );
} else {
  config.plugins.push(
    new DashboardPlugin(),
  );
}

module.exports = config;
