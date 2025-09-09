@echo off
echo 初始化数据库...
echo 请确保MySQL服务正在运行，并且已正确配置数据库连接信息。
echo.

echo 创建数据库...
cd backend
pnpm egg-sequelize db:create
if %errorlevel% neq 0 (
    echo 警告: 数据库创建失败或数据库已存在
)

echo 运行数据库迁移...
pnpm migrate:up
if %errorlevel% neq 0 (
    echo 错误: 数据库迁移失败
    exit /b 1
)

echo 数据库初始化完成！