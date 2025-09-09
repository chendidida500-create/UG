@echo off
chcp 65001 >nul
echo UG管理系统终端编码测试脚本
echo =========================

echo.
echo 基本中文显示测试:
echo 欢迎使用UG管理系统

echo.
echo 中英文混合测试:
echo Welcome to UG管理系统 (欢迎使用UG管理系统)

echo.
echo 特殊符号测试:
echo 项目路径: %cd%
echo 时间戳: %date% %time%

echo.
echo 项目术语测试:
echo UMI, Egg.js, MySQL, Sequelize, JWT, API, RESTful

echo.
echo 测试完成，按任意键退出... 
pause >nul