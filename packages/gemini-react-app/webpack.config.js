const currentConfig = require('./node_modules/react-scripts/config/webpack.config.prod.js');

module.exports = {
    ...currentConfig,
    target: 'node',
  }