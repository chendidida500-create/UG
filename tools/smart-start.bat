@echo off
setlocal enabledelayedexpansion

echo ========================================
echo UG管理系统 - 智能启动脚本
echo ========================================
echo.

:: 检查Node.js环境
echo 正在检查Node.js环境...
node --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未检测到Node.js环境，请先安装Node.js!
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('node --version') do set NODE_VERSION=%%i
    echo Node.js版本: !NODE_VERSION!
)

:: 检查npm
echo.
echo 正在检查npm...
npm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误: 未检测到npm，请先安装npm!
    pause
    exit /b 1
) else (
    for /f "tokens=*" %%i in ('npm --version') do set NPM_VERSION=%%i
    echo npm版本: !NPM_VERSION!
)

:: 检查项目依赖
echo.
echo 正在检查项目依赖...
if not exist "E:\YSY\UG\frontend\node_modules" (
    echo 前端依赖缺失，正在安装...
    cd /d E:\YSY\UG\frontend
    npm install
    if !errorlevel! neq 0 (
        echo 错误: 前端依赖安装失败!
        pause
        exit /b 1
    )
)

if not exist "E:\YSY\UG\backend\node_modules" (
    echo 后端依赖缺失，正在安装...
    cd /d E:\YSY\UG\backend
    npm install
    if !errorlevel! neq 0 (
        echo 错误: 后端依赖安装失败!
        pause
        exit /b 1
    )
)

:: 检查端口占用
echo.
echo 正在检查端口占用情况...

:: 检查前端端口15000
echo 检查前端端口 15000...
netstat -ano | findstr :15000 >nul
if !errorlevel! equ 0 (
    echo 前端端口 15000 已被占用，正在尝试终止相关进程...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :15000') do (
        taskkill /f /pid %%a >nul 2>&1
        if !errorlevel! equ 0 (
            echo 已终止占用端口15000的进程 %%a
        ) else (
            echo 无法终止进程 %%a，请手动处理
        )
    )
) else (
    echo 前端端口 15000 可用
)

:: 检查后端端口15001
echo 检查后端端口 15001...
netstat -ano | findstr :15001 >nul
if !errorlevel! equ 0 (
    echo 后端端口 15001 已被占用，正在尝试终止相关进程...
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :15001') do (
        taskkill /f /pid %%a >nul 2>&1
        if !errorlevel! equ 0 (
            echo 已终止占用端口15001的进程 %%a
        ) else (
            echo 无法终止进程 %%a，请手动处理
        )
    )
) else (
    echo 后端端口 15001 可用
)

:: 启动服务
echo.
echo ========================================
echo 开始启动服务...
echo ========================================

echo 正在启动后端服务 (端口: 15001)...
start "UG Backend" /D "E:\YSY\UG\backend" npm run dev

echo.
echo 等待后端服务启动完成...
timeout /t 15 /nobreak >nul

echo.
echo 正在启动前端服务 (端口: 15000)...
start "UG Frontend" /D "E:\YSY\UG\frontend" npm run dev

echo.
echo ========================================
echo 启动完成！
echo 前端访问地址: http://localhost:15000
echo 后端API地址: http://localhost:15001
echo ========================================
echo.

echo 提示: 如果服务未正常启动，请检查:
echo 1. 确保数据库服务已启动
echo 2. 检查数据库连接配置是否正确
echo 3. 查看控制台输出的错误信息
echo.

pause