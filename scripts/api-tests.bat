@echo off
echo UG管理系统API接口测试脚本
echo =========================

echo.
echo 1. 测试健康检查接口...
curl -X GET http://localhost:15001/api/health

echo.
echo 2. 测试主页接口...
curl -X GET http://localhost:15001/

echo.
echo API接口测试完成！
