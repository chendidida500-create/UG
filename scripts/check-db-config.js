// 数据库配置检查脚本
const path = require('path');

console.log('================================');
console.log('数据库配置检查工具');
console.log('================================');

console.log('\n1. 检查配置文件是否存在...');
try {
  const fs = require('fs');
  const backendPath = path.join(__dirname, '..', 'backend');

  if (fs.existsSync(path.join(backendPath, 'config', 'config.default.js'))) {
    console.log('✓ config.default.js 文件存在');
  } else {
    console.log('✗ config.default.js 文件不存在');
  }

  if (fs.existsSync(path.join(backendPath, 'database', 'config.js'))) {
    console.log('✓ database/config.js 文件存在');
  } else {
    console.log('✗ database/config.js 文件不存在');
  }
} catch (error) {
  console.error('检查文件存在性时出错:', error.message);
}

console.log('\n2. 显示主要数据库配置信息...');

console.log('\n[config.default.js 中的 Sequelize 配置]');
try {
  const backendPath = path.join(__dirname, '..', 'backend');
  const configPath = path.join(backendPath, 'config', 'config.default.js');
  const config = require(configPath)({ name: 'ug-backend' });
  console.log('  数据库类型:', config.sequelize.dialect);
  console.log('  主机地址:', config.sequelize.host);
  console.log('  端口:', config.sequelize.port);
  console.log('  数据库名:', config.sequelize.database);
  console.log('  用户名:', config.sequelize.username);
  console.log('  时区:', config.sequelize.timezone);
} catch (error) {
  console.error('读取 config.default.js 配置时出错:', error.message);
}

console.log('\n[database/config.js 中的配置]');
try {
  const backendPath = path.join(__dirname, '..', 'backend');
  const dbConfigPath = path.join(backendPath, 'database', 'config.js');
  const dbConfig = require(dbConfigPath);
  console.log('  开发环境数据库名:', dbConfig.development.database);
  console.log('  开发环境用户名:', dbConfig.development.username);
  console.log('  测试环境数据库名:', dbConfig.test.database);
  console.log('  测试环境用户名:', dbConfig.test.username);
  console.log('  生产环境数据库名:', dbConfig.production.database || '使用环境变量');
  console.log('  生产环境用户名:', dbConfig.production.username || '使用环境变量');
} catch (error) {
  console.error('读取 database/config.js 配置时出错:', error.message);
}

console.log('\n数据库配置检查完成！');