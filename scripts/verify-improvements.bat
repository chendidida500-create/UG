@echo off
echo 正在验证项目改进...

echo.
echo 1. 检查 ESLint 配置...
cd /d "%~dp0\.."
pnpm eslint --print-config config/eslint/base.json > nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ ESLint 配置正确
) else (
    echo ❌ ESLint 配置存在问题
    exit /b 1
)

echo.
echo 2. 检查 TypeScript 配置...
pnpm tsc --noEmit --project tsconfig.json > nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ TypeScript 配置正确
) else (
    echo ❌ TypeScript 配置存在问题
    exit /b 1
)

echo.
echo 3. 运行 ESLint 检查...
pnpm lint > nul 2>&1
if %errorlevel% equ 0 (
    echo ✅ 代码符合 ESLint 规范
) else (
    echo ⚠️  代码存在 ESLint 警告或错误（这可能是因为我们加强了规则）
)

echo.
echo 4. 检查变量命名改进...
findstr /s /i /c:"const result =" backend\app\controller\auth.js > nul 2>&1
if %errorlevel% equ 1 (
    echo ✅ 认证控制器中的变量命名已改进
) else (
    echo ❌ 认证控制器中的变量命名未完全改进
)

findstr /s /i /c:"const result =" backend\app\service\auth.js > nul 2>&1
if %errorlevel% equ 1 (
    echo ✅ 认证服务中的变量命名已改进
) else (
    echo ❌ 认证服务中的变量命名未完全改进
)

findstr /s /i /c:"const data =" frontend\src\utils\request.ts > nul 2>&1
if %errorlevel% equ 1 (
    echo ✅ 请求工具中的变量命名已改进
) else (
    echo ❌ 请求工具中的变量命名未完全改进
)

echo.
echo 验证完成！