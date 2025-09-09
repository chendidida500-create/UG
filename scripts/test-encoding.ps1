# 设置UTF-8编码
$OutputEncoding = New-Object -typename System.Text.UTF8Encoding
[Console]::OutputEncoding = New-Object -typename System.Text.UTF8Encoding
[Console]::InputEncoding = New-Object -typename System.Text.UTF8Encoding

Write-Host "================================"
Write-Host "PowerShell终端编码测试"
Write-Host "================================"
Write-Host ""

Write-Host "1. 基本中文显示测试"
Write-Host "------------------------"
Write-Host "这是一段中文测试文本"
Write-Host "包含特殊字符：【】（）……——+=|、‘“”；"
Write-Host ""

Write-Host "2. 中英文混合测试"
Write-Host "------------------------"
Write-Host "English text with 中文字符"
Write-Host "中文字符 with English text"
Write-Host ""

Write-Host "3. 项目相关术语测试"
Write-Host "------------------------"
Write-Host "ESLint配置检查完成"
Write-Host "Prettier格式化成功"
Write-Host "TypeScript编译无错误"
Write-Host "依赖安装已完成"
Write-Host ""

Write-Host "================================"
Write-Host "测试完成，如果以上文字均正常显示则编码设置正确"
Write-Host "================================"
Write-Host ""

Write-Host "按任意键退出..."
$host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")