@echo off
echo 正在自动进行TypeScript类型检查...
cd /d "%~dp0..\frontend"

echo 正在运行TypeScript类型检查...
npm run tsc

echo TypeScript类型检查完成！
pause