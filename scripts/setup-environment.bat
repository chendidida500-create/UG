@echo off
chcp 65001 > nul
PowerShell -NoProfile -ExecutionPolicy Bypass -File "%~dp0\setup-environment.ps1"
if %errorlevel% neq 0 (
    echo 环境设置失败，请检查错误信息
    pause
    exit /b %errorlevel%
)
pause
cd frontend
call pnpm install

if %errorlevel% neq 0 (
    echo 前端依赖安装失败，请确保以管理员身份运行此脚本
    pause
    exit /b %errorlevel%
)

echo 开发环境设置完成！
pause
