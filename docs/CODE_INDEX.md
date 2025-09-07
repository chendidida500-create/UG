# 项目文档索引

本文档提供了 UG 管理系统项目所有文档的索引，方便快速查找所需信息。

## 项目概述

- [README.md](../README.md) - 项目主文档，包含项目简介、环境要求、快速开始等
- [DEVELOPMENT.md](DEVELOPMENT.md) - 开发指南，包含目录结构、环境要求、开发流程等
- [PROJECT_COMPLETION.md](PROJECT_COMPLETION.md) - 项目完成报告
- [FINAL_COMPLETION_REPORT.md](FINAL_COMPLETION_REPORT.md) - 最终完成报告

## 环境与版本管理

- [VERSION_REQUIREMENTS.md](VERSION_REQUIREMENTS.md) - 项目版本要求
- [VERSION_LOCKING.md](VERSION_LOCKING.md) - 项目版本锁定说明
- [VERSION_UPGRADE_GUIDE.md](VERSION_UPGRADE_GUIDE.md) - 版本升级指南
- [DEPENDENCY_VERSION_REPORT.md](DEPENDENCY_VERSION_REPORT.md) - 依赖版本报告
- [DEPENDENCY_UPDATES.md](DEPENDENCY_UPDATES.md) - 依赖更新日志

## 自动化功能

- [AUTOMATION.md](AUTOMATION.md) - 项目自动化指南
- [PNPM_MIGRATION.md](PNPM_MIGRATION.md) - PNPM 迁移指南

## 代码质量与规范

- [ENCODING_STANDARD.md](ENCODING_STANDARD.md) - 字符编码标准
- [spell-checking-guide.md](spell-checking-guide.md) - 拼写检查指南
- [TYPESCRIPT_FIXES.md](TYPESCRIPT_FIXES.md) - TypeScript 配置问题修复

## 配置与部署

- [CONFIGURATION.md](CONFIGURATION.md) - 项目配置说明
- [DEPLOYMENT.md](DEPLOYMENT.md) - 部署指南
- [DATABASE.md](DATABASE.md) - 数据库配置与管理

## 数据库相关文档

- [DATABASE.md](DATABASE.md) - 数据库设计文档
- [DATABASE_CONFIG_UPDATES.md](DATABASE_CONFIG_UPDATES.md) - 数据库配置更新日志

## 脚本工具

### 批处理脚本 (位于项目根目录)

- [install-deps.bat](../install-deps.bat) - 安装依赖
- [reinstall-deps.bat](../reinstall-deps.bat) - 重新安装依赖
- [start.bat](../start.bat) - 启动生产环境
- [start-dev.bat](../start-dev.bat) - 启动开发环境
- [fix-umi-error.bat](../fix-umi-error.bat) - 修复 UMI 错误

### 脚本目录 (scripts/)

- [analyze-bundle.bat](../scripts/analyze-bundle.bat) - 分析前端构建包
- [auto-build.bat](../scripts/auto-build.bat) - 自动构建项目
- [auto-dev-server.bat](../scripts/auto-dev-server.bat) - 自动启动开发服务器
- [auto-format-and-lint.bat](../scripts/auto-format-and-lint.bat) - 自动格式化和检查代码
- [auto-type-check.bat](../scripts/auto-type-check.bat) - 自动进行 TypeScript 类型检查
- [check-dependencies.bat](../scripts/check-dependencies.bat) - 检查依赖安全性和过时情况
- [check-memory.bat](../scripts/check-memory.bat) - 检查内存使用情况
- [check-routes.bat](../scripts/check-routes.bat) - 检查UMI路由配置
- [debug-middleware.bat](../scripts/debug-middleware.bat) - 调试Egg.js中间件
- [quick-diagnosis.bat](../scripts/quick-diagnosis.bat) - 快速诊断
- [security-scan.bat](../scripts/security-scan.bat) - 安全扫描
- [spellcheck-all.bat](../scripts/spellcheck-all.bat) - 整个项目拼写检查
- [test-api.bat](../scripts/test-api.bat) - 测试后端API接口
- [test-db-connection.bat](../scripts/test-db-connection.bat) - 测试数据库连接
- [validate-env.bat](../scripts/validate-env.bat) - 验证环境变量配置

### 工具目录 (tools/)

- [auto-fix-and-start.bat](../tools/auto-fix-and-start.bat) - 自动修复并启动
- [auto-upgrade-nodejs.bat](../tools/auto-upgrade-nodejs.bat) - 自动升级 Node.js
- [check-versions.bat](../tools/check-versions.bat) - 检查版本
- [check-versions.js](../tools/check-versions.js) - 检查版本（Node.js 脚本）

## 前端相关文档

前端特定的配置和说明可在以下文件中找到：

- [frontend/README.md](../frontend/README.md)（如果存在）
- [frontend/package.json](../frontend/package.json) - 前端依赖配置

## 后端相关文档

后端特定的配置和说明可在以下文件中找到：

- [backend/README.md](../backend/README.md)（如果存在）
- [backend/package.json](../backend/package.json) - 后端依赖配置

## 配置文件

