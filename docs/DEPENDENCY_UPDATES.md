# 依赖更新日志

本文档记录了项目依赖的更新历史和解决的警告问题。

## 2025-09-07

### 解决的警告问题

1. **concurrently 命令未找到问题**
   - 问题：在 Windows 环境下使用 `concurrently` 命令时出现 "命令未找到" 错误
   - 解决方案：将 `package.json` 中的并行执行命令从 `concurrently "cmd1" "cmd2"` 更改为 `cmd1 & cmd2`
   - 影响文件：[package.json](file:///e:/YSY/UG/package.json)

2. **过时依赖包警告**
   - 问题：安装依赖时显示多个依赖包版本过时的警告
   - 解决方案：更新所有过时的依赖包到最新稳定版本
   - 影响文件：
     - [package.json](file:///e:/YSY/UG/package.json) (根目录)
     - [frontend/package.json](file:///e:/YSY/UG/frontend/package.json)
     - [backend/package.json](file:///e:/YSY/UG/backend/package.json)
     - [reinstall-deps.bat](file:///e:/YSY/UG/reinstall-deps.bat)
     - [docs/DEVELOPMENT.md](file:///e:/YSY/UG/docs/DEVELOPMENT.md)

### 更新的依赖包

#### 根目录依赖

- `@types/node`: 从 20.19.13 更新到 24.3.1
- `concurrently`: 从 8.2.2 更新到 9.2.1
- `rimraf`: 从 5.0.10 更新到 6.0.1

#### 前端依赖

- `@ant-design/icons`: 从 5.6.1 更新到 6.0.1
- `@types/react`: 18.3.24
- `@types/react-dom`: 18.3.1
- `@typescript-eslint/eslint-plugin`: 从 6.21.0 更新到 8.42.0
- `@typescript-eslint/parser`: 从 6.21.0 更新到 8.42.0
- `eslint`: 从 8.57.1 更新到 9.35.0
- `eslint-config-prettier`: 从 9.1.2 更新到 10.1.8
- `eslint-plugin-react-hooks`: 从 4.6.2 更新到 5.2.0
- `react`: 18.3.1
- `react-dom`: 18.3.1

#### 后端依赖

- `bcryptjs`: 从 2.4.3 更新到 3.0.2
- `egg-bin`: 从 5.19.0 更新到 6.13.0
- `egg-cors`: 从 2.2.4 更新到 3.0.1
- `egg-scripts`: 从 2.17.0 更新到 3.1.0
- `eslint`: 从 8.57.1 更新到 9.35.0
- `eslint-config-egg`: 从 13.1.0 更新到 14.1.0
- `uuid`: 从 9.0.1 更新到 12.0.0

### 兼容性检查

所有更新的依赖包都经过兼容性检查，确保与以下技术栈兼容：

- Node.js 20.19.0
- UMI 4.x
- Egg.js 3.x
- React 18.3.1
- TypeScript 5.9.2

### 后续维护建议

1. 定期运行 `pnpm outdated` 检查依赖更新
2. 在更新依赖前检查其与项目技术栈的兼容性
3. 更新依赖后进行全面测试，确保功能正常
4. 记录重大依赖更新及其影响