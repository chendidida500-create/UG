# Umi 4 特定问题排查与修复指南

## 问题概述

在 Umi 4 项目中，我们发现了以下特定问题：

1. **重复依赖冲突**：项目中同时存在 `@umijs/max` 和 `umi` 依赖，导致冲突
2. **MFSU 兼容性问题**：在某些复杂依赖环境下，MFSU 可能导致构建问题

## 已执行的修复措施

### 1. 修复重复依赖问题

我们已经移除了 [frontend/package.json](file://e:/YSY/UG/frontend/package.json) 中多余的 `"umi"` 依赖项，确保项目只使用 `@umijs/max`。

**修复前**：

```json
"dependencies": {
  "@umijs/max": "4.4.12",
  "umi",  // ❌ 多余的依赖项
  "ahooks": "^3.7.8"
}
```

**修复后**：

```json
"dependencies": {
  "@umijs/max": "4.4.12",
  "ahooks": "^3.7.8"
}
```

### 2. MFSU 配置选项

项目当前的 MFSU 配置：

```typescript
mfsu: {
  strategy: 'normal',
  mfName: 'mf',
  cacheDirectoryPath: './node_modules/.cache/mfsu',
}
```

## 排查和调试脚本

我们提供了以下脚本来帮助排查和解决 Umi 4 特定问题：

### 1. 禁用 MFSU 进行测试

如果遇到构建问题，可以运行以下脚本临时禁用 MFSU：

```bash
scripts\debug-umi-mfsu.bat
```

该脚本会：

1. 备份当前配置
2. 创建禁用 MFSU 的配置版本
3. 重新安装依赖
4. 提供恢复原始配置的方法

### 2. 恢复原始配置

如果禁用 MFSU 后问题解决，说明问题与 MFSU 相关，可以恢复原始配置并尝试以下方案：

1. 更新 Umi 到最新版本
2. 检查特定插件的兼容性
3. 清理 MFSU 缓存：删除 `node_modules/.cache/mfsu` 目录

## 最佳实践建议

1. **避免重复依赖**：确保项目中不要同时包含 `@umijs/max` 和 `umi`
2. **定期更新依赖**：保持 Umi 和相关插件版本更新
3. **MFSU 使用建议**：
   - 默认启用以提升编译速度
   - 遇到问题时可临时禁用进行调试
   - 定期清理 MFSU 缓存目录

## 相关文件

- 配置文件：[frontend/.umirc.ts](file://e:/YSY/UG/frontend/.umirc.ts)
- 依赖配置：[frontend/package.json](file://e:/YSY/UG/frontend/package.json)
- 调试脚本：[scripts/debug-umi-mfsu.bat](file://e:/YSY/UG/scripts/debug-umi-mfsu.bat)
