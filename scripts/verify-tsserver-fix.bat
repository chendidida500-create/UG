@echo off
chcp 65001 >nul
echo 验证 TypeScript 服务器修复...

echo.
echo 1. 检查 TypeScript 安装...
cd /d "e:\YSY\UG"
if exist node_modules\typescript\lib\tsserver.js (
    echo    [✓] tsserver.js 文件存在
) else (
    echo    [✗] tsserver.js 文件不存在
    exit /b 1
)

echo.
echo 2. 检查 VS Code 配置...
findstr "typescript.tsdk" .vscode\settings.json >nul
if %errorlevel% == 0 (
    echo    [✓] VS Code TypeScript 配置存在
) else (
    echo    [✗] VS Code TypeScript 配置缺失
    exit /b 1
)

echo.
echo 3. 检查 TypeScript 版本...
node node_modules\typescript\bin\tsc --version >nul 2>&1
if %errorlevel% == 0 (
    echo    [✓] TypeScript 可执行文件正常
    node node_modules\typescript\bin\tsc --version
) else (
    echo    [✗] TypeScript 可执行文件异常
    exit /b 1
)

echo.
echo 验证完成！TypeScript 服务器配置问题已修复。
echo 请重启 VS Code 以使更改生效。
pause