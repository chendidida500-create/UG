#!/bin/bash

echo "统一 TypeScript 版本脚本开始执行..."

# 获取脚本所在目录
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

echo "当前项目根目录: $PROJECT_ROOT"

# 执行 Node.js 脚本更新 package.json 文件
echo "正在更新各项目的 package.json 文件..."
node "$SCRIPT_DIR/update-typescript-version.js"

# 进入根目录并安装依赖
echo ""
echo "正在更新根目录依赖..."
cd "$PROJECT_ROOT"
if [ -f package-lock.json ]; then
  rm package-lock.json
fi
npm install

# 进入 frontend 目录并安装依赖
echo ""
echo "正在更新前端项目依赖..."
cd "$PROJECT_ROOT/frontend"
if [ -f package-lock.json ]; then
  rm package-lock.json
fi
npm install

# 进入 backend 目录并安装依赖
echo ""
echo "正在更新后端项目依赖..."
cd "$PROJECT_ROOT/backend"
if [ -f package-lock.json ]; then
  rm package-lock.json
fi
npm install

echo ""
echo "TypeScript 版本统一更新完成！"
echo "请重新启动您的开发服务器以确保更改生效。"