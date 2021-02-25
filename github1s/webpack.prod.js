const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { resolve } = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/[name].[contenthash:7].css',
    }),
    new TerserPlugin({
      exclude: /node_modules/,
      terserOptions: {
        warnings: false,
        compress: {
          drop_console: true,
          drop_debugger: true,
          pure_funcs: ['console.log'] // 移除console
        }
      }
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
  mode: 'production',
  // devtool: "source-map",
});