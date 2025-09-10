# 解决 "找不到模块 egg 或其相应的类型声明" 错误

## 问题描述

在开发 UG 项目时，TypeScript 编译器报告以下错误：

```
找不到模块"egg"或其相应的类型声明。ts(2307)
```

该错误出现在 [backend/app.ts](file:///e:/YSY/UG/backend/app.ts) 文件中：

```typescript
import { Application } from "egg";
```

## 错误原因分析

这个错误通常由以下几种情况引起：

1. **依赖未安装**：项目依赖尚未通过包管理器安装
2. **包管理器问题**：使用的包管理器与项目配置不匹配
3. **类型声明缺失**：缺少对应的 TypeScript 类型声明文件
4. **模块解析配置问题**：TypeScript 配置不正确，无法正确解析模块

## 解决方案

### 方案一：使用自动化脚本（推荐）

项目中已提供自动化脚本来解决此问题：

1. 在 VS Code 中按下 `Ctrl+Shift+P` 打开命令面板
2. 输入并选择 `Tasks: Run Task`
3. 选择 `安装后端依赖` 任务
4. 等待脚本执行完成

或者直接运行脚本文件：

```
scripts/setup-backend-dependencies.bat
```

### 方案二：手动安装依赖

1. 确保已安装 Node.js (版本 20.19.0) 和 pnpm (版本 8.15.8)
2. 在项目根目录执行依赖安装命令：
   ```bash
   cd e:\YSY\UG
   pnpm install
   ```

### 方案三：单独安装 egg 类型声明

如果依赖安装后仍有问题，可以尝试单独安装类型声明：

```bash
cd e:\YSY\UG\backend
pnpm add -D @types/egg
```

## 验证修复

安装完成后：

1. 重新加载 VS Code 窗口（`Ctrl+Shift+P` → `Developer: Reload Window`）
2. 检查 [backend/app.ts](file:///e:/YSY/UG/backend/app.ts) 文件中的错误是否消失
3. 如果仍有问题，重启 TypeScript 服务（`Ctrl+Shift+P` → `TypeScript: Restart TS Server`）

## 预防措施

1. 在克隆新项目后，首先运行依赖安装命令
2. 确保使用项目指定的包管理器（pnpm）和版本
3. 定期更新依赖以保持兼容性

## 相关文件

- [backend/package.json](file:///e:/YSY/UG/backend/package.json) - 后端依赖配置
- [backend/app.ts](file:///e:/YSY/UG/backend/app.ts) - 出现错误的文件
- [scripts/setup-backend-dependencies.bat](file:///e:/YSY/UG/scripts/setup-backend-dependencies.bat) - 自动化安装脚本
- [.vscode/tasks.json](file:///e:/YSY/UG/.vscode/tasks.json) - VS Code 任务配置
