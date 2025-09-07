@echo off
echo 正在验证环境变量配置...
cd /d "%~dp0.."

echo 检查根目录环境变量...
if exist .env (
  echo .env 文件存在
) else (
  echo 警告: .env 文件不存在
)

if exist .env.local (
  echo .env.local 文件存在
) else (
  echo 信息: .env.local 文件不存在（可选）
)

echo.
echo 检查前端环境变量...
cd frontend
if exist .env (
  echo frontend/.env 文件存在
) else (
  echo 警告: frontend/.env 文件不存在
)

if exist .env.local (
  echo frontend/.env.local 文件存在
) else (
  echo 信息: frontend/.env.local 文件不存在（可选）
)

cd ..

echo.
echo 检查后端环境变量...
cd backend
if exist .env (
  echo backend/.env 文件存在
) else (
  echo 警告: backend/.env 文件不存在
)

if exist .env.local (
  echo backend/.env.local 文件存在
) else (
  echo 信息: backend/.env.local 文件不存在（可选）
)

cd ..

echo.
echo 环境变量验证完成！
pause