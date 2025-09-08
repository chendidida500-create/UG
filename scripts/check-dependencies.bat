@echo off
chcp 65001 >nul
echo 正在检查项目依赖配置...

echo.
echo 1. 检查根目录依赖...
cd /d E:\YSY\UG
pnpm list --depth 0

echo.
echo 2. 检查前端依赖...
cd /d E:\YSY\UG\frontend
pnpm list --depth 0

echo.
echo 3. 检查后端依赖...
cd /d E:\YSY\UG\backend
pnpm list --depth 0

echo.
echo 4. 检查 TypeScript 配置...
cd /d E:\YSY\UG\frontend
npx tsc --noEmit --skipLibCheck

echo.
echo 5. 检查 ESLint 配置...
cd /d E:\YSY\UG\frontend
npx eslint --ext .js,.jsx,.ts,.tsx src --quiet

echo.
echo 依赖检查完成！
pause