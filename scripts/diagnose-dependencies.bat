@echo off
echo ==========================================
echo 依赖问题诊断脚本
echo 诊断和解决项目依赖相关问题
echo ==========================================

echo.
echo 正在检查环境...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误：未检测到 Node.js，请先安装 Node.js
    pause
    exit /b 1
)

pnpm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误：未检测到 pnpm，请先安装 pnpm
    pause
    exit /b 1
)

echo ✓ 环境检查通过
echo.

echo 开始诊断项目依赖问题...
cd /d "%~dp0.."
node scripts/diagnose-dependencies.js

echo.
echo 诊断完成
pause