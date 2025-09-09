@echo off
echo UG管理系统安全扫描脚本
echo =========================

echo.
echo 1. 检查前端依赖安全漏洞...
cd frontend
pnpm audit

echo.
echo 2. 检查后端依赖安全漏洞...
cd ../backend
pnpm audit

echo.
echo 3. 检查敏感信息泄露...
echo 检查.env文件是否被忽略...
git check-ignore -v .env >nul 2>&1
if %errorlevel% equ 0 (
    echo .env文件已正确忽略
) else (
    echo 警告: .env文件可能未被忽略，请检查.gitignore文件
)

echo.
echo 安全扫描完成！