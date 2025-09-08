@echo off
echo 验证 .npmrc 配置文件...

echo.
echo 1. 检查文件是否存在...
if exist "e:\YSY\UG\.npmrc" (
    echo   ✓ .npmrc 文件已创建
) else (
    echo   ✗ .npmrc 文件不存在
    exit /b 1
)

echo.
echo 2. 显示文件内容...
echo.
type "e:\YSY\UG\.npmrc"

echo.
echo 验证完成！
pause