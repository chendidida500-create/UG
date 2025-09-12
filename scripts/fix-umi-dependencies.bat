@echo off
echo 正在修复 Umi 依赖问题...

echo 正在清理 node_modules 和 pnpm-lock.yaml...
rmdir /s /q node_modules 2>nul
del pnpm-lock.yaml 2>nul

echo 正在重新安装依赖...
pnpm install

echo Umi 依赖修复完成！
pause
