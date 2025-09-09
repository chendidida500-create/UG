@echo off
echo UG管理系统性能分析脚本
echo =========================

echo.
echo 1. 前端构建性能分析...
cd frontend
pnpm build --profile

echo.
echo 2. 后端启动时间分析...
cd ../backend
pnpm dev --require ./scripts/startup-timer.js

echo.
echo 性能分析完成！