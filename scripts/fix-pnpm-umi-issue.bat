@echo off
echo 正在修复 pnpm 和 Umi.js 的依赖问题...

echo 1. 清理 node_modules 和 lock 文件...
rmdir /s /q node_modules 2>nul
del pnpm-lock.yaml 2>nul
del .pnpm-store 2>nul

echo 2. 设置 pnpm 的 hoist 模式...
echo hoist=true > .npmrc
echo hoist-pattern[]=@umijs/* >> .npmrc
echo hoist-pattern[]=umi >> .npmrc

echo 3. 重新安装依赖...
pnpm install

echo 修复完成！
pause
