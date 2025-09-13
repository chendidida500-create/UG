import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  // 测试环境数据库配置
  config.sequelize = {
    dialect: 'mysql',
    host: process.env.MYSQL_HOST || '127.0.0.1',
    port: parseInt(process.env.MYSQL_PORT || '3306', 10),
    database: process.env.MYSQL_DATABASE || 'ug_test',
    username: process.env.MYSQL_USERNAME || 'ug',
    password: process.env.MYSQL_PASSWORD || 'zcn231101',
    timezone: '+08:00',
    define: {
      charset: 'utf8mb4',
      underscored: true,
      timestamps: true,
    },
  };

  // 测试环境JWT配置
  config.jwt = {
    secret: process.env.JWT_SECRET || 'ug-jwt-secret-test',
  };

  // 测试环境Redis配置
  config.redis = {
    client: {
      port: parseInt(process.env.REDIS_PORT || '6379'),
      host: process.env.REDIS_HOST || '127.0.0.1',
      password: process.env.REDIS_PASSWORD || '',
      db: parseInt(process.env.REDIS_DB || '1'), // 使用不同的数据库
    },
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};