@echo off
chcp 65001 >nul 2>&1
cls
echo ================================================
echo WrenAI数据分析工具停止脚本
echo ================================================
echo.

echo 正在停止WrenAI服务...
cd /d "%~dp0.."
docker-compose stop wrenai >nul 2>&1

if %errorlevel% neq 0 (
    echo 错误：停止WrenAI服务失败
    pause
    exit /b 1
)

echo WrenAI服务已停止
echo.

echo 如需重新启动WrenAI服务，请运行 setup-wrenai.bat 脚本
echo.

echo 按任意键退出...
pause >nul