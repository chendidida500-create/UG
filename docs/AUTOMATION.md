# 自动化功能指南

本文档详细说明了UG管理系统中提供的各种自动化功能和脚本。

## 概述

UG管理系统提供了一系列自动化脚本和VS Code任务，以简化开发流程、提高开发效率并确保代码质量。这些自动化功能涵盖了从环境设置到代码检查、构建和部署的整个开发周期。

## 自动化脚本

### 构建和编译

#### auto-build.bat

自动构建整个项目，包括前端和后端：

```bash
scripts\auto-build.bat
```

该脚本会：

1. 进入前端目录并执行构建
2. 进入后端目录并执行TypeScript编译检查

#### auto-dev-server.bat

启动开发服务器：

```bash
scripts\auto-dev-server.bat
```

该脚本会同时启动前端和后端开发服务器。

### 代码质量

#### auto-format-and-lint.bat

自动格式化代码并执行ESLint检查：

```bash
scripts\auto-format-and-lint.bat
```

#### auto-type-check.bat

自动执行TypeScript类型检查：

```bash
scripts\auto-type-check.bat
```

### 环境设置

#### setup-environment.bat

设置开发环境：

```bash
scripts\setup-environment.bat
```

该脚本会安装所有必需的依赖项。

#### init-database.bat

初始化数据库：

```bash
scripts\init-database.bat
```

### 问题修复

#### fix-typescript-issues.bat

修复常见的TypeScript问题：

```bash
scripts\fix-typescript-issues.bat
```

#### fix-frontend-types.bat

修复前端类型问题：

```bash
scripts\fix-frontend-types.bat
```

#### fix-frontend-typings.bat

修复前端类型声明问题：

```bash
scripts\fix-frontend-typings.bat
```

#### fix-umi-config.bat

修复UMI配置问题：

```bash
scripts\fix-umi-config.bat
```

### 诊断和分析

#### diagnostic-checks.bat

执行诊断检查：

```bash
scripts\diagnostic-checks.bat
```

#### performance-analysis.bat

执行性能分析：

```bash
scripts\performance-analysis.bat
```

#### api-tests.bat

执行API接口测试：

```bash
scripts\api-tests.bat
```

#### security-scan.bat

执行安全扫描：

```bash
scripts\security-scan.bat
```

#### spellcheck.bat

执行拼写检查：

```bash
scripts\spellcheck.bat
```

### 其他实用脚本

#### refresh-vscode-window.bat

刷新VS Code窗口以解决缓存问题：

```bash
scripts\refresh-vscode-window.bat
```

#### clean-and-rebuild.bat

清理并重新构建项目：

```bash
scripts\clean-and-rebuild.bat
```

## VS Code 任务

项目配置了多种VS Code任务，可通过以下方式运行：

1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入并选择 `Tasks: Run Task`
3. 选择相应的任务

可用的任务包括：

- 自动格式化和检查
- 自动类型检查
- 自动构建项目
- 启动开发服务器
- 环境设置
- 数据库初始化
- 诊断检查
- 性能分析
- API 接口测试
- 安全扫描
- 拼写检查
- 终端编码测试
- 修复 TypeScript 问题
- 修复前端类型问题
- 刷新 VS Code 窗口
- 清理和重建项目
- 修复前端类型声明
- 修复 UMI 配置

## 最佳实践

1. **日常开发**：在日常开发中，使用自动化脚本可以显著提高效率
2. **代码提交前**：在提交代码前，运行 `auto-format-and-lint.bat` 和 `auto-type-check.bat` 确保代码质量
3. **问题排查**：遇到常见问题时，优先使用对应的修复脚本
4. **环境一致性**：团队成员应使用相同的自动化脚本来确保环境一致性

## 自定义自动化

可以根据项目需求创建自定义的自动化脚本，建议：

1. 将脚本放置在 `scripts` 目录下
2. 使用 `.bat` 扩展名以确保在Windows环境下兼容性
3. 添加清晰的注释说明脚本功能
4. 在README.md和相关文档中添加说明
