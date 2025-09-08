@echo off
echo 正在修复 Umi 4 项目配置问题...

echo.
echo 1. 备份当前配置文件...
cd /d "%~dp0\.."
copy frontend\package.json frontend\package.json.bak >nul

echo.
echo 2. 清理依赖和锁文件...
if exist frontend\node_modules (
    rmdir /s /q frontend\node_modules
    echo    - 已删除 frontend\node_modules
)

if exist frontend\pnpm-lock.yaml (
    del frontend\pnpm-lock.yaml
    echo    - 已删除 frontend\pnpm-lock.yaml
)

if exist node_modules (
    rmdir /s /q node_modules
    echo    - 已删除 node_modules
)

if exist pnpm-lock.yaml (
    del pnpm-lock.yaml
    echo    - 已删除 pnpm-lock.yaml
)

echo.
echo 3. 清理 pnpm 缓存...
pnpm store prune >nul 2>&1
echo    - pnpm 缓存已清理

echo.
echo 4. 重新安装依赖...
pnpm install

echo.
echo 5. 验证修复结果...
echo 修复完成！请运行 "pnpm dev" 启动开发服务器验证项目是否正常工作。