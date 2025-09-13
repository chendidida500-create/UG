# 设置UTF-8编码
$OutputEncoding = [Console]::OutputEncoding = [System.Text.Encoding]::UTF8
$env:CHCP = '65001'

# 创建作业数组
$jobs = @()

Write-Host '正在启动开发服务器...' -ForegroundColor Green

# 启动后端服务器
Write-Host '启动后端服务器...' -ForegroundColor Cyan
Push-Location 'backend'
$backendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    pnpm run dev
}
$jobs += $backendJob
Pop-Location

# 等待后端服务启动
Write-Host '等待后端服务启动...' -ForegroundColor Cyan
Start-Sleep -Seconds 5

# 启动前端服务器
Write-Host '启动前端服务器...' -ForegroundColor Cyan
Push-Location 'frontend'
$frontendJob = Start-Job -ScriptBlock {
    Set-Location $using:PWD
    pnpm run dev
}
$jobs += $frontendJob
Pop-Location

Write-Host '开发服务器已启动!' -ForegroundColor Green
Write-Host '前端服务运行在: http://localhost:8000' -ForegroundColor Yellow
Write-Host '后端服务运行在: http://localhost:7001' -ForegroundColor Yellow
Write-Host '按Ctrl+C停止所有服务器...' -ForegroundColor Yellow

try {
    # 等待任意作业完成或用户中断
    Wait-Job -Job $jobs
}
finally {
    # 停止所有作业
    Write-Host '正在停止服务器...' -ForegroundColor Cyan
    $jobs | Stop-Job
    $jobs | Remove-Job

    # 确保清理所有node进程
    Get-Process | Where-Object { $_.ProcessName -eq 'node' } | Stop-Process -Force -ErrorAction SilentlyContinue
    Write-Host '服务器已停止!' -ForegroundColor Green
}
