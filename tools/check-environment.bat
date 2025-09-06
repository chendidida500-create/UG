@echo off
chcp 65001 > nul

echo === UG管理系统环境检测 ===
echo.

cd /d E:\YSY\UG
node tools/check-environment.js

echo.
echo 按任意键退出...
pause > nul