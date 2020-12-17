const currentConfig = require('./node_modules/react-scripts/config/webpack.config.prod.js');
var path = require('path');
var webpack = require('webpack');

module.exports = {
  ...currentConfig,
  target: 'dom',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundle.js'
  },
  module: {
    loaders: [
      {
        test: [/\.test\.js$/, /\.test\.jsx$/,],
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: 'source-map'
};