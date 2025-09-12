# UmiJS 依赖问题修复文档

## 问题描述

在启动 UmiJS 开发服务器时，遇到以下错误：

```
Error: Cannot find module '@umijs/utils'
```

## 问题分析

经过分析，发现项目中缺少了一些关键的 UmiJS 相关依赖：

1. 缺少 `@umijs/plugins`：这是 UmiJS 的插件集，包含了许多核心功能（如 dva、layout 等）
2. 缺少 `@umijs/utils`：这是 UmiJS 的工具库，许多插件都依赖它
3. 版本不一致问题：即使安装了这些依赖，也需要确保版本与 `@umijs/max` 一致

## 解决方案

### 1. 添加缺失的依赖

在 `frontend/package.json` 中添加以下依赖：

```json
{
  "dependencies": {
    "@umijs/max": "4.4.12",
    "@umijs/plugins": "4.4.12"
    // 其他现有依赖...
  },
  "devDependencies": {
    "@umijs/utils": "4.4.12"
    // 其他现有开发依赖...
  }
}
```

### 2. 安装缺失的依赖

```bash
# 进入前端目录
cd frontend

# 安装缺失的依赖
pnpm add @umijs/plugins@4.4.12
pnpm add @umijs/utils@4.4.12 --save-dev

# 或者一次性安装所有缺失的依赖
pnpm add @umijs/plugins@4.4.12 @umijs/utils@4.4.12 --save-dev
```

### 3. 在项目根目录安装 @umijs/utils

由于 `@umijs/plugins` 依赖于 `@umijs/utils`，而插件是在项目根目录被加载的，所以我们还需要在项目根目录安装 `@umijs/utils`：

```bash
# 在项目根目录执行
pnpm add @umijs/utils@4.4.12 -w
```

### 4. 清理缓存并重新安装（可选）

为确保所有依赖正确安装，建议清理缓存并重新安装：

```bash
# 删除 yarn 相关文件（如果存在）
rmdir /s /q .yarn 2>nul & del /f yarn.lock .yarnrc.yml 2>nul

# 清理 pnpm 缓存
pnpm store prune

# 重新安装依赖
pnpm install
```

## 验证修复

完成上述更改后，尝试启动开发服务器：

```bash
# 在 frontend 目录运行
pnpm dev
```

如果一切正常，您现在应该能够成功启动 UmiJS 开发服务器，而不会遇到 "Cannot find module '@umijs/utils'" 错误。

## 额外建议

1. 考虑添加更多 TypeScript 类型定义：

   ```bash
   pnpm add @types/node @types/react @types/react-dom --save-dev
   ```

2. 检查 UmiJS 配置：
   确保您的 `config/config.ts` 或 `.umirc.ts` 配置正确，特别是插件配置。

3. 验证 Node.js 版本兼容性：
   虽然项目指定了 Node.js 20.19.0，但确保它与 UmiJS 4.4.12 完全兼容。
