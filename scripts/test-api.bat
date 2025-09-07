@echo off
echo 正在测试后端API接口...
cd /d "%~dp0..\backend"

echo 运行API测试...
npx egg-bin test test/api.test.js

echo.
echo API测试完成！
pause