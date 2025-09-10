@echo off
echo 验证后端设置...

REM 切换到后端目录
cd /d "%~dp0\..\backend"

echo.
echo === 当前目录 ===
cd

echo.
echo === 检查配置文件 ===
echo config.default.js:
if exist config\config.default.js (
    echo   config.default.js 存在
) else (
    echo   config.default.js 不存在
)

echo plugin.js:
if exist config\plugin.js (
    echo   plugin.js 存在
) else (
    echo   plugin.js 不存在
)

echo.
echo === 检查关键配置 ===
echo plugin.js 内容:
type config\plugin.js

echo.
echo === 检查依赖 ===
echo 检查 egg-sequelize 版本:
pnpm list egg-sequelize

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
echo === 尝试运行开发服务器 ===
echo 检查 dev 脚本:
findstr "dev" package.json

echo.
echo 后端设置验证完成！
pause