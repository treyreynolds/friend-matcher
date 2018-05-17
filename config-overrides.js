const rewireStyledComponents = require('react-app-rewire-styled-components');
const { injectBabelPlugin } = require('react-app-rewired');

/* config-overrides.js */
module.exports = function override(config, env) {

  //config = injectBabelPlugin('flow-runtime', config);

  config = rewireStyledComponents(config, env, {
    displayName: true
  });

  console.log('⚡ Config Overrides Applied');
  return config;
};
