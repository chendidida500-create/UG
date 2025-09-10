@echo off
echo 正在设置开发环境...

REM 安装根目录依赖
echo 正在安装根目录依赖...
call pnpm install

if %errorlevel% neq 0 (
    echo 根目录依赖安装失败，请确保以管理员身份运行此脚本
    pause
    exit /b %errorlevel%
)

REM 安装后端依赖
echo 正在安装后端依赖...
cd backend
call pnpm install

if %errorlevel% neq 0 (
    echo 后端依赖安装失败，请确保以管理员身份运行此脚本
    pause
    exit /b %errorlevel%
)

REM 返回上一级目录
cd ..

REM 安装前端依赖
echo 正在安装前端依赖...
cd frontend
call pnpm install

if %errorlevel% neq 0 (
    echo 前端依赖安装失败，请确保以管理员身份运行此脚本
    pause
    exit /b %errorlevel%
)

echo 开发环境设置完成！
pause