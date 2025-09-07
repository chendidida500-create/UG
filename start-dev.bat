@echo off
echo 启动 UG 项目开发服务器...

echo.
echo 启动后端服务...
start "Backend" cmd /c "cd backend && pnpm dev"

timeout /t 5

echo.
echo 启动前端服务...
start "Frontend" cmd /c "cd frontend && pnpm dev"

echo.
echo 开发服务器启动完成！
echo 后端服务地址: http://localhost:7001
echo 前端服务地址: http://localhost:8000
pause