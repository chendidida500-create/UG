@echo off
cd /d "%~dp0\..\frontend"
set ANALYZE=1
npx @umijs/max build
echo Build analysis completed.
dir dist\*.html
dir dist\stats.json
pause
