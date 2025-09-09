@echo off
chcp 65001 >nul 2>&1
cls
echo 正在自动进行TypeScript类型检查...
cd /d "%~dp0..\frontend"

echo.
echo 正在运行TypeScript类型检查...
pnpm run tsc

echo.
echo TypeScript类型检查完成！
echo 按任意键退出...
pause >nul