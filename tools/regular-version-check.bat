@echo off
echo 定期依赖版本检查脚本
echo ======================

echo 检查时间: %date% %time%
echo.

echo 1. 检查核心运行时环境...
echo Node.js 版本: 
node --version
echo pnpm 版本: 
pnpm --version

echo.
echo 2. 检查关键依赖版本...
cd /d e:\YSY\UG

echo.
echo TypeScript 版本:
pnpm list typescript --depth 0 2>nul

echo.
echo 前端关键依赖:
cd /d e:\YSY\UG\frontend
pnpm list react react-dom umi @umijs/max @umijs/plugins @types/react @types/react-dom --depth 0 2>nul

echo.
echo 后端关键依赖:
cd /d e:\YSY\UG\backend
pnpm list egg --depth 0 2>nul

echo.
echo 3. 检查过时依赖...
cd /d e:\YSY\UG
pnpm outdated

echo.
echo 依赖版本检查完成！
echo 建议将此脚本添加到项目的定期维护流程中。
pause