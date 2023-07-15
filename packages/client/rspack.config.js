const { composePlugins, withNx, withWeb } = require('@nx/rspack');
const path = require('path');

module.exports = composePlugins(withNx(), withWeb(), (config) => {
  config.devServer.host = '0.0.0.0';
  config.devServer.port = 9000;
  config.resolve.tsConfigPath = path.resolve(__dirname, 'tsconfig.json');
  console.log('config :>> ', config);
  return config;
});
