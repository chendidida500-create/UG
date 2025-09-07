@echo off
echo 正在检查UMI路由配置...
cd /d "%~dp0..\frontend"

echo 验证路由配置...
npx umi routes

echo.
echo 路由检查完成！
pause