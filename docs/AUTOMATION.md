# 项目自动化指南

本文档详细说明了 UG 管理系统项目中所有的自动化功能和脚本。

## 目录

1. [编辑器自动化](#编辑器自动化)
2. [开发流程自动化](#开发流程自动化)
3. [构建和部署自动化](#构建和部署自动化)
4. [测试自动化](#测试自动化)
5. [代码质量自动化](#代码质量自动化)
6. [依赖管理自动化](#依赖管理自动化)
7. [版本检查自动化](#版本检查自动化)
8. [拼写检查自动化](#拼写检查自动化)
9. [诊断和调试自动化](#诊断和调试自动化)

## 编辑器自动化

### 自动保存配置

项目配置了 VS Code 编辑器自动保存功能：

- 焦点离开编辑器时自动保存文件
- 保存时自动格式化代码
- 保存时自动执行 ESLint 修复和导入组织

配置文件：[.vscode/settings.json](file:///e:/YSY/UG/.vscode/settings.json)

### 任务自动化

项目配置了 VS Code 任务，可通过快捷键运行：

- 自动格式化和检查
- 自动类型检查
- 自动构建项目
- 启动开发服务器

配置文件：[.vscode/tasks.json](file:///e:/YSY/UG/.vscode/tasks.json)

## 开发流程自动化

### 启动开发服务器

```bash
# 同时启动前后端开发服务器
pnpm dev

# 只启动后端开发服务器
pnpm dev:backend

# 只启动前端开发服务器
pnpm dev:frontend
```

相关脚本：

- [scripts/auto-dev-server.bat](file:///e:/YSY/UG/scripts/auto-dev-server.bat)

### 数据库操作自动化

```bash
# 运行数据库迁移
pnpm db:migrate

# 运行数据库种子数据
pnpm db:seed
```

## 构建和部署自动化

### 构建项目

```bash
# 构建前端项目
pnpm build

# 构建前端项目（完整命令）
pnpm build:frontend
```

相关脚本：

- [scripts/auto-build.bat](file:///e:/YSY/UG/scripts/auto-build.bat)

### 部署脚本

项目提供了部署相关的脚本：

- [start.bat](file:///e:/YSY/UG/start.bat) - 启动生产环境
- [start-dev.bat](file:///e:/YSY/UG/start-dev.bat) - 启动开发环境

## 测试自动化

### 运行测试

```bash
# 运行所有测试
pnpm test

# 只运行后端测试
pnpm test:backend

# 只运行前端测试
pnpm test:frontend
```

### 持续集成

项目配置了持续集成脚本：

```bash
pnpm ci
```

## 代码质量自动化

### 代码检查

```bash
# 运行所有代码检查
pnpm lint

# 只运行后端代码检查
pnpm lint:backend

# 只运行前端代码检查
pnpm lint:frontend

# 自动修复代码规范问题
pnpm lint:fix
```

相关脚本：

- [scripts/auto-format-and-lint.bat](file:///e:/YSY/UG/scripts/auto-format-and-lint.bat)

### TypeScript 类型检查

```bash
# 运行 TypeScript 类型检查
pnpm tsc
```

相关脚本：

- [scripts/auto-type-check.bat](file:///e:/YSY/UG/scripts/auto-type-check.bat)

### 代码格式化

```bash
# 格式化代码
pnpm format
```

## 依赖管理自动化

### 安装依赖

```bash
# 在项目根目录安装所有依赖（推荐）
pnpm install

# 或者分别安装前后端依赖
pnpm setup
```

相关脚本：

- [install-deps.bat](file:///e:/YSY/UG/install-deps.bat)

### 清理和重新安装依赖

```bash
# 运行清理和重新安装脚本
./reinstall-deps.bat
```

相关脚本：

- [reinstall-deps.bat](file:///e:/YSY/UG/reinstall-deps.bat)

### 依赖清理

```bash
# 清理所有依赖文件
./scripts/clean-deps.bat
```

### 依赖问题诊断

```bash
# 诊断依赖问题
./scripts/diagnose-dependencies.bat
```

### Umi 构建工具修复

```bash
# 修复由于依赖问题导致的 Umi 构建工具无法正常运行的问题
./scripts/fix-umi-build.bat
```

### 构建工具配置检查

```cmd
# 检查 Umi 构建工具配置问题
./scripts/check-umi-config.bat
```

### 构建工具配置修复

```cmd
# 修复 Umi 构建工具配置问题
./scripts/fix-umi-config.bat
```

### 清理操作

```bash
# 清理所有 node_modules
pnpm clean

# 只清理后端 node_modules
pnpm clean:backend

# 只清理前端 node_modules
pnpm clean:frontend
```

## 版本检查自动化

### 版本检查脚本

项目提供了版本检查脚本，可以验证当前环境是否符合要求：

```cmd
cd e:\YSY\UG
tools\check-versions.bat
```

相关脚本：

- [tools/check-versions.bat](file:///e:/YSY/UG/tools/check-versions.bat)
- [tools/check-versions.js](file:///e:/YSY/UG/tools/check-versions.js)

### Node.js 升级自动化

项目提供了 Node.js 升级脚本：

```cmd
cd e:\YSY\UG
tools\auto-upgrade-nodejs.bat
```

相关脚本：

- [tools/auto-upgrade-nodejs.bat](file:///e:/YSY/UG/tools/auto-upgrade-nodejs.bat)

## 拼写检查自动化

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

相关脚本：

- [scripts/spellcheck-all.bat](file:///e:/YSY/UG/scripts/spellcheck-all.bat)

## 诊断和调试自动化

为了更快速地发现问题和解决问题，项目提供了以下诊断和调试脚本：

### 性能分析

```cmd
# 分析前端构建包大小
./scripts/analyze-bundle.bat
```

### 依赖检查

```cmd
# 检查依赖安全性和过时情况
./scripts/check-dependencies.bat
```

### 环境变量验证

```cmd
# 验证环境变量配置
./scripts/validate-env.bat
```

### 路由检查

```cmd
# 检查UMI路由配置
./scripts/check-routes.bat
```

### 数据库连接测试

```cmd
# 测试数据库连接
./scripts/test-db-connection.bat
```

### 数据库配置检查

```cmd
# 检查数据库配置信息
./scripts/check-database-config.bat
```

### API接口测试

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

### 快速诊断

```cmd
# 运行快速诊断
./scripts/quick-diagnosis.bat
```

### Umi 构建工具修复

```cmd
# 修复由于依赖问题导致的 Umi 构建工具无法正常运行的问题
./scripts/fix-umi-build.bat
```

## 自动化脚本目录

项目中所有的自动化脚本都位于以下目录：

1. **根目录脚本**：
   - [install-deps.bat](file:///e:/YSY/UG/install-deps.bat) - 安装依赖
   - [reinstall-deps.bat](file:///e:/YSY/UG/reinstall-deps.bat) - 重新安装依赖
   - [start.bat](file:///e:/YSY/UG/start.bat) - 启动生产环境
   - [start-dev.bat](file:///e:/YSY/UG/start-dev.bat) - 启动开发环境

2. **scripts 目录**：
   - [analyze-bundle.bat](file:///e:/YSY/UG/scripts/analyze-bundle.bat) - 分析前端构建包
   - [auto-build.bat](file:///e:/YSY/UG/scripts/auto-build.bat) - 自动构建项目
   - [auto-dev-server.bat](file:///e:/YSY/UG/scripts/auto-dev-server.bat) - 自动启动开发服务器
   - [auto-format-and-lint.bat](file:///e:/YSY/UG/scripts/auto-format-and-lint.bat) - 自动格式化和检查代码
   - [auto-type-check.bat](file:///e:/YSY/UG/scripts/auto-type-check.bat) - 自动进行 TypeScript 类型检查
   - [check-dependencies.bat](file:///e:/YSY/UG/scripts/check-dependencies.bat) - 检查依赖
   - [check-memory.bat](file:///e:/YSY/UG/scripts/check-memory.bat) - 检查内存
   - [check-routes.bat](file:///e:/YSY/UG/scripts/check-routes.bat) - 检查路由
   - [debug-middleware.bat](file:///e:/YSY/UG/scripts/debug-middleware.bat) - 调试中间件
   - [quick-diagnosis.bat](file:///e:/YSY/UG/scripts/quick-diagnosis.bat) - 快速诊断
   - [security-scan.bat](file:///e:/YSY/UG/scripts/security-scan.bat) - 安全扫描
   - [spellcheck-all.bat](file:///e:/YSY/UG/scripts/spellcheck-all.bat) - 整个项目拼写检查
   - [test-api.bat](file:///e:/YSY/UG/scripts/test-api.bat) - 测试API
   - [test-db-connection.bat](file:///e:/YSY/UG/scripts/test-db-connection.bat) - 测试数据库连接
   - [validate-env.bat](file:///e:/YSY/UG/scripts/validate-env.bat) - 验证环境变量

3. **tools 目录**：
   - [auto-fix-and-start.bat](file:///e:/YSY/UG/tools/auto-fix-and-start.bat) - 自动修复并启动
   - [auto-upgrade-nodejs.bat](file:///e:/YSY/UG/tools/auto-upgrade-nodejs.bat) - 自动升级 Node.js
   - [check-versions.bat](file:///e:/YSY/UG/tools/check-versions.bat) - 检查版本
   - [check-versions.js](file:///e:/YSY/UG/tools/check-versions.js) - 检查版本（Node.js 脚本）

## 使用建议

1. **日常开发**：
   - 使用 `pnpm dev` 启动开发环境
   - 依赖编辑器自动保存和格式化功能

2. **代码提交前**：
   - 运行 `pnpm lint:fix` 自动修复代码问题
   - 运行 `pnpm tsc` 检查 TypeScript 类型
   - 运行 `pnpm test` 确保测试通过

3. **依赖问题**：
   - 遇到依赖问题时，优先使用 [reinstall-deps.bat](file:///e:/YSY/UG/reinstall-deps.bat) 脚本

4. **版本检查**：
   - 定期运行 [tools/check-versions.bat](file:///e:/YSY/UG/tools/check-versions.bat) 确保环境符合要求

5. **问题排查**：
   - 使用 [quick-diagnosis.bat](file:///e:/YSY/UG/scripts/quick-diagnosis.bat) 快速诊断常见问题
   - 根据具体问题选择相应的诊断脚本

## 注意事项

1. 所有自动化脚本都针对 Windows 环境设计
2. 建议使用 CMD 终端执行脚本，避免 PowerShell 兼容性问题
3. 定期更新自动化脚本以适应项目变化
4. 在团队协作中，确保所有成员使用相同的自动化流程
