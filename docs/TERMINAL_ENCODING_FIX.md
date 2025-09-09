# 终端输出乱码问题解决方案

## 问题描述

在Windows系统上运行批处理脚本时，终端输出中文出现乱码，主要原因是：
1. Windows默认使用GBK编码（代码页936）
2. 脚本中的中文字符使用UTF-8编码
3. 编码不匹配导致显示乱码

## 解决方案

### 1. 在批处理脚本中设置UTF-8编码

在每个批处理脚本的开头添加以下命令：
```batch
@echo off
chcp 65001 >nul
```

这会将代码页切换到UTF-8（65001），从而正确显示中文字符。

### 2. 已更新的脚本列表

以下脚本已添加UTF-8编码支持：
- [scripts/auto-format-and-lint.bat](file:///e:/YSY/UG/scripts/auto-format-and-lint.bat)
- [scripts/auto-type-check.bat](file:///e:/YSY/UG/scripts/auto-type-check.bat)
- [scripts/auto-build.bat](file:///e:/YSY/UG/scripts/auto-build.bat)
- [scripts/auto-dev-server.bat](file:///e:/YSY/UG/scripts/auto-dev-server.bat)
- [scripts/auto-fix-errors.bat](file:///e:/YSY/UG/scripts/auto-fix-errors.bat)

### 3. VS Code终端配置

项目中的VS Code配置已设置为使用CMD作为默认终端：
```json
"terminal.integrated.defaultProfile.windows": "Command Prompt"
```

## 验证方法

创建了测试脚本 [scripts/test-encoding.bat](file:///e:/YSY/UG/scripts/test-encoding.bat) 来验证编码设置是否正确：
```batch
@echo off
chcp 65001 >nul
echo 测试中文输出是否正常显示
echo 如果能看到这段中文说明编码设置正确
echo 英文字符 should also display normally
pause
```

## 注意事项

1. 所有新创建的批处理脚本都应包含 `chcp 65001 >nul` 命令
2. 确保脚本文件本身以UTF-8编码保存
3. 如果在其他环境中运行脚本，可能需要调整编码设置

## 相关配置文件

- [.vscode/settings.json](file:///e:/YSY/UG/.vscode/settings.json) - VS Code终端配置
- [scripts/test-encoding.bat](file:///e:/YSY/UG/scripts/test-encoding.bat) - 编码测试脚本