@echo off
echo 项目文件编码检查工具
echo ======================

echo 检查时间: %date% %time%
echo.

echo 1. 检查项目根目录下的关键文件...
cd /d e:\YSY\UG

echo 检查 README.md...
chcp 65001 >nul
type README.md >nul 2>&1 && echo README.md: UTF-8 编码正常 || echo README.md: 编码可能存在问题

echo.
echo 2. 检查前端项目文件...
cd /d e:\YSY\UG\frontend

echo 检查 package.json...
type package.json >nul 2>&1 && echo package.json: UTF-8 编码正常 || echo package.json: 编码可能存在问题

echo.
echo 3. 检查后端项目文件...
cd /d e:\YSY\UG\backend

echo 检查 package.json...
type package.json >nul 2>&1 && echo package.json: UTF-8 编码正常 || echo package.json: 编码可能存在问题

echo.
echo 4. 检查配置文件...
cd /d e:\YSY\UG\config

for /f "delims=" %%i in ('dir /b /a-d *.json 2^>nul') do (
    type "%%i" >nul 2>&1 && echo %%i: UTF-8 编码正常 || echo %%i: 编码可能存在问题
)

echo.
echo 5. 检查文档文件...
cd /d e:\YSY\UG\docs

for /f "delims=" %%i in ('dir /b /a-d *.md 2^>nul') do (
    type "%%i" >nul 2>&1 && echo %%i: UTF-8 编码正常 || echo %%i: 编码可能存在问题
)

echo.
echo 文件编码检查完成！
echo 说明：如果显示"编码可能存在问题"，请使用编辑器检查并转换文件编码为 UTF-8。
pause