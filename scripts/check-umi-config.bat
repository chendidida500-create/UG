@echo off
echo ==========================================
echo Umi 构建工具配置检查脚本
echo 检查和修复 Umi 构建工具的配置问题
echo ==========================================

echo.
echo 正在检查环境...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误：未检测到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)

echo ✓ 环境检查通过
echo.

echo 开始检查 Umi 构建工具配置...
cd /d "%~dp0.."
node scripts/check-umi-config.js

echo.
echo 配置检查完成
pause