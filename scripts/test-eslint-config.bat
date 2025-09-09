@echo off
echo 正在测试ESLint配置...
cd /d "%~dp0.."

echo 测试全局ESLint版本:
eslint --version

echo 测试前端ESLint配置:
cd frontend
npx eslint --version

echo ESLint配置测试完成！
pause