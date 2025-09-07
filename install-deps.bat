@echo off
setlocal

echo 正在清理现有依赖...
for /d %%i in (node_modules) do if exist "%%i" rd /s /q "%%i" 2>nul
for /d %%i in (frontend\node_modules) do if exist "%%i" rd /s /q "%%i" 2>nul
for /d %%i in (backend\node_modules) do if exist "%%i" rd /s /q "%%i" 2>nul

echo 正在清理锁文件...
del package-lock.json 2>nul
del pnpm-lock.yaml 2>nul
del frontend\package-lock.json 2>nul
del frontend\pnpm-lock.yaml 2>nul
del backend\package-lock.json 2>nul
del backend\pnpm-lock.yaml 2>nul

echo 正在安装根目录依赖...
pnpm install --no-frozen-lockfile

echo 正在安装前端依赖...
cd frontend
pnpm install --no-frozen-lockfile
cd ..

echo 正在安装后端依赖...
cd backend
pnpm install --no-frozen-lockfile
cd ..

echo 依赖安装完成！

pause