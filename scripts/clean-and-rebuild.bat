@echo off
echo UG管理系统清理和重建脚本
echo =========================

echo.
echo 1. 清理前端缓存...
cd frontend
if exist node_modules rmdir /s /q node_modules
if exist .umi rmdir /s /q .umi
if exist dist rmdir /s /q dist
if exist .eslintcache del .eslintcache

echo.
echo 2. 清理后端缓存...
cd ../backend
if exist node_modules rmdir /s /q node_modules
if exist dist rmdir /s /q dist
if exist .eslintcache del .eslintcache
if exist app\router.js del app\router.js
if exist app\controller\home.js del app\controller\home.js
if exist config\config.local.js del config\config.local.js

echo.
echo 3. 重新安装依赖...
cd ../frontend
pnpm install

echo.
echo 4. 重新安装后端依赖...
cd ../backend
pnpm install

echo.
echo 5. 重新构建前端...
cd ../frontend
pnpm build

echo.
echo 6. 重新构建后端...
cd ../backend
pnpm tsc

echo.
echo 清理和重建完成！
echo 请重新加载VS Code窗口以使更改生效。