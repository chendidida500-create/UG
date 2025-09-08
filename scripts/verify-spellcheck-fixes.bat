@echo off
chcp 65001 >nul
setlocal

echo 验证拼写问题修复...

echo.
echo 1. 检查项目根目录的 cspell.json...
findstr /C:"errorlevel" e:\YSY\UG\cspell.json >nul
if %errorlevel% equ 0 (
    echo   ✓ 已添加 errorlevel 到忽略列表
) else (
    echo   ✗ 未找到 errorlevel
)

findstr /C:"findstr" e:\YSY\UG\cspell.json >nul
if %errorlevel% equ 0 (
    echo   ✓ 已添加 findstr 到忽略列表
) else (
    echo   ✗ 未找到 findstr
)

findstr /C:"setlocal" e:\YSY\UG\cspell.json >nul
if %errorlevel% equ 0 (
    echo   ✓ 已添加 setlocal 到忽略列表
) else (
    echo   ✗ 未找到 setlocal
)

findstr /C:"umi" e:\YSY\UG\cspell.json >nul
if %errorlevel% equ 0 (
    echo   ✓ 已添加 umi 到忽略列表
) else (
    echo   ✗ 未找到 umi
)

echo.
echo 2. 检查前端的 cspell.json...
findstr /C:"errorlevel" e:\YSY\UG\frontend\cspell.json >nul
if %errorlevel% equ 0 (
    echo   ✓ 已添加 errorlevel 到忽略列表
) else (
    echo   ✗ 未找到 errorlevel
)

findstr /C:"findstr" e:\YSY\UG\frontend\cspell.json >nul
if %errorlevel% equ 0 (
    echo   ✓ 已添加 findstr 到忽略列表
) else (
    echo   ✗ 未找到 findstr
)

findstr /C:"anticon" e:\YSY\UG\frontend\cspell.json >nul
if %errorlevel% equ 0 (
    echo   ✓ 已添加 anticon 到忽略列表
) else (
    echo   ✗ 未找到 anticon
)

echo.
echo 3. 检查后端的 cspell.json...
findstr /C:"errorlevel" e:\YSY\UG\backend\cspell.json >nul
if %errorlevel% equ 0 (
    echo   ✓ 已添加 errorlevel 到忽略列表
) else (
    echo   ✗ 未找到 errorlevel
)

findstr /C:"findstr" e:\YSY\UG\backend\cspell.json >nul
if %errorlevel% equ 0 (
    echo   ✓ 已添加 findstr 到忽略列表
) else (
    echo   ✗ 未找到 findstr
)

echo.
echo 4. 运行拼写检查...
cd /d "e:\YSY\UG"
pnpm spellcheck

echo.
echo 验证完成！
pause