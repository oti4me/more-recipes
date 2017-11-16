import webpack from 'webpack';
import path from 'path';

export default {
  
  entry:[
    './client/src/index.js'
  ], 
   
  output: {
    path: '/',// __dirname + './client/dist', 
    filename: 'bundle.js'
  },

  plugins : [ 
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.DefinePlugin({  
      'process.env' : {  
        'NODE_ENV' : "'production'"
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      copressor :{
        warnings : false
      }
    })
  ],

  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, use: [ 'style-loder', 'css-loader', 'sass-loader'], include: path.join(__dirname, 'client') }
    ]
  },

}
