@echo off
echo UG管理系统自动类型检查脚本
echo =========================

echo.
echo 1. 进入前端目录并运行TypeScript类型检查...
cd /d "e:\YSY\UG\frontend"
pnpm run type-check

echo.
echo 2. 进入后端目录并运行TypeScript类型检查...
cd /d "e:\YSY\UG\backend"
pnpm run type-check

echo.
echo 自动类型检查完成！
pause