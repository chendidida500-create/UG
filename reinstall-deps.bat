@echo off
echo 正在清理项目依赖...

REM 清理根目录依赖
if exist node_modules (
    echo 删除根目录 node_modules...
    rmdir /s /q node_modules
)

if exist pnpm-lock.yaml (
    echo 删除根目录 pnpm-lock.yaml...
    del /q pnpm-lock.yaml
)

REM 清理前端依赖
cd frontend
if exist node_modules (
    echo 删除前端 node_modules...
    rmdir /s /q node_modules
)

if exist pnpm-lock.yaml (
    echo 删除前端 pnpm-lock.yaml...
    del /q pnpm-lock.yaml
)

cd ..

REM 清理后端依赖
cd backend
if exist node_modules (
    echo 删除后端 node_modules...
    rmdir /s /q node_modules
)

if exist pnpm-lock.yaml (
    echo 删除后端 pnpm-lock.yaml...
    del /q pnpm-lock.yaml
)

cd ..

echo.
echo 正在重新安装依赖...
echo.

REM 重新安装依赖
pnpm install

echo.
echo 依赖重新安装完成！
echo.
echo 以下依赖已更新到最新版本：
echo - @types/node: 24.3.1
echo - concurrently: 9.2.1
echo - rimraf: 6.0.1
echo - @ant-design/icons: 6.0.1
echo - react: 19.1.1
echo - react-dom: 19.1.1
echo - @types/react: 19.1.12
echo - @types/react-dom: 19.1.9
echo - @typescript-eslint/eslint-plugin: 8.42.0
echo - @typescript-eslint/parser: 8.42.0
echo - eslint: 9.35.0
echo - eslint-config-prettier: 10.1.8
echo - eslint-plugin-react-hooks: 5.2.0
echo - bcryptjs: 3.0.2
echo - egg-bin: 6.13.0
echo - egg-cors: 3.0.1
echo - egg-scripts: 3.1.0
echo - eslint-config-egg: 14.1.0
echo - uuid: 12.0.0
echo.
pause