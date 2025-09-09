@echo off
chcp 65001 >nul
echo 正在自动修复编辑器中的错误提示...

cd /d "%~dp0.."

echo.
echo ================================
echo 自动修复常见错误
echo ================================

echo.
echo 1. 清理项目缓存...
if exist "frontend\node_modules\.cache" (
  rd /s /q "frontend\node_modules\.cache"
  echo ✓ 已清理前端缓存
) else (
  echo - 前端缓存不存在
)

if exist "backend\node_modules\.cache" (
  rd /s /q "backend\node_modules\.cache"
  echo ✓ 已清理后端缓存
) else (
  echo - 后端缓存不存在
)

echo.
echo 2. 重新安装依赖...
echo 正在重新安装前端依赖...
cd frontend
call pnpm install
cd ..

echo 正在重新安装后端依赖...
cd backend
call pnpm install
cd ..

echo.
echo 3. 修复TypeScript类型错误...
call pnpm run fix-ts

echo.
echo 4. 运行ESLint修复...
call pnpm run lint:fix

echo.
echo 5. 清理构建产物...
call pnpm run clean

echo.
echo 6. 重新构建项目...
call pnpm run build

echo.
echo ================================
echo 错误修复完成！
echo ================================
echo.
echo 如果仍有错误，请尝试以下操作：
echo 1. 重新加载VS Code窗口 (Ctrl+Shift+P ^> Developer: Reload Window)
echo 2. 检查终端输出中的具体错误信息
echo 3. 运行数据库迁移：pnpm run db:migrate
echo.
pause