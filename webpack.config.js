// import webpack from 'webpack';
// import path from 'path';
const webpack = require('webpack');
const path = require('path');

// export default

module.exports = {

  entry: [
    './client/src/index.js'
  ],

  output: {
    path: path.join(__dirname, 'client'),
    publicPath: '/',
    filename: 'bundle.js'
  },

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, use: ['style-loder', 'css-loader', 'sass-loader'], include: path.join(__dirname, 'client') }
    ]
  },

}
