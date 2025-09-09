@echo off
echo UG管理系统环境设置脚本
echo =========================

echo.
echo 1. 安装前端依赖...
cd frontend
pnpm install
if %errorlevel% neq 0 (
    echo 错误: 前端依赖安装失败
    exit /b 1
)
echo 前端依赖安装完成！

echo.
echo 2. 安装后端依赖...
cd ../backend
pnpm install
if %errorlevel% neq 0 (
    echo 错误: 后端依赖安装失败
    exit /b 1
)
echo 后端依赖安装完成！

echo.
echo 3. 初始化数据库...
call ../scripts/init-database.bat
if %errorlevel% neq 0 (
    echo 错误: 数据库初始化失败
    exit /b 1
)

echo.
echo 环境设置完成！
echo 请确保：
echo 1. MySQL服务正在运行
echo 2. 数据库连接信息已在 backend/.env 文件中正确配置
echo 3. JWT密钥已在 backend/.env 文件中配置
echo.
echo 运行 "scripts\auto-dev-server.bat" 启动开发服务器