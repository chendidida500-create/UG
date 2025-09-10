@echo off
echo 正在安装后端依赖...

REM 切换到后端目录
cd /d "%~dp0\..\backend"

echo.
echo === 当前目录 ===
cd

echo.
echo === 清理可能存在的 node_modules ===
if exist node_modules (
    echo 删除现有的 node_modules 目录...
    rmdir /s /q node_modules
)

echo.
echo === 清理可能存在的 pnpm-lock.yaml ===
if exist pnpm-lock.yaml (
    echo 删除现有的 pnpm-lock.yaml 文件...
    del pnpm-lock.yaml
)

echo.
echo === 检查根目录 .npmrc 配置 ===
cd ..
if exist .npmrc (
    echo 根目录 .npmrc 存在
) else (
    echo 根目录 .npmrc 不存在，创建默认配置...
    echo registry=https://registry.npmjs.org/ > .npmrc
)
cd backend

echo.
echo === 安装依赖 ===
echo 正在运行 pnpm install...
pnpm install

if %errorlevel% neq 0 (
    echo 依赖安装失败！
    pause
    exit /b %errorlevel%
)

echo.
echo === 验证依赖安装 ===
echo 检查 egg-validate:
pnpm list egg-validate
echo.
echo 检查 sequelize-cli:
pnpm list sequelize-cli

echo.
echo === TypeScript 编译检查 ===
echo 正在运行 TypeScript 编译检查...
npx tsc --noEmit

if %errorlevel% neq 0 (
    echo TypeScript 编译检查失败！
    pause
    exit /b %errorlevel%
)

echo.
echo 后端依赖安装和验证完成！
pause