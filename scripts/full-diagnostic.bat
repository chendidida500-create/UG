@echo off
echo ================================
echo UG项目完整诊断脚本
echo ================================

echo.
echo === 系统信息 ===
echo 当前目录: %cd%
echo 系统时间: %date% %time%

echo.
echo === Node.js 和包管理器版本 ===
node --version
pnpm --version
npm --version

echo.
echo === 根目录检查 ===
cd /d "%~dp0\.."
echo 当前目录: %cd%
dir package.json
dir pnpm-lock.yaml

echo.
echo === 后端依赖检查 ===
cd backend
echo 当前目录: %cd%
dir package.json
if exist node_modules (
    echo node_modules 目录存在
) else (
    echo node_modules 目录不存在
)

echo.
echo === 后端 package.json 内容 ===
type package.json

echo.
echo === 尝试安装后端依赖 ===
pnpm install --verbose

echo.
echo === 前端依赖检查 ===
cd ..\frontend
echo 当前目录: %cd%
dir package.json
if exist node_modules (
    echo node_modules 目录存在
) else (
    echo node_modules 目录不存在
)

echo.
echo === 尝试安装前端依赖 ===
pnpm install --verbose

echo.
echo === 返回根目录 ===
cd ..

echo.
echo === 尝试安装根目录依赖 ===
pnpm install --verbose

echo.
echo ================================
echo 诊断完成
echo ================================
pause