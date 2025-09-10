@echo off
echo UG管理系统UMI配置修复脚本
echo =========================

echo.
echo 1. 修复UMI配置文件...
cd frontend
powershell -Command "(Get-Content .umirc.ts) -replace 'import { defineConfig } from ''umi''', 'import { defineConfig } from ''@umijs/max''' | Set-Content .umirc.ts"

echo.
echo UMI配置修复完成！
echo 请重新加载VS Code窗口以使更改生效。