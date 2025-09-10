@echo off
echo Qoder diff apply 问题修复脚本
echo =========================

echo.
echo 1. 检查Git状态...
git status

echo.
echo 2. 暂存当前更改...
git add .

echo.
echo 3. 提交当前更改...
git commit -m "临时提交以解决Qoder diff apply问题"

echo.
echo 4. 重新加载VS Code窗口...
echo 请手动重新加载VS Code窗口：
echo 1. 按 Ctrl+Shift+P
echo 2. 输入 "Developer: Reload Window"
echo 3. 选择并执行该命令

echo.
echo 5. 如果问题仍然存在，请尝试以下步骤：
echo    - 关闭VS Code
echo    - 重新打开项目
echo    - 或者重启Qoder IDE

echo.
echo Qoder diff apply 问题修复完成！
pause