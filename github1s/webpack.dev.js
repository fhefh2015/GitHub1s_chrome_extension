const { merge } = require('webpack-merge');
const config = require('./webpack.config.js');
const ExtensionReloader = require("webpack-extension-reloader");

module.exports = merge(config, {
  plugins: [
    new ExtensionReloader()
  ],
  devtool: "source-map",
});