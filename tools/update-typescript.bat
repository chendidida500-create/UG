@echo off
echo 正在更新TypeScript版本到5.1.3...
echo.

echo 1. 删除node_modules目录...
cd /d e:\YSY\UG
rd /s /q node_modules 2>nul
rd /s /q frontend\node_modules 2>nul
rd /s /q backend\node_modules 2>nul

echo.
echo 2. 删除pnpm-lock.yaml文件...
del pnpm-lock.yaml 2>nul

echo.
echo 3. 重新安装依赖...
pnpm install --force

echo.
echo 4. 验证TypeScript版本...
pnpm list typescript

echo.
echo TypeScript版本更新完成！
pause