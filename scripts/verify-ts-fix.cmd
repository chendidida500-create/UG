@echo off
chcp 65001 > nul
echo 正在验证 TypeScript 配置修复...

echo.
echo 1. 检查后端 tsconfig.json 配置...
findstr "rootDir.*\.\./\.\." config\tsconfig\backend.json > nul
if %errorlevel% equ 0 (
    echo ✅ rootDir 配置已正确更新
) else (
    echo ❌ rootDir 配置未正确更新
)

echo.
echo 2. 检查后端 package.json type 字段...
findstr "type.*commonjs" backend\package.json > nul
if %errorlevel% equ 0 (
    echo ✅ package.json type 字段已添加
) else (
    echo ❌ package.json type 字段未添加
)

echo.
echo 验证完成！