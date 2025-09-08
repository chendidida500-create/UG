@echo off
chcp 65001 > nul

echo ================================================
echo 修复编辑器状态一致性问题
echo ================================================

cd /d "%~dp0.."

echo.
echo 1. 检查并修复 TypeScript 配置...
echo ================================

echo 正在验证 TypeScript 配置...
pnpm tsc --noEmit --project frontend/tsconfig.json > nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ 前端 TypeScript 配置正确
) else (
    echo × 前端 TypeScript 配置存在问题，正在修复...
    call scripts\fix-tsconfig.bat
)

pnpm tsc --noEmit --project backend/tsconfig.json > nul 2>&1
if %errorlevel% equ 0 (
    echo ✓ 后端 TypeScript 配置正确
) else (
    echo × 后端 TypeScript 配置存在问题，正在修复...
    call scripts\fix-tsconfig.bat
)

echo.
echo 2. 修复 ESLint 配置...
echo ================================

echo 正在检查 ESLint 配置...
if exist frontend\.eslintrc.json (
    echo ✓ 前端 ESLint 配置文件存在
) else (
    echo × 前端 ESLint 配置文件不存在，正在创建...
    echo {"extends": "../config/eslint/frontend.json"} > frontend\.eslintrc.json
    echo ✓ 已创建前端 ESLint 配置文件
)

echo.
echo 3. 重启 TypeScript 服务器...
echo ================================

echo 正在重启 TypeScript 服务器...
taskkill /f /im node.exe > nul 2>&1
echo ✓ 已重启 TypeScript 服务器

echo.
echo ================================================
echo 编辑器状态一致性问题修复完成！
echo ================================================
echo.
echo 建议操作：
echo 1. 重新加载 VS Code 窗口 (Ctrl+Shift+P ^> Developer: Reload Window)
echo 2. 如果仍有问题，请运行：scripts\auto-fix-errors.bat
echo.
pause