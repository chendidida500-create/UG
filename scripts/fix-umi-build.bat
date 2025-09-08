@echo off
chcp 65001 >nul
setlocal

echo 开始修复 Umi 构建工具问题...
echo.

echo 1. 清理现有的依赖文件...
echo   - 清理前端 node_modules...
cd /d "e:\YSY\UG\frontend"
if exist "node_modules" (
    rmdir /s /q "node_modules"
    echo     已删除 node_modules
) else (
    echo     node_modules 不存在
)

echo   - 清理 pnpm-lock.yaml...
cd /d "e:\YSY\UG"
if exist "pnpm-lock.yaml" (
    del "pnpm-lock.yaml"
    echo     已删除 pnpm-lock.yaml
) else (
    echo     pnpm-lock.yaml 不存在
)

echo.
echo 2. 重新安装所有依赖...
cd /d "e:\YSY\UG"
call pnpm install

echo.
echo 3. 检查 Umi 安装状态...
cd /d "e:\YSY\UG\frontend"
call pnpm list @umijs/max --depth 0

echo.
echo 4. 验证 Umi 命令...
cd /d "e:\YSY\UG\frontend"
call npx max -v

echo.
echo 5. 尝试构建项目...
cd /d "e:\YSY\UG\frontend"
call pnpm build

echo.
echo Umi 构建工具修复完成！
pause