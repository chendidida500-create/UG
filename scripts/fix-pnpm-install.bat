@echo off
chcp 65001 >nul
echo UG管理系统pnpm依赖安装修复脚本
echo =========================

echo.
echo 1. 清理现有依赖...
cd /d "E:\YSY\UG"
if exist node_modules (
    echo    删除node_modules目录...
    rd /s /q node_modules
)
if exist pnpm-lock.yaml (
    echo    删除pnpm-lock.yaml文件...
    del pnpm-lock.yaml
)

echo.
echo 2. 重新安装依赖...
pnpm install --force

echo.
echo 3. 验证安装...
pnpm list @umijs/max

echo.
echo 依赖安装修复完成！
pause
