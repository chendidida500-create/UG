'use strict';

/**
 * UG管理系统 - 开发环境配置
 */
module.exports = () => {
  const config = {};

  // 数据库配置
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'ug_project',
    username: 'root',
    password: 'zcn231101',
    logging: console.log, // 开发环境显示SQL日志
  };

  // 日志配置
  config.logger = {
    level: 'DEBUG',
    consoleLevel: 'DEBUG',
  };

  // 安全配置 - 开发环境较宽松
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['http://localhost:15000', 'http://127.0.0.1:15000'],
  };

  return config;
};
