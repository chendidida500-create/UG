@echo off
echo 正在诊断后端依赖...

REM 切换到后端目录
cd /d "%~dp0\..\backend"

echo.
echo === Node.js 和 pnpm 版本信息 ===
node --version
pnpm --version

echo.
echo === 检查 package.json ===
type package.json

echo.
echo === 检查依赖安装状态 ===
pnpm list --depth=0

echo.
echo === 检查过时的依赖 ===
pnpm outdated

echo.
echo === 检查特定依赖 ===
pnpm ls egg
pnpm ls egg-sequelize
pnpm ls egg-jwt
pnpm ls egg-cors
pnpm ls egg-validate

echo.
echo 诊断完成！
pause