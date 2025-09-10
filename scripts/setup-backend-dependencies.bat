@echo off
echo 正在以管理员权限安装后端依赖...

REM 切换到后端目录
cd /d "%~dp0\..\backend"

REM 安装后端依赖
echo 正在安装后端依赖...
call pnpm install

if %errorlevel% neq 0 (
    echo 后端依赖安装失败，请确保以管理员身份运行此脚本
    pause
    exit /b %errorlevel%
)

echo 后端依赖安装完成！
pause
