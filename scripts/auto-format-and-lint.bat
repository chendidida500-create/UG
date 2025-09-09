@echo off
chcp 65001 >nul 2>&1
cls
echo 正在自动格式化代码和检查代码质量...
cd /d "%~dp0.."

echo.
echo 正在运行ESLint修复...
pnpm run lint:fix

echo.
echo 正在运行Prettier格式化...
pnpm run format

echo.
echo 代码自动格式化和检查完成！
echo 按任意键退出...
pause >nul