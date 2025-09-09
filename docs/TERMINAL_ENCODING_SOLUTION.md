# Windows终端编码问题完整解决方案

## 问题分析

在Windows系统上运行批处理脚本时，终端输出中文出现乱码，主要原因包括：
1. Windows默认使用GBK编码（代码页936）
2. 脚本中的中文字符使用UTF-8编码
3. VS Code集成终端的特殊处理方式
4. 特殊字符在批处理脚本中的转义问题

## 解决方案

### 1. 批处理脚本编码设置

所有批处理脚本(.bat)文件必须包含以下代码：
```batch
@echo off
chcp 65001 >nul 2>&1
```

参数说明：
- `chcp 65001`：将代码页切换到UTF-8
- `>nul 2>&1`：隐藏命令执行的输出和错误信息

### 2. 特殊字符处理

在批处理脚本中避免使用可能导致问题的特殊字符：
- 使用 `......` 替代 `……`
- 使用 `^|` 替代 `|`（管道符需要转义）
- 避免在echo语句中使用连续的特殊符号

### 3. VS Code终端配置

在 [.vscode/settings.json](file:///e:/YSY/UG/.vscode/settings.json) 中配置终端启动参数：
```json
"terminal.integrated.profiles.windows": {
  "PowerShell": {
    "source": "PowerShell",
    "icon": "terminal-powershell"
  },
  "Command Prompt": {
    "path": [
      "${env:windir}\\Sysnative\\cmd.exe",
      "${env:windir}\\System32\\cmd.exe"
    ],
    "args": ["/K", "chcp 65001 >nul && cls"],
    "icon": "terminal-cmd"
  },
  "Git Bash": {
    "source": "Git Bash"
  }
}
```

### 4. PowerShell脚本编码支持

对于PowerShell脚本(.ps1)，使用以下编码设置：
```powershell
# 设置UTF-8编码
$OutputEncoding = New-Object -typename System.Text.UTF8Encoding
[Console]::OutputEncoding = New-Object -typename System.Text.UTF8Encoding
[Console]::InputEncoding = New-Object -typename System.Text.UTF8Encoding
```

### 5. 脚本优化建议

- 使用 `cls` 命令清屏以获得更好的显示效果
- 使用 `pause >nul` 隐藏按任意键继续的提示文字
- 对于长环境变量输出，使用 `%VAR:~0,50%` 限制显示长度

## 已更新的脚本列表

以下脚本已应用完整的编码解决方案：
- [scripts/auto-format-and-lint.bat](file:///e:/YSY/UG/scripts/auto-format-and-lint.bat)
- [scripts/auto-type-check.bat](file:///e:/YSY/UG/scripts/auto-type-check.bat)
- [scripts/auto-build.bat](file:///e:/YSY/UG/scripts/auto-build.bat)
- [scripts/auto-dev-server.bat](file:///e:/YSY/UG/scripts/auto-dev-server.bat)
- [scripts/auto-fix-errors.bat](file:///e:/YSY/UG/scripts/auto-fix-errors.bat)
- [scripts/comprehensive-encoding-test.bat](file:///e:/YSY/UG/scripts/comprehensive-encoding-test.bat)
- [scripts/test-encoding.ps1](file:///e:/YSY/UG/scripts/test-encoding.ps1) (PowerShell版本)

## 验证方法

运行 [scripts/comprehensive-encoding-test.bat](file:///e:/YSY/UG/scripts/comprehensive-encoding-test.bat) 脚本验证编码设置是否正确。

## 注意事项

1. 所有脚本文件必须以UTF-8编码保存
2. 在脚本中谨慎使用特殊符号和中文标点
3. 对于复杂脚本，建议先在独立的CMD窗口中测试
4. 如果仍然出现乱码，可以尝试重启VS Code或Windows终端服务

## 参考文档

- [TERMINAL_ENCODING_FIX.md](file:///e:/YSY/UG/docs/TERMINAL_ENCODING_FIX.md) - 基础编码问题解决方案
- [Windows终端编码问题解决规范](file:///e:/YSY/UG/) - 项目规范文档