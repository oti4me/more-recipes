import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import HtmlWebpackExcludeAssetsPlugin from 'html-webpack-exclude-assets-plugin';

const GLOBALS = {
  'process.env.NODE_ENV': JSON.stringify('production')
};
const extractSass = new ExtractTextPlugin({
  filename: '[name].[contenthash].css',
  disable: process.env.NODE_ENV === 'development'
});

export default {
  devtool: 'source-map',
  entry: path.resolve(__dirname, 'client/src/index'),

  target: 'web',
  output: {
    path: path.join(__dirname, '/dist'), // Note: Physical files are only output by the production build task `npm run build`.
    publicPath: '/',
    filename: 'bundle.js'
  },
  plugins: [
    new webpack.DefinePlugin(GLOBALS),
    new webpack.optimize.UglifyJsPlugin(),
    // new ExtractTextPlugin('styles.css'),
    extractSass,
    new HtmlWebpackPlugin({
      filename: path.join(__dirname, 'dist/index.html'),
      template: path.join(__dirname, 'client/index.html'),
      inject: 'body',
      minify: false,
      excludeAssets: [/.js/]
    }),
    new HtmlWebpackExcludeAssetsPlugin(),

  ],
  module: {
    loaders: [
      {
        test: /.(js|jsx)$/,
        include: [
          path.join(__dirname, 'client'),
          // path.join(__dirname, 'server/shared/')
        ],
        loaders: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        loader: ExtractTextPlugin.extract(['css-loader?minimize=true', 'sass-loader']),
        include: [
          path.join(__dirname, 'client')
        ]
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          'file?hash=sha512&digest=hex&name=[hash].[ext]',
          'image-webpack?bypassOnDebug&optimizationLevel=7&interlaced=false'
        ]
      },
      { test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file' },
      { test: /\.(woff|woff2)$/, loader: 'url?prefix=font/&limit=5000' },
      { test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=application/octet-stream' },
      { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&mimetype=image/svg+xml' }
    ]
  },
  node: {
    net: 'empty',
    dns: 'empty'
  }
};