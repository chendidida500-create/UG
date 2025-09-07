@echo off
echo 正在测试数据库连接...
cd /d "%~dp0..\backend"

echo 运行数据库连接测试...
npx egg-bin test test/database-connection.test.js

echo.
echo 数据库连接测试完成！
pause