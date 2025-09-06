@echo off
chcp 65001 > nul

echo === UG管理系统启动脚本 ===
echo.

echo 检查Node.js环境...
node --version
npm --version
echo.

echo 启动后端服务...
cd backend
if exist package.json (
    echo 安装后端依赖...
    call npm install
    echo 启动Egg.js后端服务...
    start "Backend Server" cmd /k npm run dev
    echo 后端服务已启动
    cd ..
) else (
    echo 后端package.json文件不存在
)
echo.

echo 启动前端服务...
cd frontend
if exist package.json (
    echo 安装前端依赖...
    call npm install
    echo 启动UMI前端服务...
    start "Frontend Server" cmd /k npm run dev
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
echo 按任意键退出...
pause > nul