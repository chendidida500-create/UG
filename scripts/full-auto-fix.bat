@echo off
setlocal enabledelayedexpansion

echo ================================
echo UG项目全自动修复脚本
echo ================================

echo.
echo 1. 清理项目依赖...
echo ------------------------
cd /d "e:\YSY\UG"

REM 清理根目录依赖
if exist node_modules rmdir /s /q node_modules
if exist pnpm-lock.yaml del pnpm-lock.yaml

REM 清理前端依赖
if exist frontend\node_modules rmdir /s /q frontend\node_modules
if exist frontend\pnpm-lock.yaml del frontend\pnpm-lock.yaml

REM 清理后端依赖
if exist backend\node_modules rmdir /s /q backend\node_modules
if exist backend\pnpm-lock.yaml del backend\pnpm-lock.yaml

echo.
echo 2. 重新安装所有依赖...
echo ------------------------
pnpm install

echo.
echo 3. 验证前端依赖...
echo ------------------------
cd /d "e:\YSY\UG\frontend"
if not exist node_modules\@ant-design\pro-components (
    echo 错误: @ant-design/pro-components 未正确安装
    echo 尝试单独安装...
    pnpm add @ant-design/pro-components
) else (
    echo @ant-design/pro-components 已正确安装
)

echo.
echo 4. 启动开发服务器...
echo ------------------------
echo 现在可以运行 pnpm run dev 启动开发服务器

echo.
echo 修复完成! 按任意键退出...
pause >nul
