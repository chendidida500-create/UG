@echo off
echo ==========================================
echo 安装前端依赖
echo ==========================================

echo.
echo 正在安装前端依赖...
cd /d "%~dp0..\frontend"

REM 安装依赖
pnpm install

if %errorlevel% equ 0 (
    echo.
    echo ✓ 前端依赖安装完成
    echo.
    echo 现在可以运行以下命令：
    echo  - pnpm dev    # 启动开发服务器
    echo  - pnpm build  # 构建项目
) else (
    echo.
    echo ✗ 前端依赖安装失败
    echo.
    echo 请检查网络连接后重试
)

echo.
pause