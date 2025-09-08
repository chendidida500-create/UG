@echo off
chcp 65001 >nul
setlocal

echo 测试 UMI 构建工具...

echo.
echo 1. 检查前端依赖安装状态...
cd /d "e:\YSY\UG\frontend"
if exist "node_modules" (
    echo   ✓ node_modules 目录存在
) else (
    echo   ✗ node_modules 目录不存在
)

echo.
echo 2. 检查关键依赖...
if exist "node_modules\react" (
    echo   ✓ React 已安装
) else (
    echo   ✗ React 未安装
)

if exist "node_modules\react-dom" (
    echo   ✓ React DOM 已安装
) else (
    echo   ✗ React DOM 未安装
)

if exist "node_modules\@umijs\max" (
    echo   ✓ @umijs/max 已安装
) else (
    echo   ✗ @umijs/max 未安装
)

echo.
echo 3. 测试 UMI 命令...
echo    注意：如果依赖未完全安装，此命令可能会失败
cd /d "e:\YSY\UG\frontend"
timeout /t 3 /nobreak >nul
echo    请手动运行以下命令测试：
echo    cd frontend ^&^& npx @umijs/max -v

echo.
echo 测试完成！
pause