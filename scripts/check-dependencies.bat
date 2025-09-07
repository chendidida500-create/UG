@echo off
echo 正在检查项目依赖安全性和过时情况...
cd /d "%~dp0.."

echo 检查根目录依赖过时情况...
pnpm outdated

echo.
echo 检查前端依赖过时情况...
cd frontend
pnpm outdated
cd ..

echo.
echo 检查后端依赖过时情况...
cd backend
pnpm outdated
cd ..

echo.
echo 运行安全审计...
pnpm audit

echo.
echo 依赖检查完成！
pause