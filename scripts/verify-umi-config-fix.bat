@echo off
echo 正在验证UMI配置修复...
echo.

cd /d "e:\YSY\UG\frontend"

echo 检查.umirc.ts文件中的导入语句...
findstr "import.*defineConfig.*from.*umi" .umirc.ts >nul
if %errorlevel% == 0 (
    echo ❌ 仍然从'umi'导入defineConfig，需要修复
) else (
    echo ✅ 已正确从'@umijs/max'导入defineConfig
)

echo.
echo 验证完成！
pause