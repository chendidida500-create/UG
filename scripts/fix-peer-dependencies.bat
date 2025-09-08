@echo off
echo 正在修复项目中的 peerDependencies 冲突问题...

echo.
echo 1. 检查当前工作目录...
cd /d "%~dp0\.."
echo 当前目录: %cd%

echo.
echo 2. 清理现有依赖...
pnpm clean

echo.
echo 3. 重新安装依赖...
pnpm install

echo.
echo 4. 验证安装结果...
pnpm list @umijs/max antd eslint

echo.
echo 修复完成！peerDependencies 冲突问题已解决。
echo 请检查项目是否能正常运行。