@echo off
chcp 65001 >nul
setlocal

echo 验证所有修复...

echo.
echo 1. 检查拼写问题修复...
echo   - 检查 cspell.json 配置...
findstr /C:"errorlevel" "e:\YSY\UG\cspell.json" >nul
if %errorlevel% equ 0 (
    echo     ✓ 已添加 errorlevel 到忽略列表
) else (
    echo     ✗ 未找到 errorlevel
)

findstr /C:"findstr" "e:\YSY\UG\cspell.json" >nul
if %errorlevel% equ 0 (
    echo     ✓ 已添加 findstr 到忽略列表
) else (
    echo     ✗ 未找到 findstr
)

echo.
echo 2. 检查 MFSU 配置...
findstr /C:"mfsu:" "e:\YSY\UG\frontend\.umirc.ts" >nul
if %errorlevel% equ 0 (
    echo   ✓ 已配置 MFSU 模式
) else (
    echo   ✗ 未配置 MFSU 模式
)

echo.
echo 3. 检查依赖配置...
cd /d "e:\YSY\UG\frontend"
if exist "package.json" (
    echo   ✓ package.json 存在
    findstr /C:"@umijs/plugins" "package.json" >nul
    if %errorlevel% equ 1 (
        echo   ✓ 已移除重复的 @umijs/plugins 依赖
    ) else (
        echo   ⚠️  仍存在 @umijs/plugins 依赖
    )
    
    findstr /C:"\"umi\":" "package.json" >nul
    if %errorlevel% equ 1 (
        echo   ✓ 已移除重复的 umi 依赖
    ) else (
        echo   ⚠️  仍存在 umi 依赖
    )
) else (
    echo   ✗ package.json 不存在
)

echo.
echo 4. 检查文件结构...
if exist "e:\YSY\UG\frontend\.umirc.ts" (
    echo   ✓ .umirc.ts 配置文件存在
) else (
    echo   ✗ .umirc.ts 配置文件不存在
)

echo.
echo 5. 检查当前 package.json 状态...
echo   - 检查 @umijs/max 依赖...
findstr /C:"@umijs/max" "e:\YSY\UG\frontend\package.json" >nul
if %errorlevel% equ 0 (
    echo   ✓ @umijs/max 依赖已正确配置
) else (
    echo   ✗ @umijs/max 依赖未找到
)

echo   - 检查是否已移除重复依赖...
findstr /C:"@umijs/plugins.*4.4.12" "e:\YSY\UG\frontend\package.json" >nul
if %errorlevel% equ 1 (
    echo   ✓ 已移除重复的 @umijs/plugins 依赖
) else (
    echo   ✗ 仍存在重复的 @umijs/plugins 依赖
)

findstr /C:"\"umi\": \"4.4.12\"" "e:\YSY\UG\frontend\package.json" >nul
if %errorlevel% equ 1 (
    echo   ✓ 已移除重复的 umi 依赖
) else (
    echo   ✗ 仍存在重复的 umi 依赖
)

echo.
echo 验证完成！
echo.
echo 下一步建议：
echo 1. 等待依赖安装完成后，运行以下命令测试UMI：
echo    cd frontend ^&^& npx @umijs/max -v
echo 2. 如果UMI命令正常工作，尝试构建项目：
echo    cd frontend ^&^& pnpm build
echo 3. 启动开发服务器：
echo    cd frontend ^&^& pnpm dev
pause