const path = require('path');
module.exports = {
  entry:  './index.js',
  output: {
    parth: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  resolveLoader: {
    root: path.join(__dirname, 'node_modules')
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: '/node-modules/',
      }
    ]
  }
}