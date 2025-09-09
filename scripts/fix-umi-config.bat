@echo off
echo UG管理系统UMI配置修复脚本
echo =========================

echo.
echo 1. 修复UMI配置文件...
cd frontend
echo import { defineConfig } from 'umi'; > .umirc.ts.tmp
powershell -Command "Get-Content .umirc.ts | Select-Object -Skip 1" >> .umirc.ts.tmp
move /Y .umirc.ts.tmp .umirc.ts

echo.
echo UMI配置修复完成！
echo 请重新加载VS Code窗口以使更改生效。