@echo off
echo 正在修复前端依赖...

echo 清理前端 node_modules...
cd /d "e:\YSY\UG\frontend"
if exist node_modules rmdir /s /q node_modules
if exist pnpm-lock.yaml del pnpm-lock.yaml

echo 重新安装前端依赖...
pnpm install

echo 前端依赖修复完成!
pause

echo UG管理系统前端依赖修复脚本
echo =========================

echo.
echo 1. 清理现有依赖...
cd /d "e:\YSY\UG\frontend"
if exist node_modules (
    echo    删除node_modules目录...
    rd /s /q node_modules
)
if exist pnpm-lock.yaml (
    echo    删除pnpm-lock.yaml文件...
    del pnpm-lock.yaml
)

echo.
echo 2. 重新安装依赖...
pnpm install

echo.
echo 3. 验证UMI是否正确安装...
pnpm list @umijs/max

echo.
echo 4. 测试UMI命令...
pnpm exec @umijs/max -v

echo.
echo 前端依赖修复完成！
echo 请运行 "pnpm run dev" 启动开发服务器。
pause
