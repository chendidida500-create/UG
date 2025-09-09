@echo off
echo UG管理系统拼写检查脚本
echo =========================

echo.
echo 1. 检查前端源文件拼写...
cd frontend
npx cspell --config ./.vscode/cspell.json "src/**/*.{ts,tsx,js,jsx,json,md}" || (
    if %errorlevel% equ 1 (
        echo 拼写检查完成，未发现错误
    ) else (
        echo 拼写检查发现错误，请查看上面的输出
    )
)

echo.
echo 2. 检查后端源文件拼写...
cd ../backend
npx cspell --config ./.vscode/cspell.json "app/**/*.{ts,js,json,md}" || (
    if %errorlevel% equ 1 (
        echo 拼写检查完成，未发现错误
    ) else (
        echo 拼写检查发现错误，请查看上面的输出
    )
)

echo.
echo 拼写检查完成！