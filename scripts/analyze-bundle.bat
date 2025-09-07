@echo off
echo 正在分析前端构建包大小...
cd /d "%~dp0..\frontend"

echo 启动UMI构建分析...
npx umi build --analyze

echo 构建分析完成！请在浏览器中打开 http://localhost:8888 查看分析结果
pause