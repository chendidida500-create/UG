@echo off
chcp 65001 >nul
echo UG管理系统构建分析脚本
echo =========================

echo.
echo 1. 清理之前的构建产物...
cd /d "%~dp0\..\frontend"
if exist dist rmdir /s /q dist

echo.
echo 2. 设置环境变量并启动构建分析...
REM 设置分析环境变量并启动构建
set ANALYZE=1
set ANALYZE_PORT=8888
set ANALYZE_OPEN=false
echo 正在启动构建分析，请稍候...
echo 构建分析将在端口 8888 上启动
echo 如果端口被占用，分析报告将保存为静态文件

npx @umijs/max build

echo.
echo 构建分析完成！
echo 如果分析服务器启动成功，您可以在浏览器中查看 http://localhost:8888
echo 如果分析服务器启动失败，分析报告将保存为静态文件在 dist 目录中

echo.
echo 3. 检查是否生成了分析报告...
if exist dist\index.html (
  echo 分析报告已生成: dist\index.html
) else (
  echo 未找到分析报告文件
)

echo.
echo 4. 检查是否生成了统计文件...
if exist dist\stats.json (
  echo 统计文件已生成: dist\stats.json
) else (
  echo 未找到统计文件
)

pause
