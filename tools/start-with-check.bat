@echo off
chcp 65001 > nul

echo === UG管理系统启动检测 ===
echo.

cd /d E:\YSY\UG
node tools/check-environment.js

echo.
echo 是否继续启动项目？(Y/N)
set /p choice="请输入选择: "

if /i "%choice%"=="Y" (
    echo.
    echo 正在启动项目...
    echo.
    call start-all.bat
) else (
    echo.
    echo 已取消启动项目
)

echo.
echo 按任意键退出...
pause > nul