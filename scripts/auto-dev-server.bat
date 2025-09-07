@echo off
echo 正在启动开发服务器...
cd /d "%~dp0..\frontend"

echo 启动前端开发服务器...
npm run dev

echo 开发服务器已启动！
pause