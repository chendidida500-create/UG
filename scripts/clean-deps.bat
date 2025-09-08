@echo off
echo ==========================================
echo 清理项目依赖文件
echo ==========================================

echo.
echo 正在清理依赖文件...

cd /d "%~dp0.."

REM 清理根目录
if exist node_modules (
    echo 删除根目录 node_modules...
    rmdir /s /q node_modules
)

if exist pnpm-lock.yaml (
    echo 删除根目录 pnpm-lock.yaml...
    del pnpm-lock.yaml
)

REM 清理前端目录
cd frontend
if exist node_modules (
    echo 删除前端 node_modules...
    rmdir /s /q node_modules
)

if exist pnpm-lock.yaml (
    echo 删除前端 pnpm-lock.yaml...
    del pnpm-lock.yaml
)

REM 清理后端目录
cd ..
cd backend
if exist node_modules (
    echo 删除后端 node_modules...
    rmdir /s /q node_modules
)

if exist pnpm-lock.yaml (
    echo 删除后端 pnpm-lock.yaml...
    del pnpm-lock.yaml
)

echo.
echo 依赖文件清理完成！
echo.
pause