# 项目字符编码标准

本文档说明了 UG 管理系统项目中所有文件的字符编码标准。

## 编码标准

项目中所有文件必须使用 **UTF-8** 编码，不带 BOM（字节顺序标记）。

## 适用范围

以下所有类型的文件都必须使用 UTF-8 编码：

1. **源代码文件**
   - JavaScript 文件 (.js, .jsx)
   - TypeScript 文件 (.ts, .tsx)
   - JSON 配置文件 (.json)
   - YAML 配置文件 (.yml, .yaml)

2. **文档文件**
   - Markdown 文件 (.md)
   - 文本文件 (.txt)
   - HTML 文件 (.html)
   - CSS 文件 (.css)

3. **配置文件**
   - 环境配置文件 (.env, .env.\*)
   - Git 配置文件 (.gitignore, .gitattributes)
   - 编辑器配置文件 (.editorconfig)
   - 其他配置文件

4. **脚本文件**
   - Shell 脚本 (.sh)
   - 批处理脚本 (.bat, .cmd)

## 编码检查方法

### 1. 使用编辑器检查

大多数现代编辑器都可以显示和更改文件编码：

- **VS Code**: 在右下角状态栏显示当前编码，点击可更改
- **WebStorm**: 在右下角状态栏显示当前编码，点击可更改
- **Notepad++**: 在编码菜单中可以查看和更改编码

### 2. 使用命令行工具检查

在 Windows 上可以使用以下命令检查文件编码：

```cmd
file -i filename
```

### 3. 使用 PowerShell 检查

```powershell
Get-Content -Path filename -Encoding Byte -TotalCount 3
```

## 编码转换方法

### 1. 使用 VS Code 转换

1. 在 VS Code 中打开文件
2. 点击右下角的编码显示（如 "UTF-8"）
3. 选择 "Save with Encoding"
4. 选择 "UTF-8"

### 2. 使用 Notepad++ 转换

1. 在 Notepad++ 中打开文件
2. 点击 "编码" 菜单
3. 选择 "转换为 UTF-8 编码"
4. 保存文件

### 3. 使用 PowerShell 转换

```powershell
Get-Content -Path "input.txt" | Set-Content -Path "output.txt" -Encoding UTF8
```

## 编辑器配置

项目根目录包含 [.editorconfig](file:///e:/YSY/UG/.editorconfig) 文件，其中定义了编码标准：

```ini
[*.md]
charset = utf-8

[*.{js,jsx,ts,tsx,json,yml,yaml,html,css}]
charset = utf-8

[*.{sh,bat,cmd}]
charset = utf-8
```

建议使用支持 EditorConfig 的编辑器，以自动应用这些设置。

## Git 配置

为确保 Git 正确处理 UTF-8 编码文件，请在 Git 配置中添加以下设置：

```bash
git config --global core.autocrlf false
git config --global core.safecrlf false
git config --global i18n.commitEncoding utf-8
git config --global i18n.logOutputEncoding utf-8
```

## 常见问题

### 1. 中文显示乱码

如果文件中的中文显示乱码，通常是因为文件编码不是 UTF-8。请按照上述方法转换文件编码。

### 2. 特殊字符显示异常

某些特殊字符在非 UTF-8 编码中可能显示异常。确保所有文件都使用 UTF-8 编码。

### 3. Git 提交中的乱码

如果在 Git 提交历史中看到乱码，检查 Git 的编码配置是否正确。

## 验证脚本

项目提供了编码检查脚本，可以验证文件编码是否符合要求：

```cmd
cd e:\YSY\UG
tools\check-encoding.bat
```

## 注意事项

1. 所有团队成员都应使用支持 UTF-8 编码的编辑器
2. 在创建新文件时，确保使用 UTF-8 编码
3. 在修改现有文件时，保持原有的 UTF-8 编码
4. 定期检查文件编码，确保一致性
5. 在跨平台开发时特别注意编码问题
