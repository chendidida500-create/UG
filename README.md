# UG 管理系统

## 项目简介

UG 管理系统是一个基于 UMI + Egg.js 开发的现代化后台管理系统，提供完整的用户权限管理、动态表格表单等功能。

## 目录结构

```
UG/
├── backend/              # 后端服务
├── frontend/             # 前端应用
├── docs/                 # 文档
└── scripts/              # 脚本
```

## 环境要求

- Node.js 20.19.0 (已在 package.json 中指定)
- pnpm 8.x (推荐使用 8.15.8，已在 package.json 中指定)

## 数据库配置

项目现在统一使用以下数据库配置：

- 数据库名：`ug`（所有环境统一）
- 用户名：`ug`（所有环境统一）
- 密码：`zcn231101`
- 主机：`localhost`
- 端口：`3306`
- 类型：MySQL

详细信息请参考 [docs/DATABASE.md](docs/DATABASE.md)。

数据库配置更新历史请参考 [docs/DATABASE_CONFIG_UPDATES.md](docs/DATABASE_CONFIG_UPDATES.md)。

## 包管理器

本项目统一使用 Umi 官方推荐的 pnpm 包管理器，版本为 8.15.8。

详细信息请参考 [docs/PNPM_MIGRATION.md](docs/PNPM_MIGRATION.md)。

### 安装依赖

```bash
# 在项目根目录安装所有依赖
pnpm install

# 或者分别安装前后端依赖
pnpm setup
```

## 清理和重新安装依赖

如果遇到依赖问题，可以使用以下方法清理并重新安装依赖：

### 自动化脚本方式（推荐）

```bash
# 运行清理和重新安装脚本
./reinstall-deps.bat
```

### 手动方式

```bash
# 1. 清理根目录依赖
rm -rf node_modules pnpm-lock.yaml

# 2. 清理前端依赖
cd frontend
rm -rf node_modules pnpm-lock.yaml
cd ..

# 3. 清理后端依赖
cd backend
rm -rf node_modules pnpm-lock.yaml
cd ..

# 4. 重新安装所有依赖
pnpm install
```

## 启动开发服务器

### 使用脚本启动（推荐）

```bash
# 运行启动脚本
./start-dev.bat
```

### 手动启动

```bash
# 启动后端服务
cd backend
pnpm dev

# 在新终端中启动前端服务
cd frontend
pnpm dev
```

## 自动化功能

项目实现了全面的自动化功能，提高开发效率：

### 编辑器自动化

- 自动保存：焦点离开时自动保存文件
- 自动格式化：保存时自动格式化代码
- 自动修复：保存时自动执行ESLint修复和导入组织

### 开发流程自动化

```bash
# 同时启动前后端开发服务器
pnpm dev

# 构建项目
pnpm build

# 运行测试
pnpm test

# 代码检查
pnpm lint
pnpm lint:fix  # 自动修复问题
```

### 任务自动化

通过 VS Code 任务系统，可以快速执行：

- 自动格式化和检查 ([scripts/auto-format-and-lint.bat](file:///e:/YSY/UG/scripts/auto-format-and-lint.bat))
- 自动类型检查 ([scripts/auto-type-check.bat](file:///e:/YSY/UG/scripts/auto-type-check.bat))
- 自动构建项目 ([scripts/auto-build.bat](file:///e:/YSY/UG/scripts/auto-build.bat))
- 启动开发服务器 ([scripts/auto-dev-server.bat](file:///e:/YSY/UG/scripts/auto-dev-server.bat))

详细信息请参考 [docs/AUTOMATION.md](docs/AUTOMATION.md)。

## 诊断和调试工具

为了更快速地发现问题和解决问题，项目提供了丰富的诊断和调试工具：

### 快速诊断

```cmd
# 运行快速诊断，检查环境、依赖、代码质量等
./scripts/quick-diagnosis.bat
```

### 性能分析

```cmd
# 分析前端构建包大小和性能
./scripts/analyze-bundle.bat
```

### 依赖检查

```cmd
# 检查依赖安全性和过时情况
./scripts/check-dependencies.bat
```

### 环境验证

```cmd
# 验证环境变量配置
./scripts/validate-env.bat
```

### 路由检查

```cmd
# 检查UMI路由配置
./scripts/check-routes.bat
```

### 数据库测试

```cmd
# 测试数据库连接
./scripts/test-db-connection.bat
```

### API测试

```cmd
# 测试后端API接口
./scripts/test-api.bat
```

### 中间件调试

```cmd
# 调试Egg.js中间件
./scripts/debug-middleware.bat
```

### 日志分析

```cmd
# 分析应用日志
./scripts/analyze-logs.bat
```

### 内存检查

```cmd
# 检查内存使用情况
./scripts/check-memory.bat
```

### 安全扫描

```cmd
# 扫描安全漏洞
./scripts/security-scan.bat
```

### Umi 构建工具修复

```cmd
# 修复由于依赖问题导致的 Umi 构建工具无法正常运行的问题
./scripts/fix-umi-build.bat
```

### 构建工具配置检查和修复

```cmd
# 检查构建工具配置问题
./scripts/check-umi-config.bat

# 修复构建工具配置问题
./scripts/fix-umi-config.bat
```

## 拼写检查

本项目使用 cspell 进行代码拼写检查，确保代码中的注释、字符串和标识符没有拼写错误。

### 运行拼写检查

```bash
# 前端项目拼写检查
cd frontend
pnpm spellcheck

# 后端项目拼写检查
cd backend
pnpm spellcheck

# 整个项目拼写检查
./scripts/spellcheck-all.bat
```

### 拼写检查配置

- 全局配置: [cspell.json](cspell.json)
- 前端配置: [frontend/cspell.json](frontend/cspell.json)
- 后端配置: [backend/cspell.json](backend/cspell.json)
- 配置继承: [config/cspell/](config/cspell/)

详细信息请参考 [docs/spell-checking-guide.md](docs/spell-checking-guide.md)。

## TypeScript 配置问题修复

本项目在开发过程中遇到了一些 TypeScript 配置问题，包括类型定义文件缺失、rootDir 配置问题等。详细信息和解决方案请参考 [docs/TYPESCRIPT_FIXES.md](docs/TYPESCRIPT_FIXES.md)。

## 依赖更新日志

项目依赖的更新历史和解决的警告问题请参考 [docs/DEPENDENCY_UPDATES.md](docs/DEPENDENCY_UPDATES.md)。

## 版本要求

项目版本要求的详细信息请参考 [docs/VERSION_REQUIREMENTS.md](docs/VERSION_REQUIREMENTS.md)。

## 版本锁定

项目版本锁定的详细信息请参考 [docs/VERSION_LOCKING.md](docs/VERSION_LOCKING.md)。

## 依赖版本报告

项目依赖版本的检查报告请参考 [docs/DEPENDENCY_VERSION_REPORT.md](docs/DEPENDENCY_VERSION_REPORT.md)。

## 字符编码标准

项目字符编码标准请参考 [docs/ENCODING_STANDARD.md](docs/ENCODING_STANDARD.md)。

## 版本升级指南

项目版本升级的详细步骤请参考 [docs/VERSION_UPGRADE_GUIDE.md](docs/VERSION_UPGRADE_GUIDE.md)。
