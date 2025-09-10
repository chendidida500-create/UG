# UG 管理系统

这是一个基于 UMI + Egg.js 的全栈管理系统。

## 技术栈

### 前端

- UMI 4.x
- React 18
- Ant Design 5.x
- TypeScript

### 后端

- Egg.js 3.x
- MySQL 8.0
- Sequelize 6.x
- JWT 认证

## 环境要求

- Node.js 20.19.0
- pnpm 8.15.8
- MySQL 8.0+

## 快速开始

### 1. 环境设置

```bash
# 克隆项目后，运行环境设置脚本
scripts\setup-environment.bat
```

或者分步执行：

```bash
# 安装前端依赖
cd frontend && pnpm install

# 安装后端依赖
cd ../backend && pnpm install

# 初始化数据库
cd ../scripts && init-database.bat
```

### 2. 数据库配置

1. 确保 MySQL 服务正在运行
2. 修改 `backend/.env` 文件中的数据库连接信息：
   ```
   MYSQL_HOST=127.0.0.1
   MYSQL_PORT=3306
   MYSQL_DATABASE=ug
   MYSQL_USERNAME=ug
   MYSQL_PASSWORD=zcn231101
   JWT_SECRET=ug-jwt-secret-here
   PORT=7001
   ```

### 3. 启动开发服务器

```bash
# 使用自动化脚本启动前后端开发服务器
scripts\auto-dev-server.bat
```

或者分别启动：

```bash
# 启动后端开发服务器
cd backend && pnpm dev

# 启动前端开发服务器
cd frontend && pnpm dev
```

## 项目结构

```
UG/
├── backend/          # 后端服务
│   ├── app/          # 应用代码
│   ├── config/       # 配置文件
│   └── logs/         # 日志文件
├── frontend/         # 前端应用
│   ├── src/          # 源代码
│   └── public/       # 静态资源
├── scripts/          # 自动化脚本
└── docs/             # 文档
```

## 文档

- [解决Egg模块找不到问题.md](docs/解决Egg模块找不到问题.md) - 解决 Egg 模块找不到问题
- [TYPESCRIPT_EGG_TYPE_DEFINITION_FIX.md](docs/TYPESCRIPT_EGG_TYPE_DEFINITION_FIX.md) - TypeScript Egg 类型定义问题修复指南
- [DEPENDENCY_MANAGEMENT.md](docs/DEPENDENCY_MANAGEMENT.md) - 依赖管理指南
- [DEPENDENCY_VERSION_REPORT.md](docs/DEPENDENCY_VERSION_REPORT.md) - 依赖版本检查报告
- [TYPESCRIPT_URILIB_ERROR_FIX.md](docs/TYPESCRIPT_URILIB_ERROR_FIX.md) - TypeScript urllib 私有标识符错误修复指南

## 自动化脚本

- `scripts/auto-dev-server.bat` - 启动开发服务器
- `scripts/auto-build.bat` - 构建项目
- `scripts/auto-format-and-lint.bat` - 格式化和检查代码
- `scripts/auto-type-check.bat` - 类型检查
- `scripts/setup-environment.bat` - 环境设置
- `scripts/init-database.bat` - 数据库初始化
- `scripts/diagnostic-checks.bat` - 诊断检查
- `scripts/performance-analysis.bat` - 性能分析
- `scripts/api-tests.bat` - API 接口测试
- `scripts/security-scan.bat` - 安全扫描
- `scripts/spellcheck.bat` - 拼写检查
- `scripts/fix-typescript-issues.bat` - 修复 TypeScript 问题
- `scripts/fix-frontend-types.bat` - 修复前端类型问题
- `scripts/refresh-vscode-window.bat` - 刷新 VS Code 窗口
- `scripts/clean-and-rebuild.bat` - 清理和重建项目
- `scripts/fix-frontend-typings.bat` - 修复前端类型声明
- `scripts/fix-umi-config.bat` - 修复 UMI 配置

## VS Code 任务

项目配置了以下 VS Code 任务，可通过 `Ctrl+Shift+P` → `Tasks: Run Task` 运行：

