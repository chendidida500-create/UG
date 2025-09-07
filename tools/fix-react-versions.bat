@echo off
echo 正在修复React版本依赖问题...
echo.

echo 1. 删除node_modules目录...
cd /d e:\YSY\UG\frontend
rd /s /q node_modules 2>nul

echo.
echo 2. 删除pnpm-lock.yaml文件...
del pnpm-lock.yaml 2>nul

echo.
echo 3. 重新安装依赖...
pnpm install --force

echo.
echo 4. 验证安装的版本...
pnpm list react @types/react

echo.
echo React版本修复完成！
pause