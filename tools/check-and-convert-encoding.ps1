# PowerShell 脚本用于检查和转换文件编码为 UTF-8
# 使用方法: 
# 1. 在 PowerShell 中运行: .\check-and-convert-encoding.ps1
# 2. 或者在 CMD 中运行: powershell -ExecutionPolicy Bypass -File "check-and-convert-encoding.ps1"

Write-Host "项目文件编码检查和转换工具" -ForegroundColor Green
Write-Host "========================" -ForegroundColor Green
Write-Host ""

# 获取项目根目录
$projectRoot = "e:\YSY\UG"
Set-Location $projectRoot

# 定义需要检查的文件类型
$fileTypes = @("*.js", "*.jsx", "*.ts", "*.tsx", "*.json", "*.md", "*.html", "*.css", "*.yml", "*.yaml", "*.txt", "*.sql")

Write-Host "1. 检查项目文件编码..." -ForegroundColor Yellow
Write-Host ""

# 检查文件编码的函数
function Check-FileEncoding {
    param([string]$FilePath)
    
    try {
        $bytes = [System.IO.File]::ReadAllBytes($FilePath)
        
        # 检查 BOM
        if ($bytes.Length -ge 3 -and $bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
            return "UTF-8 with BOM"
        } elseif ($bytes.Length -ge 2 -and $bytes[0] -eq 0xFF -and $bytes[1] -eq 0xFE) {
            return "UTF-16 LE"
        } elseif ($bytes.Length -ge 2 -and $bytes[0] -eq 0xFE -and $bytes[1] -eq 0xFF) {
            return "UTF-16 BE"
        } else {
            # 尝试以 UTF-8 读取
            try {
                $content = [System.IO.File]::ReadAllText($FilePath, [System.Text.Encoding]::UTF8)
                return "UTF-8"
            } catch {
                return "Non-UTF-8"
            }
        }
    } catch {
        return "Error"
    }
}

# 转换文件编码为 UTF-8 的函数
function Convert-ToUTF8 {
    param([string]$FilePath)
    
    try {
        $content = [System.IO.File]::ReadAllText($FilePath)
        [System.IO.File]::WriteAllText($FilePath, $content, [System.Text.Encoding]::UTF8)
        Write-Host "  已转换: $FilePath" -ForegroundColor Green
    } catch {
        Write-Host "  转换失败: $FilePath" -ForegroundColor Red
    }
}

# 检查并记录非 UTF-8 编码的文件
$nonUTF8Files = @()

foreach ($fileType in $fileTypes) {
    $files = Get-ChildItem -Path $projectRoot -Recurse -Include $fileType -Exclude "node_modules", "dist", "build", ".git" | Where-Object { $_.FullName -notlike "*node_modules*" }
    
    foreach ($file in $files) {
        $encoding = Check-FileEncoding -FilePath $file.FullName
        if ($encoding -ne "UTF-8" -and $encoding -ne "UTF-8 with BOM") {
            $relativePath = Resolve-Path -Path $file.FullName -Relative
            Write-Host "  $relativePath : $encoding" -ForegroundColor Red
            $nonUTF8Files += $file.FullName
        }
    }
}

Write-Host ""
if ($nonUTF8Files.Count -eq 0) {
    Write-Host "所有文件都已使用 UTF-8 编码。" -ForegroundColor Green
} else {
    Write-Host "发现 $($nonUTF8Files.Count) 个非 UTF-8 编码的文件。" -ForegroundColor Red
    Write-Host ""
    
    $confirmation = Read-Host "是否要将这些文件转换为 UTF-8 编码？(y/N)"
    if ($confirmation -eq 'y' -or $confirmation -eq 'Y') {
        Write-Host ""
        Write-Host "2. 转换文件编码为 UTF-8..." -ForegroundColor Yellow
        Write-Host ""
        
        foreach ($file in $nonUTF8Files) {
            Convert-ToUTF8 -FilePath $file
        }
        
        Write-Host ""
        Write-Host "文件编码转换完成！" -ForegroundColor Green
    } else {
        Write-Host "操作已取消。" -ForegroundColor Yellow
    }
}

Write-Host ""
Write-Host "检查和转换完成。" -ForegroundColor Green
Write-Host "按任意键退出..."
$host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")