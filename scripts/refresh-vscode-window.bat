@echo off
echo UG管理系统VS Code窗口刷新脚本
echo =========================

echo.
echo 1. 清理TypeScript缓存...
cd frontend
pnpm exec tsc --clearCache
cd ../backend
pnpm exec tsc --clearCache

echo.
echo 2. 重新构建TypeScript文件...
cd ../frontend
pnpm exec tsc --noEmit --skipLibCheck
cd ../backend
pnpm exec tsc --noEmit --skipLibCheck

echo.
echo 3. 完成！
echo 请在VS Code中执行以下操作：
echo 1. 按 Ctrl+Shift+P
echo 2. 输入 "Developer: Reload Window"
echo 3. 选择并执行该命令
echo.
echo 或者直接关闭并重新打开VS Code窗口