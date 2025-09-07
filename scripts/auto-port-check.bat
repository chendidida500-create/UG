@echo off
echo 正在检查端口占用情况...

echo.
echo ================================
echo 端口占用检查工具
echo ================================

echo.
echo 检查前端开发服务器端口 (15000)...
netstat -ano | findstr :15000 > nul
if %errorlevel% == 0 (
  echo ✓ 前端端口 15000 正在使用
  for /f "tokens=5" %%a in ('netstat -ano ^| findstr :15000') do (
    echo   进程ID: %%a
    tasklist /fi "PID eq %%a" | findstr /v "PID"
  )
) else (
  echo ○ 前端端口 15000 未被占用
)

echo.
echo 检查后端开发服务器端口 (15001)...
netstat -ano | findstr :15001 > nul
if %errorlevel% == 0 (
  echo ✓ 后端端口 15001 正在使用
  for /f "tokens=5" %%a in ('netstat -ano ^| findstr :15001') do (
    echo   进程ID: %%a
    tasklist /fi "PID eq %%a" | findstr /v "PID"
  )
) else (
  echo ○ 后端端口 15001 未被占用
)

echo.
echo 检查其他常用端口...
for %%p in (3000 8080 8000 9000) do (
  netstat -ano | findstr :%%p > nul
  if %errorlevel% == 0 (
    echo ✓ 端口 %%p 正在使用
    for /f "tokens=5" %%a in ('netstat -ano ^| findstr :%%p') do (
      echo   进程ID: %%a
      tasklist /fi "PID eq %%a" | findstr /v "PID"
    )
  ) else (
    echo ○ 端口 %%p 未被占用
  )
  echo.
)

echo.
echo ================================
echo 端口检查完成！
echo ================================
echo.
echo 如果需要终止占用端口的进程，请使用:
echo taskkill /PID ^<进程ID^> /F
echo.
pause