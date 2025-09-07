@echo off
echo 正在自动构建项目...
cd /d "%~dp0..\frontend"

echo 正在构建前端项目...
npm run build

echo 项目构建完成！
pause