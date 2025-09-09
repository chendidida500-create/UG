@echo off
echo UG管理系统TypeScript问题修复脚本
echo =========================

echo.
echo 1. 重命名后端JavaScript文件为TypeScript文件...
cd backend
if exist app.js (
    ren app.js app.ts
    echo 重命名 app.js 为 app.ts
)

cd config
if exist config.local.js (
    ren config.local.js config.local.ts
    echo 重命名 config.local.js 为 config.local.ts
)
cd ..

cd app
if exist router.js (
    ren router.js router.ts
    echo 重命名 router.js 为 router.ts
)

cd controller
if exist home.js (
    ren home.js home.ts
    echo 重命名 home.js 为 home.ts
)
cd ../..

echo.
echo 2. 安装缺失的类型定义...
cd frontend
pnpm add -D @types/node
cd ..

echo.
echo 3. 更新CSS样式...
echo 已创建 Dashboard.module.css 文件并更新 Dashboard.tsx

echo.
echo TypeScript问题修复完成！