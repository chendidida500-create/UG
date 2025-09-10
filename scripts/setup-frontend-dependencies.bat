@echo off
echo 正在以管理员权限安装前端依赖...

REM 切换到前端目录
cd /d "%~dp0\..\frontend"

REM 安装前端依赖
echo 正在安装前端依赖...
call pnpm install

if %errorlevel% neq 0 (
    echo 前端依赖安装失败，请确保以管理员身份运行此脚本
    pause
    exit /b %errorlevel%
)

echo 前端依赖安装完成！
pause