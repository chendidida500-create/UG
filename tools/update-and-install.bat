@echo off
echo 更新项目依赖和环境
echo ===================

echo 1. 检查 Node.js 版本...
node --version

echo.
echo 2. 检查当前目录...
cd /d e:\YSY\UG
echo 当前目录: %CD%

echo.
echo 3. 删除所有 node_modules 目录...
rd /s /q node_modules 2>nul
rd /s /q frontend\node_modules 2>nul
rd /s /q backend\node_modules 2>nul

echo.
echo 4. 删除所有 lock 文件...
del pnpm-lock.yaml 2>nul
del frontend\pnpm-lock.yaml 2>nul
del backend\pnpm-lock.yaml 2>nul

echo.
echo 5. 清理 pnpm 缓存...
pnpm store prune

echo.
echo 6. 重新安装所有依赖...
pnpm install --force

echo.
echo 7. 验证安装的版本...
echo Node.js 版本:
node --version
echo.
echo TypeScript 版本:
pnpm exec tsc --version
echo.
echo React 版本:
pnpm list react
echo.
echo React DOM 版本:
pnpm list react-dom
echo.
echo @types/react 版本:
pnpm list @types/react
echo.
echo @types/react-dom 版本:
pnpm list @types/react-dom

echo.
echo 8. 运行类型检查...
cd frontend
pnpm tsc --noEmit
cd ..

echo.
echo 依赖更新和安装完成！
pause