@echo off
setlocal enabledelayedexpansion

REM 读取文件内容到临时文件
powershell -Command "(Get-Content 'frontend\package.json') | Where-Object {$_ -ne '    \"umi\",'} | Set-Content 'frontend\package.json.tmp'"

REM 替换原文件
move /Y "frontend\package.json.tmp" "frontend\package.json"

echo 修复完成！已移除多余的 "umi" 依赖项。