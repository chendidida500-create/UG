@echo off
echo 检查项目全部依赖版本
echo ======================

echo 1. 检查 Node.js 版本...
echo 要求版本: 20.19.0
node --version

echo.
echo 2. 检查 pnpm 版本...
echo 要求版本: 8.15.8
pnpm --version

echo.
echo 3. 检查根目录依赖版本...
cd /d e:\YSY\UG

echo.
echo TypeScript 版本:
echo 要求版本: 5.9.2
pnpm list typescript --depth 0 2>nul | findstr "typescript"

echo.
echo @types/node 版本:
echo 要求版本: ^24.3.1
pnpm list @types/node --depth 0 2>nul | findstr "@types/node"

echo.
echo 4. 检查前端依赖版本...
cd /d e:\YSY\UG\frontend

echo.
echo React 版本:
echo 要求版本: 18.3.1
pnpm list react --depth 0 2>nul | findstr "react@18.3.1"

echo.
echo React DOM 版本:
echo 要求版本: 18.3.1
pnpm list react-dom --depth 0 2>nul | findstr "react-dom@18.3.1"

echo.
echo UMI 版本:
echo 要求版本: 4.4.12
pnpm list umi --depth 0 2>nul | findstr "umi@4.4.12"

echo.
echo @umijs/max 版本:
echo 要求版本: 4.4.12
pnpm list @umijs/max --depth 0 2>nul | findstr "@umijs/max@4.4.12"

echo.
echo @umijs/plugins 版本:
echo 要求版本: 4.4.12
pnpm list @umijs/plugins --depth 0 2>nul | findstr "@umijs/plugins@4.4.12"

echo.
echo @types/react 版本:
echo 要求版本: 18.3.24
pnpm list @types/react --depth 0 2>nul | findstr "@types/react@18.3.24"

echo.
echo @types/react-dom 版本:
echo 要求版本: 18.3.1
pnpm list @types/react-dom --depth 0 2>nul | findstr "@types/react-dom@18.3.1"

echo.
echo 5. 检查后端依赖版本...
cd /d e:\YSY\UG\backend

echo.
echo Egg.js 版本:
echo 要求版本: 3.31.0
pnpm list egg --depth 0 2>nul | findstr "egg@3.31.0"

echo.
echo 所有依赖版本检查完成！
pause