# 开发指南

## 目录结构

```
UG/
├── backend/              # 后端服务
│   ├── app/              # 应用代码
│   ├── config/           # 配置文件
│   ├── database/         # 数据库迁移和种子数据
│   └── test/             # 测试文件
├── frontend/             # 前端应用
│   ├── src/              # 源代码
│   ├── layouts/          # 布局组件
│   ├── pages/            # 页面组件
│   ├── components/       # 通用组件
│   ├── models/           # 状态管理
│   ├── services/         # API服务
│   └── utils/            # 工具函数
├── docs/                 # 文档
├── scripts/              # 脚本文件
├── tools/                # 工具集
└── run/                  # 运行时文件
```

## 环境要求

- Node.js 18+ (推荐使用 20.14.0，已在 package.json 中指定)
- pnpm 8.x (推荐使用 8.15.8，已在 package.json 中指定)

## 包管理器

本项目统一使用 Umi 官方推荐的 pnpm 包管理器，版本为 8.15.8。

详细信息请参考 [PNPM 迁移指南](PNPM_MIGRATION.md)。

### 依赖管理策略

为了更好地统一依赖管理，项目采用以下策略：

1. **根目录统一管理共享依赖**：
   - 将前后端共同使用的依赖包（如 `@types/node`、`typescript` 等）提升到根目录 [package.json](file:///e:/YSY/UG/package.json)
   - 利用 pnpm workspace 的依赖提升机制，减少重复安装

2. **子项目管理特定依赖**：
   - 前端特定依赖保留在 [frontend/package.json](file:///e:/YSY/UG/frontend/package.json)
   - 后端特定依赖保留在 [backend/package.json](file:///e:/YSY/UG/backend/package.json)

3. **版本一致性**：
   - 通过根目录 [package.json](file:///e:/YSY/UG/package.json) 的 `overrides` 和 `resolutions` 字段确保依赖版本一致性

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

## 开发流程

### 启动开发服务器

```bash
# 同时启动前后端开发服务器
pnpm dev

# 只启动后端开发服务器
pnpm dev:backend

# 只启动前端开发服务器
pnpm dev:frontend
```

### 构建项目

```bash
# 构建前端项目
pnpm build

# 构建前端项目（完整命令）
pnpm build:frontend
```

### 运行测试

```bash
# 运行所有测试
pnpm test

# 只运行后端测试
pnpm test:backend

# 只运行前端测试
pnpm test:frontend
```

### 代码检查

```bash
# 运行所有代码检查
pnpm lint

# 只运行后端代码检查
pnpm lint:backend

# 只运行前端代码检查
pnpm lint:frontend
```

## 数据库操作

```bash
# 运行数据库迁移
pnpm db:migrate

# 运行数据库种子数据
pnpm db:seed
```

## 清理操作

```bash
# 清理所有 node_modules
pnpm clean

# 只清理后端 node_modules
pnpm clean:backend

# 只清理前端 node_modules
pnpm clean:frontend
```

## 项目配置

### 环境变量

项目使用 `.env` 文件管理环境变量。可以创建以下文件：

- `.env`: 默认环境变量
- `.env.local`: 本地环境变量（不会被提交到版本控制）
- `.env.development`: 开发环境变量
- `.env.production`: 生产环境变量

### 配置文件

- 后端配置: [backend/config/config.default.js](file:///e:/YSY/UG/backend/config/config.default.js)
- 前端配置: [frontend/.umirc.ts](file:///e:/YSY/UG/frontend/.umirc.ts)
- 数据库配置: [backend/database/config.js](file:///e:/YSY/UG/backend/database/config.js)

## 代码规范

项目使用 ESLint 和 Prettier 进行代码规范检查和格式化。

### 运行代码检查

```bash
# 检查代码规范
pnpm lint

# 自动修复代码规范问题
pnpm lint:fix

# 格式化代码
pnpm format
```

### TypeScript 类型检查

```bash
# 运行 TypeScript 类型检查
pnpm tsc
```

## 提交代码

在提交代码之前，请确保：

1. 通过所有测试：`pnpm test`
2. 通过代码检查：`pnpm lint`
3. 通过类型检查：`pnpm tsc`
4. 代码格式化：`pnpm format`

## 常见问题

### 1. 依赖安装问题

如果遇到依赖安装问题，可以尝试：

```bash
# 清理缓存并重新安装
pnpm store prune
pnpm clean
pnpm install
```

### 2. 端口冲突

如果遇到端口冲突，可以修改以下配置文件：

- 前端端口: [frontend/.umirc.ts](file:///e:/YSY/UG/frontend/.umirc.ts) 中的 `devServer.port`
- 后端端口: [backend/config/config.default.js](file:///e:/YSY/UG/backend/config/config.default.js) 中的 `cluster.listen.port`

### 3. 数据库连接问题

确保数据库服务正在运行，并且配置文件中的数据库连接信息正确。

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request
