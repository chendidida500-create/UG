@echo off
echo 正在自动格式化代码和检查代码质量...
cd /d "%~dp0.."

echo 正在运行ESLint修复...
npm run lint:fix

echo 正在运行Prettier格式化...
npm run format

echo 代码自动格式化和检查完成！
pause