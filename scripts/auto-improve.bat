@echo off
echo 自动化改进脚本

echo.
echo 1. 安装依赖...
pnpm install

echo.
echo 2. 运行 ESLint 自动修复...
pnpm lint:fix

echo.
echo 3. 运行 TypeScript 类型检查...
pnpm tsc

echo.
echo 4. 验证改进结果...
call scripts\verify-improvements.bat

echo.
echo 自动化改进完成！