export default (appInfo) => {
  const config = {};

  // override config from framework / plugin
  config.keys = appInfo.name + '_1725926400000_0';

  // add your egg config in here
  config.middleware = ['security', 'jwt'];

  // add your special config in here
  const bizConfig = {
    sourceUrl: `https://github.com/eggjs/examples/tree/master/${appInfo.name}`,
  };

  // the return config will combines to EggAppConfig
  return {
    ...config,
    ...bizConfig,
  };
};