@echo off
chcp 65001 > nul
PowerShell -NoProfile -ExecutionPolicy Bypass -File "%~dp0\auto-dev-server.ps1"
if %errorlevel% neq 0 (
    echo 开发服务器启动失败，请检查错误信息
    pause
    exit /b %errorlevel%
)
pause
