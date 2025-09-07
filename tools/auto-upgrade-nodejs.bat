@echo off
echo 自动升级 Node.js 到 20.19.0 版本
echo ================================

echo 检查当前 Node.js 版本...
for /f "tokens=*" %%i in ('node --version 2^>nul') do set CURRENT_VERSION=%%i
if "%CURRENT_VERSION%"=="" (
    echo 未检测到 Node.js 安装
) else (
    echo 当前 Node.js 版本: %CURRENT_VERSION%
)

echo.
echo 1. 下载 nvm-setup.exe...
powershell -Command "Invoke-WebRequest https://github.com/coreybutler/nvm-windows/releases/download/1.1.12/nvm-setup.exe -OutFile %TEMP%\nvm-setup.exe"

echo.
echo 2. 安装 nvm-windows...
start /wait %TEMP%\nvm-setup.exe /S

echo.
echo 3. 重新加载环境变量...
call refreshenv

echo.
echo 4. 验证 nvm 安装...
nvm --version

echo.
echo 5. 使用 nvm 安装 Node.js 20.19.0...
nvm install 20.19.0

echo.
echo 6. 切换到 Node.js 20.19.0...
nvm use 20.19.0

echo.
echo 7. 验证新版本...
node --version

echo.
echo 8. 清理 npm 缓存...
npm cache clean --force

echo.
echo Node.js 升级完成！
echo 请重新打开命令提示符窗口以确保环境变量生效，然后重新安装项目依赖。
pause