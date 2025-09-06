@echo off
chcp 65001 > nul

echo === UG管理系统智能启动脚本 ===
echo.

echo 检查是否已有UG进程在运行...
tasklist | findstr /i "node.exe" | findstr /i "backend\|frontend" >nul
if %errorlevel% == 0 (
    echo.
    echo 发现已有UG相关进程在运行:
    tasklist | findstr /i "node.exe"
    echo.
    echo 是否要终止现有进程并重新启动？(Y/N)
    set /p choice="请输入选择: "
    if /i "%choice%"=="Y" (
        echo 终止现有进程...
        taskkill /f /im node.exe 2>nul
        timeout /t 3 /nobreak >nul
    ) else (
        echo.
        echo 已取消启动
        echo 按任意键退出...
        pause > nul
        exit /b
    )
)

echo.
echo === 环境检测 ===
cd /d E:\YSY\UG
node tools/check-environment.js

echo.
echo 是否继续启动项目？(Y/N)
set /p choice="请输入选择: "

if /i "%choice%"=="Y" (
    echo.
    echo 正在启动项目...
    echo.
    
    echo 启动后端服务...
    cd backend
    if exist package.json (
        echo 安装后端依赖...
        call npm install
        echo 启动Egg.js后端服务...
        start "UG Backend" cmd /k "cd /d E:\YSY\UG\backend && npm run dev"
        echo 后端服务已启动
        cd ..
    ) else (
        echo 后端package.json文件不存在
    )
    echo.
    
    echo 等待后端服务启动...
    timeout /t 10 /nobreak >nul
    
    echo 启动前端服务...
    cd frontend
    if exist package.json (
        echo 安装前端依赖...
        call npm install
        echo 启动UMI前端服务...
        start "UG Frontend" cmd /k "cd /d E:\YSY\UG\frontend && npm run dev"
        echo 前端服务已启动
        cd ..
    ) else (
        echo 前端package.json文件不存在
    )
    echo.
    
    echo === 启动完成 ===
    echo 前端访问地址: http://localhost:8000
    echo 后端访问地址: http://localhost:7001
    echo.
    echo 注意: 请等待服务完全启动后再访问
) else (
    echo.
    echo 已取消启动项目
)

echo.
echo 按任意键退出...
pause > nul