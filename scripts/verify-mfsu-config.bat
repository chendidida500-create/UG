@echo off
chcp 65001 >nul
setlocal

echo 验证 MFSU 配置...

echo.
echo 1. 检查 .umirc.ts 配置文件...
findstr /C:"mfsu:" "e:\YSY\UG\frontend\.umirc.ts" >nul
if %errorlevel% equ 0 (
    echo   ✓ 已找到 MFSU 配置
) else (
    echo   ✗ 未找到 MFSU 配置
)

echo.
echo 2. 检查 MFSU 配置项...
findstr /C:"strategy:" "e:\YSY\UG\frontend\.umirc.ts" >nul
if %errorlevel% equ 0 (
    echo   ✓ 已配置 MFSU 策略
) else (
    echo   ✗ 未配置 MFSU 策略
)

findstr /C:"cacheDirectoryPath:" "e:\YSY\UG\frontend\.umirc.ts" >nul
if %errorlevel% equ 0 (
    echo   ✓ 已配置 MFSU 缓存路径
) else (
    echo   ✗ 未配置 MFSU 缓存路径
)

echo.
echo 3. 启动开发服务器以测试 MFSU...
echo    注意：请手动检查控制台输出以确认 MFSU 是否正常工作
cd /d "e:\YSY\UG\frontend"
echo    运行以下命令启动开发服务器：
echo    pnpm dev
echo.
echo    在启动日志中应该能看到类似 "MFSU enabled" 的信息

echo.
echo MFSU 配置验证完成！
pause