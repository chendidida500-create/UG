@echo off
echo 正在刷新VS Code窗口...
echo.

REM 关闭当前VS Code实例
echo 关闭VS Code...
taskkill /f /im Code.exe >nul 2>&1

REM 等待2秒
timeout /t 2 /nobreak >nul

REM 重新启动VS Code
echo 重新启动VS Code...
cd /d "e:\YSY\UG"
code .

echo.
echo VS Code窗口已刷新完成！
echo 请等待VS Code完全启动并重新加载工作区。
pause