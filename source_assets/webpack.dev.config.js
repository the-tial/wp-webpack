var path = require('path');
var baseConfig = require('./webpack.config');

module.exports = Object.assign({}, baseConfig, {
  entry: [
    path.join(__dirname, '../source_assets/js/index.js'),
    path.join(__dirname, '../source_assets/styles/main.scss')
  ],
  output: Object.assign({}, baseConfig.output, {
    publicPath: 'http://localhost:8080/'
  })
});
