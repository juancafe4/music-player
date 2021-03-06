const path = require('path');
const webpackTargetElectronRenderer = require('webpack-target-electron-renderer');
const options = {
  entry:  './app/App.js',
  output: {
    path: __dirname,
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx'],
    packageMains: ['webpack', 'browser', 'web', 'browserify', ['jam', 'main'], 'main'],
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
      },
      { test: /\.json$/, loader: 'json' },
    ]
  },
  debug: true,
}

options.target = webpackTargetElectronRenderer(options);

module.exports = options;