@echo off
echo 检查后端依赖安装状态...

REM 切换到后端目录
cd /d "%~dp0\..\backend"

echo.
echo === 当前目录 ===
cd

echo.
echo === 检查 package.json ===
type package.json | findstr "egg-validate"

echo.
echo === 尝试安装依赖 ===
echo 正在运行 pnpm install...
cmd /c "pnpm install"

echo.
echo === 检查安装结果 ===
if exist node_modules (
    echo node_modules 目录已创建
) else (
    echo node_modules 目录未创建
)

pause