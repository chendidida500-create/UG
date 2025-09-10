# Qoder diff apply 问题修复脚本
Write-Host "Qoder diff apply 问题修复脚本"
Write-Host "========================="
Write-Host ""

Write-Host "1. 检查Git状态..."
git status

Write-Host ""
Write-Host "2. 暂存当前更改..."
git add .

Write-Host ""
Write-Host "3. 提交当前更改..."
git commit -m "临时提交以解决Qoder diff apply问题"

Write-Host ""
Write-Host "4. 建议操作："
Write-Host "   请手动重新加载VS Code窗口："
Write-Host "   1. 按 Ctrl+Shift+P"
Write-Host "   2. 输入 'Developer: Reload Window'"
Write-Host "   3. 选择并执行该命令"

Write-Host ""
Write-Host "5. 如果问题仍然存在，请尝试以下步骤："
Write-Host "   - 关闭VS Code"
Write-Host "   - 重新打开项目"
Write-Host "   - 或者重启Qoder IDE"

Write-Host ""
Write-Host "Qoder diff apply 问题修复完成！"
