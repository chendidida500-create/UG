@echo off
echo 正在调试Egg.js中间件...
cd /d "%~dp0..\backend"

echo 启动后端服务并启用中间件调试...
set DEBUG=egg:middleware*
npx egg-bin dev

echo.
echo 中间件调试完成！
pause