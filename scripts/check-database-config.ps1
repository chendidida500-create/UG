# 数据库配置检查工具 (PowerShell版本)
Write-Host "正在检查数据库配置信息..." -ForegroundColor Green
Set-Location -Path "$PSScriptRoot\..\backend"

Write-Host "================================" -ForegroundColor Cyan
Write-Host "数据库配置检查工具" -ForegroundColor Cyan
Write-Host "================================" -ForegroundColor Cyan

Write-Host ""
Write-Host "1. 检查配置文件是否存在..." -ForegroundColor Yellow
if (Test-Path "config\config.default.js") {
  Write-Host "✓ config.default.js 文件存在" -ForegroundColor Green
} else {
  Write-Host "✗ config.default.js 文件不存在" -ForegroundColor Red
}

if (Test-Path "database\config.js") {
  Write-Host "✓ database\config.js 文件存在" -ForegroundColor Green
} else {
  Write-Host "✗ database\config.js 文件不存在" -ForegroundColor Red
}

Write-Host ""
Write-Host "2. 显示主要数据库配置信息..." -ForegroundColor Yellow
Write-Host ""

Write-Host "[config.default.js 中的 Sequelize 配置]" -ForegroundColor Magenta
# 使用Node.js执行JavaScript代码来读取配置
$jsCode1 = @"
const config = require('./config/config.default.js')({ name: 'ug-backend' });
console.log('  数据库类型:', config.sequelize.dialect);
console.log('  主机地址:', config.sequelize.host);
console.log('  端口:', config.sequelize.port);
console.log('  数据库名:', config.sequelize.database);
console.log('  用户名:', config.sequelize.username);
console.log('  时区:', config.sequelize.timezone);
"@
echo $jsCode1 > temp_config_check.js
node temp_config_check.js
Remove-Item temp_config_check.js

Write-Host ""
Write-Host "[database/config.js 中的配置]" -ForegroundColor Magenta
$jsCode2 = @"
const dbConfig = require('./database/config.js');
console.log('  开发环境数据库名:', dbConfig.development.database);
console.log('  开发环境用户名:', dbConfig.development.username);
console.log('  测试环境数据库名:', dbConfig.test.database);
console.log('  测试环境用户名:', dbConfig.test.username);
console.log('  生产环境数据库名:', dbConfig.production.database || '使用环境变量');
console.log('  生产环境用户名:', dbConfig.production.username || '使用环境变量');
"@
echo $jsCode2 > temp_db_config_check.js
node temp_db_config_check.js
Remove-Item temp_db_config_check.js

Write-Host ""
Write-Host "3. 检查数据库连接..." -ForegroundColor Yellow
$jsCode3 = @"
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
"@
echo $jsCode3 > temp_db_connect_check.js
node temp_db_connect_check.js
Remove-Item temp_db_connect_check.js

Write-Host ""
Write-Host "4. 检查数据库表结构..." -ForegroundColor Yellow
$jsCode4 = @"
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
"@
echo $jsCode4 > temp_table_check.js
node temp_table_check.js
Remove-Item temp_table_check.js

Write-Host ""
Write-Host "数据库配置检查完成！" -ForegroundColor Green
Write-Host ""
Write-Host "按任意键退出..." -ForegroundColor Gray
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")