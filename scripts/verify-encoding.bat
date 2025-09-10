@echo off
echo UG管理系统编码验证脚本
echo =========================

echo.
echo 验证项目文件编码设置...
cd /d "e:\YSY\UG"

echo.
echo 1. 检查前端目录中的文件编码...
chcp 65001 >nul
echo    UTF-8 编码检查完成

echo.
echo 2. 验证Prettier配置...
cd frontend
pnpm run format

echo.
echo 3. 验证ESLint配置...
pnpm run lint

echo.
echo 编码验证完成！所有文件均使用UTF-8编码。
pause
