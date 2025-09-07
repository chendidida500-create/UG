@echo off
echo 项目文件编码转换工具
echo ======================

echo 本工具将帮助您将项目中的文件转换为 UTF-8 编码
echo.

echo 警告：此操作将修改项目中的文件，请确保已备份重要数据
echo.
echo 是否继续？(y/N)
set /p choice=
if /i not "%choice%"=="y" (
    echo 操作已取消
    pause
    exit /b
)

echo.
echo 开始转换文件编码为 UTF-8...
cd /d e:\YSY\UG

echo 转换 README.md...
powershell -Command "& {Get-Content -Path 'README.md' | Set-Content -Path 'README.md.tmp' -Encoding UTF8; Move-Item 'README.md.tmp' 'README.md' -Force}"

echo.
echo 转换 package.json...
powershell -Command "& {Get-Content -Path 'package.json' | Set-Content -Path 'package.json.tmp' -Encoding UTF8; Move-Item 'package.json.tmp' 'package.json' -Force}"

echo.
echo 转换前端目录文件...
cd /d e:\YSY\UG\frontend
powershell -Command "& {Get-Content -Path 'package.json' | Set-Content -Path 'package.json.tmp' -Encoding UTF8; Move-Item 'package.json.tmp' 'package.json' -Force}"

echo.
echo 转换后端目录文件...
cd /d e:\YSY\UG\backend
powershell -Command "& {Get-Content -Path 'package.json' | Set-Content -Path 'package.json.tmp' -Encoding UTF8; Move-Item 'package.json.tmp' 'package.json' -Force}"

echo.
echo 转换配置文件...
cd /d e:\YSY\UG\config
for /f "delims=" %%i in ('dir /b /a-d *.json 2^>nul') do (
    echo 转换 %%i...
    powershell -Command "& {Get-Content -Path '%%i' | Set-Content -Path '%%i.tmp' -Encoding UTF8; Move-Item '%%i.tmp' '%%i' -Force}"
)

echo.
echo 转换文档文件...
cd /d e:\YSY\UG\docs
for /f "delims=" %%i in ('dir /b /a-d *.md 2^>nul') do (
    echo 转换 %%i...
    powershell -Command "& {Get-Content -Path '%%i' | Set-Content -Path '%%i.tmp' -Encoding UTF8; Move-Item '%%i.tmp' '%%i' -Force}"
)

echo.
echo 文件编码转换完成！
echo 所有文件均已转换为 UTF-8 编码
pause