# PNPM 迁移指南

本文档说明了如何将项目从其他包管理器迁移到 Umi 官方推荐的 pnpm。

## 为什么选择 pnpm？

1. **速度快**: pnpm 比 npm 快 2 倍
2. **节省磁盘空间**: 通过硬链接和符号链接减少重复包的存储
3. **兼容性好**: 与 npm 完全兼容，无需修改代码
4. **官方推荐**: Umi 团队推荐使用 pnpm

## 版本要求

根据 Umi 官方文档，开发 Umi 4.x 需要：

- Node.js 20.19.0
- pnpm v8 (使用 8.15.8，与项目中配置的版本一致)

## 配置说明

项目已在以下文件中配置了 pnpm 8.15.8：

1. 根目录 [package.json](file:///e:/YSY/UG/package.json) - `"packageManager": "pnpm@8.15.8"`
2. [frontend/package.json](file:///e:/YSY/UG/frontend/package.json) - `"packageManager": "pnpm@8.15.8"`
3. [backend/package.json](file:///e:/YSY/UG/backend/package.json) - `"packageManager": "pnpm@8.15.8"`

## 依赖统一管理策略

为了更好地统一依赖管理，项目采用以下策略：

1. **根目录统一管理共享依赖**：
   - 将前后端共同使用的依赖包（如 `@types/node`、`typescript` 等）提升到根目录 [package.json](file:///e:/YSY/UG/package.json)
   - 利用 pnpm workspace 的依赖提升机制，减少重复安装

2. **子项目管理特定依赖**：
   - 前端特定依赖保留在 [frontend/package.json](file:///e:/YSY/UG/frontend/package.json)
   - 后端特定依赖保留在 [backend/package.json](file:///e:/YSY/UG/backend/package.json)

3. **版本一致性**：
   - 通过根目录 [package.json](file:///e:/YSY/UG/package.json) 的 `overrides` 和 `resolutions` 字段确保依赖版本一致性

## 安装 pnpm

### 方法一：使用 Corepack（推荐）

确保 Node.js 18+ 已安装，然后启用 Corepack：

```bash
corepack enable
```

### 方法二：使用 npm 安装

```bash
npm install -g pnpm@8.15.8
```

## 使用说明

### 安装依赖

```bash
# 在项目根目录安装所有依赖（推荐）
pnpm install

# 或者分别安装前后端依赖
pnpm setup
```

### 添加新依赖

```bash
# 添加项目共享依赖到根目录
pnpm add -w <package-name>

# 添加开发依赖到根目录
pnpm add -wD <package-name>

# 添加前端依赖
pnpm add --filter frontend <package-name>

# 添加后端依赖
pnpm add --filter backend <package-name>

# 添加开发依赖
pnpm add -D --filter <project> <package-name>
```

### 运行脚本

```bash
# 启动开发服务器
pnpm dev

# 构建项目
pnpm build

# 运行测试
pnpm test

# 运行特定项目的脚本
pnpm --filter frontend dev
pnpm --filter backend dev
```

## 依赖优化方案

### 当前依赖分析

项目依赖可以分为三类：

1. **共享依赖**（在根目录管理）：
   - `@types/node`: 前后端都需要
   - `typescript`: 前后端都使用 TypeScript
   - `rimraf`: 清理工具
   - `concurrently`: 并行执行命令

2. **前端特定依赖**（在 frontend 目录管理）：
   - React 相关：`react`, `react-dom`
   - Umi 相关：`@umijs/max`
   - Ant Design 相关：`antd`, `@ant-design/icons`, `@ant-design/pro-components`
   - 工具库：`axios`, `ahooks`, `dayjs`, `lodash`

3. **后端特定依赖**（在 backend 目录管理）：
   - Egg.js 相关：`egg`, `egg-scripts`, `egg-sequelize` 等
   - 数据库相关：`mysql2`, `sequelize`, `sequelize-cli`
   - 认证相关：`jsonwebtoken`, `bcryptjs`
   - 工具库：`uuid`, `dayjs`, `lodash`

### 优化后的依赖结构

```
根目录 package.json
├── 共享依赖
│   ├── @types/node
│   ├── typescript
│   ├── rimraf
│   └── concurrently
├── 前端依赖 (通过 workspace 引用)
└── 后端依赖 (通过 workspace 引用)

frontend/package.json
├── 前端特定依赖
└── 共享依赖 (从根目录提升)

backend/package.json
├── 后端特定依赖
└── 共享依赖 (从根目录提升)
```

## 常见问题

### 1. 包管理器版本不匹配

如果遇到版本不匹配的错误，请确保使用正确的 pnpm 版本：

```bash
# 检查当前 pnpm 版本
pnpm --version

# 如果版本不正确，可以使用以下命令强制使用项目指定的版本
corepack prepare pnpm@8.15.8 --activate
```

### 2. 依赖安装问题

如果遇到依赖安装问题，可以尝试清理缓存：

```bash
# 清理 pnpm 缓存
pnpm store prune

# 删除 node_modules 并重新安装
pnpm clean
pnpm install
```

### 3. 依赖版本冲突

如果遇到依赖版本冲突，可以通过以下方式解决：

```bash
# 查看依赖树
pnpm list <package-name>

# 强制重新解析依赖
pnpm install --force

# 检查重复依赖
pnpm dedupe
```

## 注意事项

1. 请勿混用不同的包管理器（npm、yarn、pnpm）
2. 确保团队成员使用相同的 pnpm 版本
3. 提交代码前请确保依赖安装正确且项目能正常运行
4. 添加新依赖时，根据依赖的使用范围选择合适的安装位置
5. 定期检查和更新依赖，保持版本一致性