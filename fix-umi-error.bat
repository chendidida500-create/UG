@echo off
setlocal

echo 正在修复 Umi 构建错误...

echo 正在删除 .umi 缓存目录...
rd /s /q frontend\.umi 2>nul
rd /s /q frontend\.umi-production 2>nul

echo 正在重新生成 Umi 配置...
cd frontend
pnpm umi setup
cd ..

echo 正在重新构建项目...
cd frontend
pnpm run build
cd ..

echo Umi 错误修复完成！

pause