@echo off
echo UG管理系统完整自动化检查和修复脚本
echo =========================

echo.
echo 1. 前端ESLint修复...
cd /d "e:\YSY\UG\frontend"
pnpm run lint:fix

echo.
echo 2. 前端Prettier格式化...
pnpm run format

echo.
echo 3. 前端TypeScript类型检查...
pnpm run type-check

echo.
echo 4. 后端ESLint修复...
cd /d "e:\YSY\UG\backend"
pnpm run lint:fix

echo.
echo 5. 后端Prettier格式化...
pnpm run format

echo.
echo 6. 后端TypeScript类型检查...
pnpm run type-check

echo.
echo 所有自动化检查和修复完成！
pause