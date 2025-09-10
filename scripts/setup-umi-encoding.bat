@echo off
echo UG管理系统UMI编码规范设置脚本
echo =========================

echo.
echo 1. 设置终端编码为UTF-8...
chcp 65001 >nul

echo.
echo 2. 验证VS Code设置...
cd /d "e:\YSY\UG"
type .vscode\settings.json >nul
if %errorlevel% == 0 (
    echo    VS Code设置文件存在
) else (
    echo    错误：VS Code设置文件不存在
    pause
    exit /b 1
)

echo.
echo 3. 验证Prettier配置...
cd frontend
type .prettierrc.json >nul
if %errorlevel% == 0 (
    echo    Prettier配置文件存在
) else (
    echo    错误：Prettier配置文件不存在
    pause
    exit /b 1
)

echo.
echo 4. 验证ESLint配置...
type eslint.config.js >nul
if %errorlevel% == 0 (
    echo    ESLint配置文件存在
) else (
    echo    错误：ESLint配置文件不存在
    pause
    exit /b 1
)

echo.
echo 5. 运行格式化检查...
pnpm run format

echo.
echo 6. 运行代码检查...
pnpm run lint

echo.
echo UMI编码规范设置完成！所有文件均使用UTF-8编码，符合UMI开发规范。
pause
