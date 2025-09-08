@echo off
echo ==========================================
echo Umi 构建工具修复脚本
echo 解决由于依赖安装问题导致的 Umi 构建工具无法正常运行的问题
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

echo 开始修复 Umi 构建工具问题...
cd /d "%~dp0.."
node scripts/fix-umi-build.js

echo.
echo 修复脚本执行完成
pause