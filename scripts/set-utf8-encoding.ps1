# UG管理系统UTF-8编码设置脚本
Write-Host "UG管理系统UTF-8编码设置脚本"
Write-Host "========================="
Write-Host ""
Write-Host "设置终端编码为UTF-8..."
chcp 65001 | Out-Null

Write-Host ""
Write-Host "当前活动代码页:"
chcp

Write-Host ""
Write-Host "UTF-8编码设置完成！"
