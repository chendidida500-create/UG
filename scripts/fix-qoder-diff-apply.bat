@echo off
chcp 65001 >nul
echo 正在解决 "Qoder diff apply" 问题...

echo.
echo 1. 重新加载窗口以解决配置问题...
echo    根据用户偏好和历史经验，"Qoder diff apply" 问题通常通过重新加载窗口解决

echo.
echo 2. 验证前端依赖配置...
cd /d "e:\YSY\UG\frontend"
if exist package.json (
    echo    [✓] 前端 package.json 文件存在
) else (
    echo    [✗] 前端 package.json 文件不存在
    exit /b 1
)

echo.
echo 3. 验证测试依赖文件...
cd /d "e:\YSY\UG"
if exist frontend\test-dependencies.ts (
    echo    [✓] 测试依赖文件存在
) else (
    echo    [✗] 测试依赖文件不存在
    exit /b 1
)

echo.
echo 4. 检查 TypeScript 配置...
if exist frontend\tsconfig.json (
    echo    [✓] TypeScript 配置文件存在
) else (
    echo    [✗] TypeScript 配置文件不存在
    exit /b 1
)

echo.
echo 5. 验证关键依赖安装...
echo    检查 @testing-library/jest-dom...
findstr "@testing-library/jest-dom" frontend\package.json >nul
if %errorlevel% == 0 (
    echo    [✓] @testing-library/jest-dom 依赖已配置
) else (
    echo    [!] @testing-library/jest-dom 依赖未在 package.json 中找到
)

echo.
echo 6. 建议操作...
echo    请执行以下操作以完全解决问题：
echo      1. 关闭当前的 Qoder IDE 窗口
echo      2. 重新打开项目
echo      3. 如果问题仍然存在，请运行 pnpm install 命令重新安装依赖

echo.
echo 问题解决脚本执行完成！
pause