- [.editorconfig](../.editorconfig) - 编辑器配置
- [.eslintrc.json](../.eslintrc.json) - ESLint 配置
- [.prettierrc.json](../.prettierrc.json) - Prettier 配置
- [.gitignore](../.gitignore) - Git 忽略文件配置
- [cspell.json](../cspell.json) - 拼写检查配置

## VS Code 配置

- [.vscode/settings.json](../.vscode/settings.json) - VS Code 设置
- [.vscode/tasks.json](../.vscode/tasks.json) - VS Code 任务配置

## TypeScript 配置

- [tsconfig.json](../tsconfig.json) - 根目录 TypeScript 配置
- [config/tsconfig/](../config/tsconfig/) - TypeScript 配置目录
- [frontend/tsconfig.json](../frontend/tsconfig.json) - 前端 TypeScript 配置
- [backend/tsconfig.json](../backend/tsconfig.json) - 后端 TypeScript 配置

## 项目结构说明

### 根目录重要文件

```
UG/
├── .editorconfig         # 编辑器配置
├── .env.example          # 环境变量示例
├── .gitignore            # Git 忽略文件
├── README.md             # 项目主文档
├── package.json          # 根目录包配置
├── pnpm-workspace.yaml   # pnpm 工作区配置
├── tsconfig.json         # 根目录 TypeScript 配置
├── typings.d.ts          # TypeScript 类型定义
├── install-deps.bat      # 安装依赖脚本
├── reinstall-deps.bat    # 重新安装依赖脚本
├── start.bat             # 启动生产环境脚本
├── start-dev.bat         # 启动开发环境脚本
├── fix-umi-error.bat     # 修复 UMI 错误脚本
├── docker-compose.yml    # Docker 配置
└── docker-compose.prod.yml # 生产环境 Docker 配置
```

### 文档目录

```
docs/
├── AUTOMATION.md         # 自动化指南
├── CODE_INDEX.md         # 文档索引（本文档）
├── CONFIGURATION.md      # 项目配置说明
├── DATABASE.md           # 数据库配置与管理
├── DEPENDENCY_UPDATES.md # 依赖更新日志
├── DEPENDENCY_VERSION_REPORT.md # 依赖版本报告
├── DEPLOYMENT.md         # 部署指南
├── DEVELOPMENT.md        # 开发指南
├── ENCODING_STANDARD.md  # 字符编码标准
├── FINAL_COMPLETION_REPORT.md # 最终完成报告
├── PNPM_MIGRATION.md     # PNPM 迁移指南
├── PROJECT_COMPLETION.md # 项目完成报告
├── TYPESCRIPT_FIXES.md   # TypeScript 配置问题修复
├── VERSION_LOCKING.md    # 版本锁定说明
├── VERSION_REQUIREMENTS.md # 版本要求
├── VERSION_UPGRADE_GUIDE.md # 版本升级指南
└── spell-checking-guide.md # 拼写检查指南
```

### 脚本目录

```
scripts/
├── analyze-bundle.bat    # 分析前端构建包
├── auto-build.bat        # 自动构建项目
├── auto-dev-server.bat   # 自动启动开发服务器
├── auto-format-and-lint.bat # 自动格式化和检查代码
├── auto-type-check.bat   # 自动进行 TypeScript 类型检查
├── check-dependencies.bat # 检查依赖
├── check-memory.bat      # 检查内存
├── check-routes.bat      # 检查路由
├── debug-middleware.bat  # 调试中间件
├── quick-diagnosis.bat   # 快速诊断
├── security-scan.bat     # 安全扫描
├── spellcheck-all.bat    # 整个项目拼写检查
├── test-api.bat          # 测试API
├── test-db-connection.bat # 测试数据库连接
└── validate-env.bat      # 验证环境变量
```

### 工具目录

```
tools/
├── auto-fix-and-start.bat # 自动修复并启动
├── auto-upgrade-nodejs.bat # 自动升级 Node.js
├── check-versions.bat    # 检查版本
└── check-versions.js     # 检查版本（Node.js 脚本）
```

## 使用建议

1. **新开发者入门**：
   - 首先阅读 [README.md](../README.md) 了解项目概况
   - 查看 [DEVELOPMENT.md](DEVELOPMENT.md) 了解开发流程
   - 参考 [AUTOMATION.md](AUTOMATION.md) 了解自动化功能

2. **环境配置**：
   - 查看 [VERSION_REQUIREMENTS.md](VERSION_REQUIREMENTS.md) 了解版本要求
   - 使用 [tools/check-versions.bat](../tools/check-versions.bat) 检查环境

3. **日常开发**：
   - 利用编辑器自动化功能提高效率
   - 使用 VS Code 任务快速执行常用操作
   - 参考 [scripts/](../scripts/) 目录中的脚本

4. **问题排查**：
   - 查看相关文档寻找解决方案
   - 使用 [tools/](../tools/) 目录中的工具脚本
   - 参考 [TYPESCRIPT_FIXES.md](TYPESCRIPT_FIXES.md) 解决 TypeScript 问题
   - 使用诊断脚本快速定位问题

## 更新日志

本文档会随着项目的发展而更新，最近更新时间请查看文件属性。
