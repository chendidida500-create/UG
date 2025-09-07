@echo off
echo 正在检查数据库配置信息...
cd /d "%~dp0..\backend"

echo ================================
echo 数据库配置检查工具
echo ================================

echo.
echo 1. 检查配置文件是否存在...
if exist config\config.default.js (
  echo ✓ config.default.js 文件存在
) else (
  echo ✗ config.default.js 文件不存在
)

if exist database\config.js (
  echo ✓ database\config.js 文件存在
) else (
  echo ✗ database\config.js 文件不存在
)

echo.
echo 2. 显示主要数据库配置信息...
echo.
echo [数据库配置统一信息]
echo   数据库名: ug (所有环境统一)
echo   用户名: ug (所有环境统一)
echo   密码: zcn231101
echo   主机: localhost
echo   端口: 3306
echo   类型: mysql
echo.
echo [config.default.js 中的 Sequelize 配置]
node -e "
const config = require('./config/config.default.js')({ name: 'ug-backend' });
console.log('  数据库类型:', config.sequelize.dialect);
console.log('  主机地址:', config.sequelize.host);
console.log('  端口:', config.sequelize.port);
console.log('  数据库名:', config.sequelize.database);
console.log('  用户名:', config.sequelize.username);
console.log('  时区:', config.sequelize.timezone);
"

echo.
echo [database/config.js 中的配置]
node -e "
const dbConfig = require('./database/config.js');
console.log('  开发环境数据库名:', dbConfig.development.database);
console.log('  开发环境用户名:', dbConfig.development.username);
console.log('  测试环境数据库名:', dbConfig.test.database);
console.log('  测试环境用户名:', dbConfig.test.username);
console.log('  生产环境数据库名:', dbConfig.production.database || '使用环境变量');
console.log('  生产环境用户名:', dbConfig.production.username || '使用环境变量');
"

echo.
echo 3. 检查数据库连接...
node -e "
const { Sequelize } = require('sequelize');
const config = require('./config/config.default.js')({ name: 'ug-backend' });

// 创建 Sequelize 实例
const sequelize = new Sequelize(
  config.sequelize.database,
  config.sequelize.username,
  config.sequelize.password,
  {
    host: config.sequelize.host,
    port: config.sequelize.port,
    dialect: config.sequelize.dialect,
    timezone: config.sequelize.timezone,
    logging: false
  }
);

// 测试连接
sequelize.authenticate()
  .then(() => {
    console.log('✓ 数据库连接成功');
    return sequelize.close();
  })
  .catch(err => {
    console.log('✗ 数据库连接失败:', err.message);
  });
"

echo.
echo 4. 检查数据库表结构...
node -e "
const { Sequelize } = require('sequelize');
const config = require('./config/config.default.js')({ name: 'ug-backend' });

const sequelize = new Sequelize(
  config.sequelize.database,
  config.sequelize.username,
  config.sequelize.password,
  {
    host: config.sequelize.host,
    port: config.sequelize.port,
    dialect: config.sequelize.dialect,
    timezone: config.sequelize.timezone,
    logging: false
  }
);

sequelize.query('SHOW TABLES', { type: sequelize.QueryTypes.SHOWTABLES })
  .then(tables => {
    console.log('✓ 数据库表列表:');
    tables.forEach(table => console.log('  -', table));
    return sequelize.close();
  })
  .catch(err => {
    console.log('✗ 获取表列表失败:', err.message);
    return sequelize.close();
  });
"

echo.
echo 数据库配置检查完成！
pause