import { EggAppConfig, PowerPartial } from 'egg';

export default () => {
  const config: PowerPartial<EggAppConfig> = {};
  
  config.sequelize = {
    dialect: 'mysql',
    host: '127.0.0.1',
    port: 3306,
    database: 'ug_development',
    username: 'root',
    password: 'password',
    timezone: '+08:00',
    define: {
      charset: 'utf8mb4',
      underscored: true,
      timestamps: true,
    },
  };

  config.jwt = {
    secret: 'ug-jwt-secret',
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};