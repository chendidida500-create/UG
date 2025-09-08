@echo off
chcp 65001 >nul
setlocal

echo 修复 UMI 构建工具依赖冲突...

echo.
echo 1. 备份当前的 package.json...
cd /d "e:\YSY\UG\frontend"
copy package.json package.json.bak >nul
echo   ✓ 已备份 package.json

echo.
echo 2. 更新 package.json 依赖配置...
powershell -Command "(Get-Content 'e:\YSY\UG\frontend\package.json') -replace '\"@umijs/plugins\": \"4.4.12\"', '' | Set-Content 'e:\YSY\UG\frontend\package.json'"
powershell -Command "(Get-Content 'e:\YSY\UG\frontend\package.json') -replace '\"umi\": \"4.4.12\"', '' | Set-Content 'e:\YSY\UG\frontend\package.json'"

echo   ✓ 已移除重复依赖

echo.
echo 3. 清理依赖缓存...
cd /d "e:\YSY\UG"
if exist "node_modules" rmdir /s /q "node_modules"
if exist "pnpm-lock.yaml" del "pnpm-lock.yaml"

cd /d "e:\YSY\UG\frontend"
if exist "node_modules" rmdir /s /q "node_modules"

echo   ✓ 已清理依赖缓存

echo.
echo 4. 重新安装依赖...
cd /d "e:\YSY\UG"
pnpm install

echo.
echo 5. 验证安装结果...
cd /d "e:\YSY\UG\frontend"
pnpm list @umijs/max --depth 0

echo.
echo 依赖冲突修复完成！
echo 请运行以下命令测试构建：
echo cd frontend ^&^& pnpm build
pause