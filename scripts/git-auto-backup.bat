@echo off
:: Git 自动备份和更新脚本
:: 该脚本会自动提交更改、推送到远程仓库并拉取更新

echo Git 自动备份和更新脚本开始执行...
echo ===================================

:: 获取当前时间作为提交信息
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "YY=%dt:~0,4%" & set "MM=%dt:~4,2%" & set "DD=%dt:~6,2%"
set "HH=%dt:~8,2%" & set "Min=%dt:~10,2%" & set "Sec=%dt:~12,2%"
set "TIMESTAMP=%YY%-%MM%-%DD% %HH%:%Min%:%Sec%"
set "COMMIT_MSG=Auto backup: %TIMESTAMP%"

:: 检查是否有远程仓库
git remote get-url origin >nul 2>&1
if errorlevel 1 (
    echo ❌ 未配置远程仓库，无法进行推送操作
    echo 请先配置远程仓库：git remote add origin ^<仓库地址^>
    pause
    exit /b 1
)

:: 检查当前分支
for /f %%i in ('git rev-parse --abbrev-ref HEAD') do set BRANCH=%%i
echo 当前分支: %BRANCH%

:: 检查是否有未提交的更改
git diff-index --quiet HEAD -- && git diff-files --quiet
if errorlevel 1 (
    echo 发现未提交的更改，正在自动提交...
    
    :: 添加所有更改
    echo 添加所有更改到暂存区...
    git add .
    
    :: 提交更改
    echo 提交更改...
    git commit -m "%COMMIT_MSG%"
    
    if errorlevel 1 (
        echo ❌ 提交失败
        pause
        exit /b 1
    ) else (
        echo ✅ 提交成功
    )
) else (
    echo 没有发现未提交的更改
)

:: 拉取远程更新
echo 拉取远程更新...
git pull origin %BRANCH%

if errorlevel 1 (
    echo ❌ 拉取更新失败
    pause
    exit /b 1
) else (
    echo ✅ 拉取更新成功
)

:: 推送更改到远程仓库
echo 推送更改到远程仓库...
git push origin %BRANCH%

if errorlevel 1 (
    echo ❌ 推送失败
    pause
    exit /b 1
) else (
    echo ✅ 推送成功
)

echo ===================================
echo Git 自动备份和更新完成！
pause