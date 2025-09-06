#!/bin/bash

echo "=== UG管理系统启动脚本 ==="
echo ""

# 检查Node.js环境
echo "检查Node.js环境..."
node --version
npm --version
echo ""

# 启动后端服务
echo "启动后端服务..."
cd backend
if [ -f "package.json" ]; then
    echo "安装后端依赖..."
    npm install
    echo "启动Egg.js后端服务..."
    npm run dev &
    BACKEND_PID=$!
    echo "后端服务已启动，PID: $BACKEND_PID"
    cd ..
else
    echo "后端package.json文件不存在"
fi
echo ""

# 启动前端服务
echo "启动前端服务..."
cd frontend
if [ -f "package.json" ]; then
    echo "安装前端依赖..."
    npm install
    echo "启动UMI前端服务..."
    npm run dev &
    FRONTEND_PID=$!
    echo "前端服务已启动，PID: $FRONTEND_PID"
    cd ..
else
    echo "前端package.json文件不存在"
fi
echo ""

echo "=== 启动完成 ==="
echo "前端访问地址: http://localhost:8000"
echo "后端访问地址: http://localhost:7001"
echo ""
echo "按Ctrl+C停止所有服务"

# 等待用户中断
wait