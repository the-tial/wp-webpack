var path = require('path');
var baseConfig = require('./webpack.dev.config');

module.exports = Object.assign({}, baseConfig, {
  module: Object.assign({}, baseConfig.module, {
    rules: [{
      test: /\.js$/,
      exclude: path.join(__dirname, 'node_modules'),
      enforce: 'pre',
      use: { loader: 'babel-loader' }
    },
      ...baseConfig.module.rules
    ]
  })
});
