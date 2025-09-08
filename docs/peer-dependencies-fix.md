# 项目 peerDependencies 冲突解决方案

## 问题描述

在项目安装依赖时，发现存在 peerDependencies 冲突问题，主要体现在：

1. **antd 版本冲突**：

   - @umijs/max@4.4.12 要求 antd@^4.20.6
   - 项目中使用 antd@^5.8.6

2. **eslint 版本冲突**：
   - @umijs/max@4.4.12 要求 eslint@8.35.0
   - 项目中使用 eslint@^9.35.0

## 解决方案

### 1. 使用 pnpm 的 overrides 和 resolutions 配置

在根目录的 `package.json` 中添加以下配置：

```json
"resolutions": {
  "undici": "^5.28.4",
  "antd": "^5.8.6",
  "eslint": "^9.35.0"
},
"overrides": {
  "undici": "^5.28.4",
  "antd": "^5.8.6",
  "eslint": "^9.35.0"
}
```

这些配置告诉 pnpm 忽略子依赖的版本要求，强制使用项目中指定的版本。

### 2. 依赖清理和重新安装

执行以下命令清理并重新安装依赖：

```bash
# 清理现有依赖
pnpm clean

# 重新安装依赖
pnpm install --force
```

## 验证方法

可以通过以下命令验证依赖是否正确安装：

```bash
pnpm list @umijs/max antd eslint
```

## 注意事项

1. 使用 overrides 和 resolutions 可能导致某些功能不兼容，需要进行充分测试
2. 建议定期检查是否有新的 @umijs/max 版本支持当前的 antd 和 eslint 版本
3. 如果遇到运行时错误，可能需要调整版本或寻找替代方案

## 相关脚本

项目中已添加以下脚本用于处理 peerDependencies 冲突：

- `scripts/fix-peer-dependencies.bat`：自动化修复脚本
