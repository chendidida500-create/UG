# Umi 4 项目依赖问题完整修复指南

## 问题概述

在 Umi 4 项目中，我们发现了多个配置问题，这些问题可能导致依赖安装失败和模块找不到错误：

1. **致命依赖冲突**：同时存在 `@umijs/max` 和 `umi` 依赖
2. **测试库版本不兼容**：`@testing-library/react` v16 与 React 18 不兼容
3. **版本锁定过于严格**：React 和 React DOM 使用固定版本而非允许补丁更新
4. **无用字段**：存在不应提交到版本库的内部状态字段

## 已执行的修复措施

### 1. 移除重复依赖

- ✅ 已移除多余的 `umi` 依赖项
- 确保项目只依赖 `@umijs/max`，避免版本冲突

### 2. 更新测试库版本

- ✅ 将 `@testing-library/react` 从 `^16.3.0` 更新为 `^14.0.0`
- 确保与 React 18 兼容

### 3. 允许 React 补丁更新

- ✅ 将 `react` 从 `18.3.1` 更新为 `^18.3.1`
- ✅ 将 `react-dom` 从 `18.3.1` 更新为 `^18.3.1`
- 允许安装安全补丁版本

### 4. 清理无用字段

- ✅ 移除了 `__npminstall_done` 字段

## 修复后的依赖配置

```json
{
  "dependencies": {
    "@ant-design/icons": "^6.0.1",
    "@ant-design/pro-components": "^2.6.43",
    "@umijs/max": "4.4.12",
    "ahooks": "^3.7.8",
    "antd": "^5.8.6",
    "axios": "^1.5.0",
    "dayjs": "^1.11.9",
    "lodash": "^4.17.21",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.8.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.6.1",
    "@types/jest": "^30.0.0",
    "@types/lodash": "^4.14.197",
    "@types/node": "^20.14.0",
    "@types/react": "18.3.24",
    "@types/react-dom": "18.3.1",
    "@typescript-eslint/eslint-plugin": "^8.42.0",
    "@typescript-eslint/parser": "^8.42.0",
    "cspell": "^9.2.1",
    "eslint": "^9.35.0",
    "eslint-config-prettier": "^10.1.8",
    "eslint-plugin-prettier": "^5.0.0",
    "eslint-plugin-react": "^7.33.2",
    "eslint-plugin-react-hooks": "^5.2.0",
    "jest-environment-jsdom": "^30.1.2",
    "prettier": "^3.0.3"
  }
}
```

## 自动化修复脚本

我们提供了 [scripts/fix-umi-dependencies.bat](file://e:/YSY/UG/scripts/fix-umi-dependencies.bat) 脚本来自动化执行以下操作：

1. 备份当前配置文件
2. 清理依赖目录和锁文件
3. 清理 pnpm 缓存
4. 重新安装依赖

## 验证修复结果

运行以下命令验证项目是否能正常启动：

```bash
pnpm dev
```

如果项目能成功编译并启动，说明所有问题已解决。

## 最佳实践建议

1. **避免重复依赖**：确保项目中不要同时包含 `@umijs/max` 和 `umi`
2. **保持版本兼容性**：定期检查依赖版本兼容性，特别是测试库与主框架的兼容性
3. **允许补丁更新**：对稳定依赖使用 `^` 版本号允许安全补丁更新
4. **定期清理缓存**：定期清理包管理器缓存以避免潜在问题
