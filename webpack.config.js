const webpack = require('webpack');
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Dotenv = require('dotenv-webpack');

const extractPlugin = new ExtractTextPlugin({
  filename: 'css/style.css'
});

// export default

module.exports = {
  devtool: 'source-map',
  entry: [
    './client/src/index'
  ],

  output: {
    path: path.join(__dirname, 'client'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  resolve: {
    extensions: ['.js', '.jsx']
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },

      {
        test: /\.(css|scss)$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader'], include: [
          path.join(__dirname, 'client')
        ]
      },
      {
        test: /\.(jpe?g|gif|png)$/,
        loader: 'file-loader?name=images/[name].[ext]'
      },
    ]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env':
        {
          NODE_ENV: JSON.stringify('development'),
          CLOUDINARY_UPLOAD_PRESET: JSON.stringify(process.env.CLOUDINARY_UPLOAD_PRESET),
          CLOUDINARY_URL: JSON.stringify(process.env.CLOUDINARY_URL),
          JWT_SECRET_KEY: JSON.stringify(process.env.JWT_SECRET_KEY),
        }
    }),
    extractPlugin,
  ]
}
