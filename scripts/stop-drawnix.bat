@echo off
chcp 65001 >nul 2>&1
cls
echo ================================================
echo Drawnix无限画布作图工具停止脚本
echo ================================================
echo.

echo 正在停止Drawnix服务...
cd /d "%~dp0.."
docker-compose stop drawnix >nul 2>&1

if %errorlevel% neq 0 (
    echo 错误：停止Drawnix服务失败
    pause
    exit /b 1
)

echo Drawnix服务已停止
echo.

echo 如需重新启动Drawnix服务，请运行 setup-drawnix.bat 脚本
echo.

echo 按任意键退出...
pause >nul