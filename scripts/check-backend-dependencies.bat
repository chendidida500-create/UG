@echo off
echo 检查后端依赖状态...

REM 切换到后端目录
cd /d "%~dp0\..\backend"

echo.
echo === 当前目录 ===
cd

echo.
echo === Node.js 和 pnpm 版本 ===
node --version
pnpm --version

echo.
echo === 检查 node_modules 目录 ===
if exist node_modules (
    echo node_modules 目录存在
    echo node_modules 内容统计:
    dir node_modules | find "Dir(s)"
) else (
    echo node_modules 目录不存在
)

echo.
echo === 检查关键依赖包 ===
echo 检查 egg:
if exist node_modules\egg (
    echo   egg 包已安装
) else (
    echo   egg 包未安装
)

echo 检查 egg-sequelize:
if exist node_modules\egg-sequelize (
    echo   egg-sequelize 包已安装
) else (
    echo   egg-sequelize 包未安装
)

echo 检查 egg-validate:
if exist node_modules\egg-validate (
    echo   egg-validate 包已安装
) else (
    echo   egg-validate 包未安装
)

echo 检查 sequelize-cli:
if exist node_modules\sequelize-cli (
    echo   sequelize-cli 包已安装
) else (
    echo   sequelize-cli 包未安装
)

echo.
echo === package.json 依赖配置 ===
echo Dependencies:
findstr "egg-sequelize" package.json
findstr "egg-validate" package.json
findstr "sequelize-cli" package.json
findstr "egg-jwt" package.json
findstr "egg-cors" package.json

echo.
echo === TypeScript 编译检查 ===
echo 正在运行 TypeScript 编译检查...
npx tsc --noEmit

if %errorlevel% neq 0 (
    echo TypeScript 编译检查失败！
) else (
    echo TypeScript 编译检查通过！
)

echo.
echo 后端依赖检查完成！
pause