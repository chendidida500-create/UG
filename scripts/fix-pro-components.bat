@echo off
echo 正在修复 @ant-design/pro-components 依赖问题...

echo 1. 清理现有依赖...
cd /d "e:\YSY\UG\frontend"
if exist node_modules rmdir /s /q node_modules >nul 2>&1
if exist pnpm-lock.yaml del pnpm-lock.yaml >nul 2>&1

echo 2. 重新安装依赖...
cd /d "e:\YSY\UG"
pnpm install --force

echo 3. 验证 @ant-design/pro-components 是否安装...
if exist frontend\node_modules\@ant-design\pro-components (
    echo @ant-design/pro-components 已成功安装!
) else (
    echo 尝试单独安装 @ant-design/pro-components...
    cd /d "e:\YSY\UG\frontend"
    pnpm add @ant-design/pro-components
)

echo 修复完成! 现在可以尝试运行 pnpm run dev 启动项目
pause