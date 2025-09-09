@echo off
echo UG管理系统诊断检查脚本
echo =========================

echo.
echo 1. 检查Node.js和pnpm版本...
node --version
pnpm --version

echo.
echo 2. 检查前端依赖状态...
cd frontend
pnpm list --depth 0

echo.
echo 3. 检查后端依赖状态...
cd ../backend
pnpm list --depth 0

echo.
echo 4. 检查环境变量配置...
echo MYSQL_HOST: %MYSQL_HOST%
echo MYSQL_PORT: %MYSQL_PORT%
echo MYSQL_DATABASE: %MYSQL_DATABASE%

echo.
echo 5. 检查数据库连接...
node -e "
const mysql = require('mysql2');
const connection = mysql.createConnection({
  host: process.env.MYSQL_HOST || '127.0.0.1',
  port: process.env.MYSQL_PORT || 3306,
  user: process.env.MYSQL_USERNAME || 'root',
  password: process.env.MYSQL_PASSWORD || 'password',
  database: process.env.MYSQL_DATABASE || 'ug_development'
});

connection.connect((err) => {
  if (err) {
    console.error('数据库连接失败: ' + err.stack);
    process.exit(1);
  }
  console.log('数据库连接成功，连接ID: ' + connection.threadId);
  connection.end();
});
"

echo.
echo 诊断检查完成！