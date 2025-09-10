@echo off
echo 正在清除VS Code缓存...

REM 关闭VS Code
taskkill /f /im Code.exe 2>nul

REM 清除工作区缓存
rd /s /q ".vscode\workspaceStorage" 2>nul

echo VS Code缓存已清除完成！

echo.
echo 请重新启动VS Code以应用更改。
pause
