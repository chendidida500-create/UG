@echo off
chcp 65001 >nul 2>&1
cls
echo ================================================
echo Prettier依赖安装脚本
echo ================================================
echo.

echo 正在安装Prettier依赖...
cd /d "%~dp0.."

echo.
echo 1. 在根目录安装Prettier...
pnpm add -D prettier@^3.0.0

if %errorlevel% neq 0 (
    echo 错误：根目录Prettier安装失败
    pause
    exit /b 1
)

echo 根目录Prettier安装成功
echo.

echo 2. 在frontend目录安装依赖...
cd frontend
pnpm install

if %errorlevel% neq 0 (
    echo 错误：frontend依赖安装失败
    pause
    exit /b 1
)

echo frontend依赖安装成功
echo.

echo 3. 在backend目录安装依赖...
cd ..\backend
pnpm install

if %errorlevel% neq 0 (
    echo 错误：backend依赖安装失败
    pause
    exit /b 1
)

echo backend依赖安装成功
echo.

echo ================================================
echo Prettier依赖安装完成！
echo ================================================
echo 现在可以正常使用Prettier格式化代码了
echo.

echo 按任意键退出...
pause >nul