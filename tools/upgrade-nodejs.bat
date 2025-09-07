@echo off
echo 升级 Node.js 到 20.19.0 版本
echo =============================

echo 检查当前 Node.js 版本...
node --version
echo.

echo 1. 下载并安装 nvm-windows...
echo 请访问 https://github.com/coreybutler/nvm-windows/releases 下载最新版本的 nvm-setup.exe
echo 安装完成后按任意键继续...
pause

echo.
echo 2. 验证 nvm 安装...
nvm --version
echo.

echo 3. 使用 nvm 安装 Node.js 20.19.0...
nvm install 20.19.0
echo.

echo 4. 切换到 Node.js 20.19.0...
nvm use 20.19.0
echo.

echo 5. 验证新版本...
node --version
echo.

echo 6. 清理 npm 缓存...
npm cache clean --force
echo.

echo Node.js 升级完成！
echo 请重新打开命令提示符窗口以确保环境变量生效，然后重新安装项目依赖。
pause