@echo off
echo 修复后端依赖...

REM 切换到后端目录
cd /d "%~dp0\..\backend"

echo.
echo === 当前目录 ===
cd

echo.
echo === 检查 Node.js 和 pnpm 版本 ===
node --version
pnpm --version

echo.
echo === 清理环境 ===
if exist node_modules (
    echo 删除 node_modules...
    rmdir /s /q node_modules
)
if exist pnpm-lock.yaml (
    echo 删除 pnpm-lock.yaml...
    del pnpm-lock.yaml
)

echo.
echo === 验证 package.json ===
echo 依赖配置:
findstr "egg-validate" package.json
findstr "sequelize-cli" package.json
findstr "egg-sequelize" package.json
findstr "egg-jwt" package.json
findstr "egg-cors" package.json

echo.
echo === 检查根目录 .npmrc 配置 ===
cd ..
if exist .npmrc (
    echo 根目录 .npmrc 存在
    type .npmrc
) else (
    echo 根目录 .npmrc 不存在
)
cd backend

echo.
echo === 安装依赖 ===
echo 正在安装依赖...
pnpm install --verbose

if %errorlevel% neq 0 (
    echo 依赖安装失败！
    echo 错误代码: %errorlevel%
    pause
    exit /b %errorlevel%
)

echo.
echo === 验证安装结果 ===
if exist node_modules (
    echo node_modules 目录创建成功
    echo node_modules 内容:
    dir node_modules | findstr "egg"
) else (
    echo node_modules 目录未创建
)

echo.
echo === TypeScript 编译检查 ===
echo 正在运行 TypeScript 编译检查...
npx tsc --noEmit

echo.
echo 后端依赖修复完成！
pause