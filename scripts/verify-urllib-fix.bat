@echo off
echo 验证 urllib TypeScript 错误修复...

REM 切换到后端目录
cd /d "%~dp0\..\backend"

echo.
echo === 当前目录 ===
cd

echo.
echo === 检查 tsconfig.json 配置 ===
type tsconfig.json | findstr "target"

echo.
echo === 运行 TypeScript 编译检查 ===
echo 正在检查 TypeScript 错误...
npx tsc --noEmit --skipLibCheck

if %errorlevel% neq 0 (
    echo TypeScript 编译检查发现错误！
    echo 错误代码: %errorlevel%
) else (
    echo TypeScript 编译检查通过！
    echo urllib 错误已修复。
)

echo.
echo 验证完成！
pause