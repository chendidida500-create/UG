@echo off
chcp 65001 >nul 2>&1
cls
echo ================================================
echo ChartDB数据库可视化工具停止脚本
echo ================================================
echo.

echo 正在停止ChartDB服务...
cd /d "%~dp0.."
docker-compose stop chartdb >nul 2>&1

if %errorlevel% neq 0 (
    echo 错误：停止ChartDB服务失败
    pause
    exit /b 1
)

echo ChartDB服务已停止
echo.

echo 如需重新启动ChartDB服务，请运行 setup-chartdb.bat 脚本
echo.

echo 按任意键退出...
pause >nul