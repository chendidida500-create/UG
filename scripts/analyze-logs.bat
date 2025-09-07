@echo off
echo 正在分析应用日志...
cd /d "%~dp0..\backend"

echo 查看最近的日志文件...
if exist logs (
  dir logs\*.log
  echo.
  echo 显示最近的错误日志...
  type logs\egg-web.log | findstr "ERROR"
) else (
  echo 未找到日志目录
)

echo.
echo 日志分析完成！
pause