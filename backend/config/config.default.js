'use strict';

/**
 * UG管理系统 - 默认配置文件
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1693920000000_UG_SECRET_KEY';

  // add your middleware config here
  config.middleware = ['errorHandler', 'jwtAuth'];

  // 添加服务端口配置
  config.cluster = {
    listen: {
      port: 15001,
      hostname: 'localhost',
    },
  };

  // 安全配置
  config.security = {
    csrf: {
      enable: false,
    },
    domainWhiteList: ['http://localhost:15000', 'http://127.0.0.1:15000'],
  };

  // CORS跨域配置
  config.cors = {
    origin: ['http://localhost:15000', 'http://127.0.0.1:15000'],
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true,
  };

  // JWT配置
  config.jwt = {
    secret: 'UG_JWT_SECRET_KEY_2023',
    expiresIn: '24h',
  };

  // 数据库配置
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'ug',
    username: 'ug',
    password: 'zcn231101',
    timezone: '+08:00',
    define: {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
    },
    dialectOptions: {
      charset: 'utf8mb4',
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
  };

  // 表单验证配置
  config.validate = {
    convert: true,
    widelyUndefined: true,
  };

  // 请求体大小限制
  config.bodyParser = {
    jsonLimit: '10mb',
    formLimit: '10mb',
  };

  // 日志配置
  config.logger = {
    level: 'INFO',
    consoleLevel: 'INFO',
  };

  // 错误处理中间件配置
  config.errorHandler = {
    match: '/api',
  };

  // JWT认证中间件配置
  config.jwtAuth = {
    ignore: [
      '/api/auth/login',
      '/api/auth/register',
      '/api/auth/refresh',
      '/api/health',
    ],
  };

  // 用户自定义配置
  config.userConfig = {
    // 分页默认配置
    pagination: {
      defaultPageSize: 20,
      maxPageSize: 100,
    },
    // 密码加密配置
    bcrypt: {
      saltRounds: 10,
    },
    // 文件上传配置
    upload: {
      maxFileSize: '10mb',
      allowedTypes: ['.jpg', '.jpeg', '.png', '.gif', '.pdf', '.doc', '.docx'],
    },
  };

  return {
    ...config,
    ...exports,
  };
};