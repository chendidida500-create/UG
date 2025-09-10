@echo off
chcp 65001 >nul
echo UG管理系统数据库连接测试脚本
echo =========================

echo.
echo 1. 测试数据库基本连接...
cd /d "e:\YSY\UG\backend"
node scripts/test-database-connection.js

echo.
echo 2. 测试数据库表结构...
node scripts/test-database-schema.js

echo.
echo 3. 测试数据库数据...
node scripts/test-database-data.js

echo.
echo 数据库测试完成！
pause
