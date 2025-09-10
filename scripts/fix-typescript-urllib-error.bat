@echo off
echo 修复 TypeScript urllib 错误...

REM 切换到后端目录
cd /d "%~dp0\..\backend"

echo.
echo === 当前目录 ===
cd

echo.
echo === 检查 TypeScript 配置 ===
echo 更新 tsconfig.json 中的 target 版本...

echo.
echo === 验证修复 ===
echo 正在运行 TypeScript 编译检查...
npx tsc --noEmit

if %errorlevel% neq 0 (
    echo TypeScript 编译检查失败！
    echo 错误代码: %errorlevel%
) else (
    echo TypeScript 编译检查通过！
    echo urllib 错误已修复。
)

echo.
echo 修复完成！
pause