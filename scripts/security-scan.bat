@echo off
echo 正在扫描项目安全漏洞...
cd /d "%~dp0.."

echo 运行安全扫描...
pnpm audit

echo.
echo 安全扫描完成！
pause