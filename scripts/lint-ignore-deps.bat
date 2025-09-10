@echo off
echo UG管理系统代码检查脚本（忽略依赖检测）
echo =========================

echo.
echo 运行ESLint检查（忽略依赖警告）...
cd /d "e:\YSY\UG\frontend"
pnpm run lint 2>nul

echo.
echo 运行Prettier格式检查...
pnpm run format

echo.
echo 代码检查完成（已忽略依赖检测警告）！
pause