@echo off
echo UG管理系统前端开发服务器启动脚本
echo =========================

echo.
echo 启动前端开发服务器...
cd /d "e:\YSY\UG"
pnpm --filter ug-frontend run dev

echo.
echo 前端开发服务器已启动！
pause