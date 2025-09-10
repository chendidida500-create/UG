@echo off
echo 验证后端依赖...

REM 切换到后端目录
cd /d "%~dp0\..\backend"

echo.
echo === 当前目录 ===
cd

echo.
echo === 检查 package.json 中的依赖配置 ===
echo egg-validate 版本:
findstr "egg-validate" package.json
echo sequelize-cli 版本:
findstr "sequelize-cli" package.json

echo.
echo === 检查 node_modules 是否存在 ===
if exist node_modules (
    echo node_modules 目录存在
    echo 检查 egg 相关包:
    dir node_modules | findstr "egg"
    echo 检查 sequelize 相关包:
    dir node_modules | findstr "sequelize"
) else (
    echo node_modules 目录不存在
)

echo.
echo === 尝试安装依赖 ===
echo 使用官方 npm 源安装...
pnpm install --registry=https://registry.npmjs.org/

echo.
echo 验证完成！
pause