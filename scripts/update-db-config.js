/**
 * 数据库配置统一更新脚本
 * 统一开发环境和生产环境的数据库名为 "ug"
 * 统一所有环境的用户名为 "ug"
 */

const fs = require('fs');
const path = require('path');

// 数据库配置文件路径
const dbConfigPath = path.join(__dirname, '../backend/database/config.js');
const defaultConfigPath = path.join(__dirname, '../backend/config/config.default.js');

console.log('正在更新数据库配置文件...');

// 更新 database/config.js 文件
try {
  let dbConfigContent = fs.readFileSync(dbConfigPath, 'utf8');

  // 更新开发环境配置
  dbConfigContent = dbConfigContent.replace(
    /development:\s*{[^}]*?database:\s*['"][^'"]*['"][^}]*?}/s,
    `development: {
    username: 'ug',
    password: 'zcn231101',
    database: 'ug',
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
  }`
  );

  // 更新测试环境配置
  dbConfigContent = dbConfigContent.replace(
    /test:\s*{[^}]*?database:\s*['"][^'"]*['"][^}]*?}/s,
    `test: {
    username: 'ug',
    password: 'zcn231101',
    database: 'ug',
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
  }`
  );

  // 更新生产环境配置
  dbConfigContent = dbConfigContent.replace(
    /production:\s*{[^}]*?database:\s*(process\.env\.DB_DATABASE\s*\|\|\s*['"][^'"]*['"])[^}]*?}/s,
    `production: {
    username: process.env.DB_USERNAME || 'ug',
    password: process.env.DB_PASSWORD || 'zcn231101',
    database: process.env.DB_DATABASE || 'ug',
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
  }`
  );

  fs.writeFileSync(dbConfigPath, dbConfigContent, 'utf8');
  console.log('✓ 成功更新 backend/database/config.js 文件');
} catch (error) {
  console.error('✗ 更新 backend/database/config.js 文件失败:', error.message);
}

// 更新 config/config.default.js 文件
try {
  let defaultConfigContent = fs.readFileSync(defaultConfigPath, 'utf8');

  // 更新数据库配置部分
  defaultConfigContent = defaultConfigContent.replace(
    /config\.sequelize\s*=\s*{[^}]*?database:\s*['"][^'"]*['"][^}]*?};/s,
    `config.sequelize = {
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
  };`
  );

  fs.writeFileSync(defaultConfigPath, defaultConfigContent, 'utf8');
  console.log('✓ 成功更新 backend/config/config.default.js 文件');
} catch (error) {
  console.error('✗ 更新 backend/config/config.default.js 文件失败:', error.message);
}

console.log('数据库配置更新完成！');