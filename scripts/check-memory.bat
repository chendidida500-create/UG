@echo off
echo 正在检查内存使用情况...
cd /d "%~dp0..\backend"

echo 启动内存监控...
node --inspect-brk app.js

echo.
echo 内存检查完成！
pause