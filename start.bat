@echo off
echo 正在检查 pnpm 是否已安装...
pnpm --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 未检测到 pnpm，正在安装...
    npm install -g pnpm@8.15.8
    if %errorlevel% neq 0 (
        echo pnpm 安装失败，请手动安装 pnpm 后重试。
        pause
        exit /b 1
    )
)

echo 正在使用 pnpm 安装依赖...
pnpm install
if %errorlevel% neq 0 (
    echo 依赖安装失败，请检查错误信息。
    pause
    exit /b 1
)

echo 正在启动项目...
pnpm dev
