@echo off
echo ========================================
echo UG管理系统 - 简易启动脚本
echo ========================================
echo.

echo 正在启动后端服务 (端口: 15001)...
start "UG Backend" /D "E:\YSY\UG\backend" npm run dev

echo.
echo 等待后端服务启动完成...
timeout /t 15 /nobreak >nul

echo.
echo 正在启动前端服务 (端口: 15000)...
start "UG Frontend" /D "E:\YSY\UG\frontend" npm run dev

echo.
echo ========================================
echo 启动完成！
echo 前端访问地址: http://localhost:15000
echo 后端API地址: http://localhost:15001
echo ========================================
echo.

pause