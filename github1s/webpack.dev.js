const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = merge(common, {
  plugins: [
    // 输出目录清理
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
    }),
    new HtmlWebpackPlugin({
      template: './src/options.html',
      filename: 'options.html',
      favicon: './src/icons/icon160.png',
      inject: 'body',
      chunks: ['options'],
      minify: {
        collapseWhitespace: true,
        removeComments: true,
      }
    }),
  ],
  mode: 'development',
  target: 'web',
  devtool: "eval-source-map",
  devServer: {
    contentBase: resolve(__dirname, 'build'),
    compress: true,
    open: false,
    hot: true,
    port: 9999,
  }
});