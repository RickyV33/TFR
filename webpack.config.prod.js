'use strict'

const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// import path from 'path'
// import webpack from 'webpack'
// import HtmlWebpackPlugin from 'html-webpack-plugin'

module.exports =
{
  entry: [
    path.join(__dirname, 'src/main.js')
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name]-[hash].min.js'
    // publicPath: '/'
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.template.html',
      inject: 'body',
      filename: 'index.html'
    }),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
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
        'presets': ['react', 'es2015', 'stage-1' ]
      }
    }, {
      test: /\.css?$/,
      loader: 'style-loader!css-loader?modules=true&localIdentName=[name]_[local]_[hash:base64:5]',
      include: path.join(__dirname, 'client')
    }]
  }
}
