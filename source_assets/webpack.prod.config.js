var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
var AssetsPlugin = require('assets-webpack-plugin');
var baseConfig = require('./webpack.config');

module.exports = Object.assign({}, baseConfig, {
  output: Object.assign({}, baseConfig.output, {
    publicPath: ''
  }),
  module: Object.assign({}, baseConfig.module, {
    rules: [{
      test: /\.css$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader'
      })
    }, {
      test: /\.(scss|sass)$/,
      loader: ExtractTextPlugin.extract({
        fallbackLoader: 'style-loader',
        loader: 'css-loader!sass-loader'
      })
    },
      ...(baseConfig.module.rules.filter((rule) => {
        return !(rule.test
          && (
            rule.test.toString().indexOf('css') !== -1
          ));
      }))
    ]
  }),
  plugins: [
    new ExtractTextPlugin({
      filename: 'style.css',
      allChunks: false
    }),
    new OptimizeCssAssetsPlugin({
      cssProcessor: require('cssnano'),
      cssProcessorOptions: {
        discardComments: {
          removeAll: true
        }
      },
      canPrint: true
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    }),
    new AssetsPlugin({
      metadata: {
        production: true
      },
      path: path.resolve(__dirname, '../webpack')
    })
  ]
});
