@echo off
chcp 65001 >nul
echo ================================
echo UG项目依赖清理和重新安装脚本
echo ================================

echo.
echo 1. 清理根目录依赖...
cd /d "E:\YSY\UG"
if exist node_modules (
    echo    删除根目录node_modules...
    rd /s /q node_modules
)
if exist pnpm-lock.yaml (
    echo    删除根目录pnpm-lock.yaml...
    del pnpm-lock.yaml
)

echo.
echo 2. 清理前端依赖...
cd /d "E:\YSY\UG\frontend"
if exist node_modules (
    echo    删除前端node_modules...
    rd /s /q node_modules
)
if exist pnpm-lock.yaml (
    echo    删除前端pnpm-lock.yaml...
    del pnpm-lock.yaml
)
if exist .umi (
    echo    删除前端.umi缓存...
    rd /s /q .umi
)

echo.
echo 3. 清理后端依赖...
cd /d "E:\YSY\UG\backend"
if exist node_modules (
    echo    删除后端node_modules...
    rd /s /q node_modules
)
if exist pnpm-lock.yaml (
    echo    删除后端pnpm-lock.yaml...
    del pnpm-lock.yaml
)

echo.
echo 4. 重新安装依赖...
cd /d "E:\YSY\UG"
echo    安装根目录依赖...
pnpm install

echo.
echo 5. 验证安装...
echo    检查@umijs/max...
pnpm list @umijs/max

echo.
echo 依赖清理和重新安装完成！
echo 请运行 "pnpm run dev" 启动开发服务器。
pause
