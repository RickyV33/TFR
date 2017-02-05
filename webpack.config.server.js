'use strict'

const path = require('path')
const webpack = require('webpack')

// import path from 'path'
// import webpack from 'webpack'

module.exports = {
  target: 'node',
  entry: path.join(__dirname, 'src/server.js'),
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'server.js'
    // publicPath: path.join(__dirname, '../dist/')
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV)
    })
  ],
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        'presets': [ 'es2015', 'stage-1' ]
      }
    }]
  }
}
