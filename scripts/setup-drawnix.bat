@echo off
chcp 65001 >nul 2>&1
cls
echo ================================================
echo Drawnix无限画布作图工具设置脚本
echo ================================================
echo.

echo 正在检查Docker环境...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误：未检测到Docker环境，请先安装Docker Desktop
    echo 下载地址：https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo Docker环境检查通过
echo.

echo 正在启动Drawnix服务...
cd /d "%~dp0.."
docker-compose up -d drawnix >nul 2>&1

if %errorlevel% neq 0 (
    echo 错误：启动Drawnix服务失败
    pause
    exit /b 1
)

echo Drawnix服务启动成功
echo.

echo 正在检查服务状态...
timeout /t 10 /nobreak >nul

echo.
echo ================================================
echo Drawnix服务信息
echo ================================================
echo 访问地址：http://localhost:3004
echo.

echo 使用说明：
echo 1. 打开浏览器访问 http://localhost:3004
echo 2. 开始使用无限画布进行创作
echo 3. 支持手绘、图形设计等功能
echo.

echo 如需停止Drawnix服务，请运行 stop-drawnix.bat 脚本
echo.

echo 按任意键退出...
pause >nul