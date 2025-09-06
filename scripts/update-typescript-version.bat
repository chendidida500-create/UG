@echo off
echo 统一 TypeScript 版本脚本开始执行...

REM 获取当前目录
set CURRENT_DIR=%~dp0
set PROJECT_ROOT=%CURRENT_DIR:~0,-9%

echo 当前项目根目录: %PROJECT_ROOT%

REM 执行 Node.js 脚本更新 package.json 文件
echo 正在更新各项目的 package.json 文件...
node "%CURRENT_DIR%update-typescript-version.js"

REM 进入根目录并安装依赖
echo.
echo 正在更新根目录依赖...
cd /d "%PROJECT_ROOT%"
if exist package-lock.json del package-lock.json
npm install

REM 进入 frontend 目录并安装依赖
echo.
echo 正在更新前端项目依赖...
cd /d "%PROJECT_ROOT%frontend"
if exist package-lock.json del package-lock.json
npm install

REM 进入 backend 目录并安装依赖
echo.
echo 正在更新后端项目依赖...
cd /d "%PROJECT_ROOT%backend"
if exist package-lock.json del package-lock.json
npm install

echo.
echo TypeScript 版本统一更新完成！
echo 请重新启动您的开发服务器以确保更改生效。
pause