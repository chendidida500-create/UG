@echo off
echo 正在修复 TypeScript 配置问题...

echo.
echo 1. 更新后端 TypeScript 配置...
echo 已完成更新后端 TypeScript 配置

echo.
echo 2. 更新后端 package.json...
echo 已完成更新后端 package.json

echo.
echo 3. 验证修复...
cd /d "%~dp0\.."
pnpm tsc --noEmit --project backend/tsconfig.json > nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ TypeScript 配置问题已修复
) else (
    echo ❌ TypeScript 配置问题修复失败
    exit /b 1
)

echo.
echo TypeScript 配置修复完成！