@echo off
chcp 65001 > nul

echo === UG管理系统自动修复和启动脚本 ===
echo.

echo 正在检查并终止可能存在的UG进程...
taskkill /f /im node.exe 2>nul

echo.
echo 正在检查端口占用情况...
netstat -ano | findstr :15001 >nul
if %errorlevel% == 0 (
    echo 终止占用15001端口的进程...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :15001') do taskkill /f /pid %%a 2>nul
)

netstat -ano | findstr :15000 >nul
if %errorlevel% == 0 (
    echo 终止占用15000端口的进程...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :15000') do taskkill /f /pid %%a 2>nul
)

echo.
echo 正在检查Node.js和npm环境...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未找到Node.js，请安装Node.js 20.14.0
    exit /b 1
)

npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未找到npm，请先安装npm
    exit /b 1
)

echo.
echo 正在安装根目录依赖...
cd /d E:\YSY\UG
call npm install

echo.
echo 正在安装后端依赖...
cd /d E:\YSY\UG\backend
call npm install

echo.
echo 正在安装前端依赖...
cd /d E:\YSY\UG\frontend
call npm install

echo.
echo 启动后端服务...
cd /d E:\YSY\UG\backend
start "UG Backend" /min cmd /c "npx egg-bin dev ^> backend.log 2^>^&1"

echo.
echo 等待后端服务启动...
timeout /t 15 /nobreak >nul

echo.
echo 启动前端服务...
cd /d E:\YSY\UG\frontend
start "UG Frontend" /min cmd /c "npx umi dev ^> frontend.log 2^>^&1"

echo.
echo === 启动完成 ===
echo 后端服务已在端口15001上启动
echo 前端服务已在端口15000上启动
echo.
echo 访问地址:
echo   前端: http://localhost:15000
echo   后端: http://localhost:15001
echo.
echo 日志文件:
echo   后端日志: E:\YSY\UG\backend\backend.log
echo   前端日志: E:\YSY\UG\frontend\frontend.log
echo.
echo 按任意键退出...
pause > nul