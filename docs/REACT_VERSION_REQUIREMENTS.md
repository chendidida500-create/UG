# React 版本要求规范

本文档详细说明了 UG 管理系统项目中 React 的版本要求和相关配置。

## 版本要求

### React 核心库

- **React**: 18.3.1
- **React DOM**: 18.3.1
- **@types/react**: 18.3.1
- **@types/react-dom**: 18.3.1

## 版本选择依据

### 1. 技术栈兼容性

项目基于以下技术栈，React 18.3.1 与这些技术完全兼容：

- **UMI 4.4.12**: 官方支持 React 18.x
- **Ant Design 5.8.6**: 完全支持 React 18.x
- **TypeScript 5.9.2**: 提供完整的 React 18 类型定义支持

### 2. 功能特性

React 18.3.1 提供了以下重要特性：

- **自动批处理**: 自动批处理状态更新以提高性能
- **新的 Root API**: 使用 createRoot 替代 ReactDOM.render
- **Suspense 改进**: 更好的组件懒加载支持
- **严格模式增强**: 更好的开发体验和错误检测

### 3. 稳定性和安全性

- 18.3.1 是 React 18.x 系列的稳定版本
- 包含了重要的安全修复和性能优化
- 经过了充分的测试和社区验证

## 配置文件位置

### package.json 配置

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "devDependencies": {
    "@types/react": "18.3.1",
    "@types/react-dom": "18.3.1"
  }
}
```

### 项目文件

- **前端配置**: [frontend/package.json](file:///e:/YSY/UG/frontend/package.json)
- **版本检查脚本**: [tools/check-versions.bat](file:///e:/YSY/UG/tools/check-versions.bat)
- **依赖报告**: [docs/DEPENDENCY_VERSION_REPORT.md](file:///e:/YSY/UG/docs/DEPENDENCY_VERSION_REPORT.md)

## 版本锁定机制

为了确保项目的一致性和稳定性，采用了以下版本锁定机制：

### 1. package.json 配置

- **React 和 React DOM**: 使用 `^18.3.1` 允许小版本更新
- **类型定义包**: 使用精确版本 `18.3.1` 确保类型一致性

### 2. 根目录依赖管理

通过根目录 [package.json](file:///e:/YSY/UG/package.json) 的 `resolutions` 和 `overrides` 字段确保依赖版本一致性：

```json
{
  "resolutions": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  },
  "overrides": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
```

## 版本验证

### 自动化检查

项目提供了版本检查脚本，可以验证当前环境是否符合要求：

```cmd
cd e:\YSY\UG
tools\check-versions.bat
```

### 手动验证

可以通过以下命令手动验证版本：

```bash
# 检查 React 版本
pnpm list react

# 检查 React DOM 版本
pnpm list react-dom

# 检查类型定义版本
pnpm list @types/react
pnpm list @types/react-dom
```

## 升级指南

### 升级流程

如果需要升级 React 版本，必须遵循以下流程：

1. **评估必要性**: 确定升级的原因和收益
2. **兼容性测试**: 测试新版本与现有代码的兼容性
3. **团队评审**: 组织团队评审升级的影响
4. **灰度发布**: 先在测试环境部署验证
5. **文档更新**: 更新相关文档说明

### 注意事项

1. 升级 React 版本时，必须同时升级 `@types/react` 和 `@types/react-dom`
2. 确保所有依赖库与新版本 React 兼容
3. 全面测试应用功能，特别是与 React 特性相关的部分
4. 更新所有相关文档和配置文件

## 常见问题

### 1. 版本不匹配错误

**问题**: 出现版本不匹配的错误信息
**解决方案**: 
- 检查 [package.json](file:///e:/YSY/UG/frontend/package.json) 中的版本配置
- 清理 node_modules 并重新安装依赖
- 确保所有工作区使用相同版本

### 2. 类型定义缺失

**问题**: TypeScript 报告找不到 React 类型定义
**解决方案**:
- 确保安装了正确的 `@types/react` 和 `@types/react-dom` 版本
- 检查 tsconfig.json 配置
- 重启 TypeScript 服务

### 3. 运行时错误

**问题**: 应用运行时出现与 React 相关的错误
**解决方案**:
- 检查 React 和 React DOM 版本是否一致
- 确认没有混用不同版本的 React
- 检查是否有第三方库引入了不同版本的 React

## 相关文档

- [VERSION_REQUIREMENTS.md](VERSION_REQUIREMENTS.md) - 项目版本要求
- [DEPENDENCY_VERSION_REPORT.md](DEPENDENCY_VERSION_REPORT.md) - 依赖版本报告
- [VERSION_UPGRADE_GUIDE.md](VERSION_UPGRADE_GUIDE.md) - 版本升级指南
- [DEPENDENCY_MANAGEMENT.md](DEPENDENCY_MANAGEMENT.md) - 依赖管理规范