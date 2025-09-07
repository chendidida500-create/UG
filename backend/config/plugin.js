'use strict';

/**
 * UG管理系统 - 插件配置
 */

/** @type Egg.EggPlugin */
module.exports = {
  // 数据库ORM
  sequelize: {
    enable: true,
    package: 'egg-sequelize',
  },

  // 参数验证
  validate: {
    enable: true,
    package: 'egg-validate',
  },

  // 跨域支持
  cors: {
    enable: true,
    package: 'egg-cors',
  },

  // JWT认证
  jwt: {
    enable: true,
    package: 'egg-jwt',
  },
};
