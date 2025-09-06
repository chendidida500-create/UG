@echo off
chcp 65001 > nul

echo === UG管理系统简化启动脚本 ===
echo.

echo 终止可能存在的进程...
taskkill /f /im node.exe 2>nul

echo.
echo 检查端口占用...
netstat -ano | findstr :7001 >nul
if %errorlevel% == 0 (
    echo 终止占用7001端口的进程...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :7001') do taskkill /f /pid %%a 2>nul
)

netstat -ano | findstr :8000 >nul
if %errorlevel% == 0 (
    echo 终止占用8000端口的进程...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :8000') do taskkill /f /pid %%a 2>nul
)

echo.
echo 启动后端服务...
cd /d E:\YSY\UG\backend
start "UG Backend" cmd /k "npx egg-bin dev"

echo.
echo 等待后端服务启动...
timeout /t 10 /nobreak >nul

echo.
echo 启动前端服务...
cd /d E:\YSY\UG\frontend
start "UG Frontend" cmd /k "npx umi dev"

echo.
echo === 启动完成 ===
echo 后端服务: http://localhost:7001
echo 前端服务: http://localhost:8000
echo.
echo 请等待服务完全启动后再访问
pause