- 自动格式化和检查
- 自动类型检查
- 自动构建项目
- 启动开发服务器
- 环境设置
- 数据库初始化
- 诊断检查
- 性能分析
- API 接口测试
- 安全扫描
- 拼写检查
- 终端编码测试
- 修复 TypeScript 问题
- 修复前端类型问题
- 刷新 VS Code 窗口
- 清理和重建项目
- 修复前端类型声明
- 修复 UMI 配置

## VS Code 扩展推荐

项目推荐安装以下 VS Code 扩展以获得最佳开发体验：

- TypeScript 开发支持
- React 代码片段
- 代码质量工具 (Prettier/ESLint/拼写检查)
- Git 工具 (Git 图形化/GitLens/GitHub Pull Request)
- 界面增强 (图标主题)
- 开发效率工具 (IntelliCode/自动重命名标签/路径智能提示)
- 数据库工具 (SQLTools 及 MySQL 驱动)
- API 测试工具 (REST Client)
- 文档支持 (更好的注释/Markdown 工具)
- UMI 开发所需的 JavaScript 调试工具

## 常见问题解决

### TypeScript 类型错误

如果遇到 TypeScript 类型错误，可以运行以下脚本修复：

```bash
scripts\fix-typescript-issues.bat
```

### 前端类型声明问题

如果遇到前端类型声明问题（如找不到模块"@umijs/max"或 process 未定义），可以运行以下脚本修复：

```bash
scripts\fix-frontend-types.bat
```

### 前端类型声明文件问题

如果遇到前端类型声明文件问题（如找不到模块"umi"或 NodeJS.Process 未导出），可以运行以下脚本修复：

```bash
scripts\fix-frontend-typings.bat
```

### UMI 配置问题

如果遇到 UMI 配置问题（如模块"@umijs/max"没有导出的成员"defineConfig"），可以运行以下脚本修复：

```bash
scripts\fix-umi-config.bat
```

### VS Code 缓存问题

如果 VS Code 显示的错误信息与实际文件不一致，可以运行以下脚本刷新窗口：

```bash
scripts\refresh-vscode-window.bat
```

然后在 VS Code 中按 `Ctrl+Shift+P`，输入 "Developer: Reload Window" 并执行。

### 项目缓存问题

如果项目出现奇怪的错误或构建问题，可以尝试清理和重建项目：

```bash
scripts\clean-and-rebuild.bat
```

### 内联样式警告

项目已将内联样式替换为 CSS 模块，以符合最佳实践。

### 类型定义缺失

已安装缺失的类型定义包，包括`@types/node`。

## 环境变量

### 后端 (`backend/.env`)

```
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DATABASE=ug
MYSQL_USERNAME=ug
MYSQL_PASSWORD=zcn231101
JWT_SECRET=ug-jwt-secret-here
PORT=7001
```

### 前端 (`frontend/.env`)

```
API_BASE_URL=http://localhost:7001
PORT=8000
```

## 数据库配置验证

项目提供了数据库配置验证脚本，可以运行以下命令检查配置是否正确：

```bash
cd backend
node scripts/validate-db-config.js
```

## 数据库构建和初始化

项目使用 Sequelize ORM 管理数据库。以下是数据库构建和初始化的步骤：

1. 确保 MySQL 服务正在运行
2. 运行数据库初始化脚本：
   ```bash
   scripts\init-database.bat
   ```

或者手动执行以下步骤：

```bash
# 进入后端目录
cd backend

# 创建数据库
pnpm sequelize db:create

# 运行数据库迁移
pnpm sequelize db:migrate

# 填充种子数据
pnpm sequelize db:seed:all
```

### 数据库结构

数据库包含以下表：

- Users: 用户表
- Roles: 角色表
- Permissions: 权限表
- UserRoles: 用户角色关联表
- RolePermissions: 角色权限关联表

### 验证数据库状态

可以使用以下命令验证数据库迁移状态：

```bash
cd backend
pnpm sequelize db:migrate:status
```
