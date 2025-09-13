# 设置UTF-8编码
$OutputEncoding = [Console]::OutputEncoding = [System.Text.Encoding]::UTF8

Write-Host "正在初始化数据库..." -ForegroundColor Green

# 切换到后端目录
Set-Location -Path "backend"

# 创建数据库
Write-Host "创建数据库..." -ForegroundColor Cyan
mysql -u root -e "CREATE DATABASE IF NOT EXISTS ug CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;"
if ($LASTEXITCODE -ne 0) {
    Write-Host "数据库创建失败" -ForegroundColor Red
    exit $LASTEXITCODE
}

# 创建用户并授权
Write-Host "创建数据库用户并授权..." -ForegroundColor Cyan
mysql -u root -e "CREATE USER IF NOT EXISTS 'ug'@'localhost' IDENTIFIED BY 'zcn231101';"
mysql -u root -e "GRANT ALL PRIVILEGES ON ug.* TO 'ug'@'localhost';"
mysql -u root -e "FLUSH PRIVILEGES;"

# 运行数据库迁移
Write-Host "运行数据库迁移..." -ForegroundColor Cyan
pnpm run migrate:up
if ($LASTEXITCODE -ne 0) {
    Write-Host "数据库迁移失败" -ForegroundColor Red
    exit $LASTEXITCODE
}

# 导入种子数据
Write-Host "导入种子数据..." -ForegroundColor Cyan
pnpm run db:seed
if ($LASTEXITCODE -ne 0) {
    Write-Host "种子数据导入失败" -ForegroundColor Red
    exit $LASTEXITCODE
}

Write-Host "数据库初始化完成!" -ForegroundColor Green
