# 设置UTF-8编码
$OutputEncoding = [Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "正在设置开发环境..." -ForegroundColor Green

# 安装根目录依赖
Write-Host "正在安装根目录依赖..." -ForegroundColor Cyan
pnpm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "根目录依赖安装失败，请确保以管理员身份运行此脚本" -ForegroundColor Red
    exit $LASTEXITCODE
}

# 安装后端依赖
Write-Host "正在安装后端依赖..." -ForegroundColor Cyan
Set-Location -Path "backend"
pnpm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "后端依赖安装失败，请确保以管理员身份运行此脚本" -ForegroundColor Red
    exit $LASTEXITCODE
}

# 返回上一级目录
Set-Location -Path ".."

# 安装前端依赖
Write-Host "正在安装前端依赖..." -ForegroundColor Cyan
Set-Location -Path "frontend"
pnpm install
if ($LASTEXITCODE -ne 0) {
    Write-Host "前端依赖安装失败，请确保以管理员身份运行此脚本" -ForegroundColor Red
    exit $LASTEXITCODE
}

# 返回上一级目录
Set-Location -Path ".."

# 运行数据库迁移
Write-Host "正在运行数据库迁移..." -ForegroundColor Cyan
Set-Location -Path "backend"
pnpm run migrate:up
if ($LASTEXITCODE -ne 0) {
    Write-Host "数据库迁移失败，请检查数据库配置" -ForegroundColor Red
    exit $LASTEXITCODE
}

# 返回上一级目录
Set-Location -Path ".."

Write-Host "环境设置完成!" -ForegroundColor Green
