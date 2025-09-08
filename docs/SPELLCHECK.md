# 拼写检查指南

本文档说明如何在项目中使用拼写检查功能。

## 概述

项目使用 [cspell](https://cspell.org/) 进行拼写检查，以确保代码和文档中的单词拼写正确。

## 配置文件

项目在以下位置包含 cspell 配置文件：

1. 根目录: [cspell.json](file:///e:/YSY/UG/cspell.json) - 全局配置
2. 前端: [frontend/cspell.json](file:///e:/YSY/UG/frontend/cspell.json) - 前端特定配置
3. 后端: [backend/cspell.json](file:///e:/YSY/UG/backend/cspell.json) - 后端特定配置

## 运行拼写检查

### 使用 npm 脚本

```bash
pnpm spellcheck
```

这个命令会检查前端和后端源代码文件中的拼写错误。

### 手动运行

```bash
# 检查所有源文件
npx cspell "frontend/src/**/*.{js,ts,jsx,tsx,json,md}" "backend/app/**/*.{js,ts,json,md}" "backend/config/**/*.{js,ts,json,md}" --exclude "node_modules" --exclude "dist" --exclude "logs" --exclude "run" --exclude "coverage" --exclude ".umi" --exclude ".umi-production"

# 检查特定文件
npx cspell "**/*.md"
```

### 使用批处理脚本

项目还包含一个 Windows 批处理脚本：

```bash
scripts\spellcheck.bat
```

## 添加新词汇

如果遇到合法但被标记为拼写错误的单词，需要将其添加到相应的配置文件中：

1. 技术术语或项目特定词汇：添加到对应目录的 `cspell.json` 文件的 `words` 数组中
2. 第三方库或框架特定词汇：添加到根目录的 `cspell.json` 文件中

例如，在 `frontend/cspell.json` 中添加：

```json
{
  "words": ["existingword", "newword"]
}
```

## 忽略特定文件或目录

在 `cspell.json` 的 `ignorePaths` 数组中添加要忽略的文件或目录：

```json
{
  "ignorePaths": ["node_modules/**", "dist/**", "logs/**", "new-directory/**"]
}
```

## 最佳实践

1. 定期运行拼写检查，特别是在提交代码之前
2. 将新词汇添加到配置文件中，而不是禁用拼写检查
3. 保持配置文件的整洁，定期清理不再使用的词汇
4. 对于特定领域的术语，确保团队成员了解其含义

## 故障排除

### 'cspell' 不是内部或外部命令

如果遇到此错误，请确保已安装 cspell：

```bash
pnpm add -D -w cspell
```

### 拼写检查速度慢

如果拼写检查速度较慢，可以考虑：

1. 检查是否包含了不必要的大文件
2. 更新 `.gitignore` 和 `ignorePaths` 配置以排除更多文件
3. 使用更具体的文件模式而不是通配符

## 相关资源

- [cspell 官方文档](https://cspell.org/)
- [配置选项说明](https://cspell.org/configuration/)
