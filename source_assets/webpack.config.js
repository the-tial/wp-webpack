var path = require('path');
var AssetsPlugin = require('assets-webpack-plugin');

module.exports = {
  entry: [
    path.join(__dirname, '../source_assets/js/index.js'),
    path.join(__dirname, '../source_assets/styles/main.scss')
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, '../dist')
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: path.join(__dirname, 'node_modules'),
      enforce: 'pre',
      use: { loader: 'eslint-loader' }
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.(scss|sass)$/,
      loader: 'style-loader!css-loader!sass-loader'
    }, {
      test: /\.(eot|svg|ttf|woff|woff2)$/,
      loader: 'file-loader?name=resources/[name].[ext]'
    }, {
      test: /\.(gif|png|jpg|jpeg)$/,
      loader: 'file-loader?name=resources/[name].[ext]'
    }]
  },
  plugins: [new AssetsPlugin({
    path: path.resolve(__dirname, '../webpack')
  })]
};
