import { EggAppConfig, PowerPartial } from "egg";

export default () => {
  const config: PowerPartial<EggAppConfig> = {};

  config.sequelize = {
    dialect: "mysql",
    host: process.env.MYSQL_HOST || "127.0.0.1",
    port: parseInt(process.env.MYSQL_PORT || "3306", 10),
    database: process.env.MYSQL_DATABASE || "ug",
    username: process.env.MYSQL_USERNAME || "ug",
    password: process.env.MYSQL_PASSWORD || "zcn231101",
    timezone: "+08:00",
    define: {
      charset: "utf8mb4",
      underscored: true,
      timestamps: true,
    },
  };

  config.jwt = {
    secret: process.env.JWT_SECRET || "ug-jwt-secret",
  };

  config.cors = {
    origin: "*",
    allowMethods: "GET,HEAD,PUT,POST,DELETE,PATCH",
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  return config;
};
