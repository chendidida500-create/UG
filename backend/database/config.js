'use strict';

// Sequelize CLI 配置文件，与 config.default.js 中的数据库配置保持一致
module.exports = {
  development: {
    username: 'root',
    password: 'zcn231101',
    database: 'ug_project',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    timezone: '+08:00',
    dialectOptions: {
      charset: 'utf8mb4',
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
    define: {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
    },
    logging: console.log,
  },

  test: {
    username: 'root',
    password: 'zcn231101',
    database: 'ug_project_test',
    host: 'localhost',
    port: 3306,
    dialect: 'mysql',
    timezone: '+08:00',
    dialectOptions: {
      charset: 'utf8mb4',
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
    define: {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
    },
    logging: false,
  },

  production: {
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || 'zcn231101',
    database: process.env.DB_DATABASE || 'ug_project',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT) || 3306,
    dialect: 'mysql',
    timezone: '+08:00',
    dialectOptions: {
      charset: 'utf8mb4',
      supportBigNumbers: true,
      bigNumberStrings: true,
    },
    define: {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true,
    },
    logging: false,
    pool: {
      max: 20,
      min: 5,
      acquire: 30000,
      idle: 10000,
    },
  },
};