@echo off
echo UG管理系统自动格式化和代码检查脚本
echo =========================

echo.
echo 1. 进入前端目录并运行ESLint修复...
cd /d "e:\YSY\UG\frontend"
pnpm run lint:fix

echo.
echo 2. 运行Prettier格式化...
pnpm run format

echo.
echo 3. 运行TypeScript类型检查...
pnpm run type-check

echo.
echo 自动格式化和代码检查完成！
pause