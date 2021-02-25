const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");
const isDev = "development" == process.env.NODE_ENV ? true : false;

module.exports = merge(common, {
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:7].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/options/options.html',
      filename: 'options.html',
      favicon: './src/icons/icon160.png',
      inject: 'body',
      chunks: ['options'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      }
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: resolve(__dirname, 'src/icons'), to: resolve(__dirname, 'build/icons') },
        { from: resolve(__dirname, 'src/manifest.json'), to: resolve(__dirname, 'build') },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
  mode: isDev ? 'development' : 'production',
  target: 'web',
  devtool: isDev ? "eval-source-map" : "source-map",
  devServer: {
    contentBase: resolve(__dirname, 'dist'),
    compress: true,
    open: false,
    hot: true,
    port: 9999,
  }
});