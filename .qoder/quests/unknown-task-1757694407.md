# 项目文档清单

## 项目概述文档

- [README.md](README.md) - 项目主文档，包含技术栈、环境要求、快速开始指南、项目结构、文档索引、自动化脚本、VS Code任务和扩展推荐等信息

## 配置文件

- [backend/.env](backend/.env) - 后端环境变量配置
- [frontend/.env](frontend/.env) - 前端环境变量配置
- [backend/config/config.default.js](backend/config/config.default.js) - 后端默认配置
- [backend/config/config.local.ts](backend/config/config.local.ts) - 后端本地配置 (已更新为 TypeScript)
- [backend/config/plugin.js](backend/config/plugin.js) - 后端插件配置
- [frontend/.umirc.ts](frontend/.umirc.ts) - 前端 UMI 配置 (已修复)
- [.vscode/settings.json](.vscode/settings.json) - VS Code 设置
- [.vscode/tasks.json](.vscode/tasks.json) - VS Code 任务配置
- [.vscode/extensions.json](.vscode/extensions.json) - VS Code 扩展推荐
- [.vscode/cspell.json](.vscode/cspell.json) - 拼写检查配置
- [frontend/tsconfig.json](frontend/tsconfig.json) - 前端 TypeScript 配置
- [backend/tsconfig.json](backend/tsconfig.json) - 后端 TypeScript 配置
- [frontend/typings.d.ts](frontend/typings.d.ts) - 前端类型声明文件

## docs目录文档

- [docs/解决Egg模块找不到问题.md](docs/解决Egg模块找不到问题.md) - 解决 Egg 模块找不到问题
- [docs/DEPENDENCY_MANAGEMENT.md](docs/DEPENDENCY_MANAGEMENT.md) - 依赖管理指南
- [docs/DEPENDENCY_VERSION_REPORT.md](docs/DEPENDENCY_VERSION_REPORT.md) - 依赖版本检查报告
- [docs/TYPESCRIPT_URILIB_ERROR_FIX.md](docs/TYPESCRIPT_URILIB_ERROR_FIX.md) - TypeScript urllib 私有标识符错误修复指南
- [docs/PROJECT_COMPILATION.md](docs/PROJECT_COMPILATION.md) - 项目编译指南
- [docs/AUTOMATION.md](docs/AUTOMATION.md) - 自动化功能指南
- [docs/COMPILATION_RESULT.md](docs/COMPILATION_RESULT.md) - 项目编译结果报告
- [docs/TYPESCRIPT_EGG_TYPE_DEFINITION_FIX.md](docs/TYPESCRIPT_EGG_TYPE_DEFINITION_FIX.md) - TypeScript Egg 类型定义问题修复指南

## 项目知识库文档

### 系统概述
- 系统概述

### 依赖管理
- 依赖更新日志

### 开发工具
- 拼写检查指南
- 自动化功能指南
- CURSOR AI编辑器技术研究

### 项目规则
- 项目规则指南

### API接口
- 发送验证码接口
- 发送邮箱验证码接口

### 故障排除
- 故障排除与修复指南
- SQL工具配置指南
- Qoder diff apply问题修复指南

### 开发环境
- VS Code快捷键配置指南

### 项目规范
- Qoder规则：UG项目规范

### 项目结构
- 目录结构

### 前端架构
- 前端组件架构
- 状态管理机制
- API服务集成
- 权限包装器实现

### 后端架构
- API端点设计
- 服务层架构
  - 认证服务模块
  - 用户服务模块
  - 角色服务模块
  - 权限服务模块
  - 基础服务模块
- 数据模型定义
  - 用户模型 (User)
  - 角色模型 (Role)
  - 权限模型 (Permission)
  - 用户角色关联模型 (UserRole)
  - 角色权限关联模型 (RolePermission)
- 中间件机制

### 数据库设计
- 表结构设计
- 实体关系图
- 索引与性能优化
- 迁移与种子数据
- 软删除机制

### 权限系统
- RBAC数据模型
- 后端权限控制机制
- 前端动态权限渲染
- 权限分配与管理

### 部署指南
- 开发环境部署
- 生产环境部署
- 容器配置与网络
- 环境变量管理
- 部署问题排查

### 开发指南
- 开发环境搭建
- 开发流程与协作规范
- API开发全流程指南
- 测试与诊断工具使用

### API参考
- 认证API
  - 登录接口
  - 注册接口
  - 获取当前用户信息
  - 刷新Token接口
  - 退出登录接口
- 用户管理API
  - 获取用户列表
  - 创建用户
  - 获取用户详情
  - 更新用户信息
  - 删除用户
  - 更新用户状态
  - 重置用户密码
  - 更新用户角色
- 角色管理API
  - 获取角色列表
  - 创建角色
  - 获取角色详情
  - 更新角色
  - 删除角色
  - 角色权限管理
    - 获取角色权限
    - 更新角色权限
- 权限管理API
  - 获取权限树
  - 获取权限列表
  - 创建权限
  - 更新权限
  - 删除权限
- 系统健康API

## 自动化脚本

- [scripts/auto-build.bat](scripts/auto-build.bat) - 自动构建脚本
- [scripts/auto-dev-server.bat](scripts/auto-dev-server.bat) - 开发服务器启动脚本
- [scripts/auto-format-and-lint.bat](scripts/auto-format-and-lint.bat) - 代码格式化和检查脚本
- [scripts/auto-type-check.bat](scripts/auto-type-check.bat) - 类型检查脚本
- [scripts/init-database.bat](scripts/init-database.bat) - 数据库初始化脚本
- [scripts/setup-environment.bat](scripts/setup-environment.bat) - 环境设置脚本
- [scripts/diagnostic-checks.bat](scripts/diagnostic-checks.bat) - 诊断检查脚本
- [scripts/performance-analysis.bat](scripts/performance-analysis.bat) - 性能分析脚本
- [scripts/api-tests.bat](scripts/api-tests.bat) - API 接口测试脚本
- [scripts/security-scan.bat](scripts/security-scan.bat) - 安全扫描脚本
- [scripts/spellcheck.bat](scripts/spellcheck.bat) - 拼写检查脚本
- [scripts/test-encoding.bat](scripts/test-encoding.bat) - 终端编码测试脚本
- [scripts/fix-typescript-issues.bat](scripts/fix-typescript-issues.bat) - TypeScript 问题修复脚本
- [scripts/fix-frontend-types.bat](scripts/fix-frontend-types.bat) - 前端类型问题修复脚本
- [scripts/refresh-vscode-window.bat](scripts/refresh-vscode-window.bat) - VS Code 窗口刷新脚本
- [scripts/clean-and-rebuild.bat](scripts/clean-and-rebuild.bat) - 清理和重建项目脚本
- [scripts/fix-frontend-typings.bat](scripts/fix-frontend-typings.bat) - 前端类型声明修复脚本
- [scripts/fix-umi-config.bat](scripts/fix-umi-config.bat) - UMI 配置修复脚本

## .qoder目录文档

- [.qoder/quests/add-basic-pages.md](.qoder/quests/add-basic-pages.md) - 添加基础页面设计文档
- [.qoder/quests/check-qoder-configuration.md](.qoder/quests/check-qoder-configuration.md) - Qoder配置检查文档
- [.qoder/quests/layout-specification-design.md](.qoder/quests/layout-specification-design.md) - 布局规范设计文档

## 前端代码文档

- [frontend/src/pages/Dashboard.tsx](frontend/src/pages/Dashboard.tsx) - 仪表盘页面
- [frontend/src/pages/Dashboard.module.css](frontend/src/pages/Dashboard.module.css) - 仪表盘页面样式
- [frontend/typings.d.ts](frontend/typings.d.ts) - 前端类型声明文件

## 后端代码文档

- [backend/app.ts](backend/app.ts) - 应用启动文件 (已更新为 TypeScript)
- [backend/app/controller/home.ts](backend/app/controller/home.ts) - 主控制器 (已更新为 TypeScript)
- [backend/app/router.ts](backend/app/router.ts) - 路由配置 (已更新为 TypeScript)
- [backend/scripts/startup-timer.js](backend/scripts/startup-timer.js) - 启动计时器脚本

## 文档一致性检查结果

经过对项目实际文件结构和配置的检查，发现以下需要更新的文档内容：

### 1. 依赖管理文档更新
- [docs/DEPENDENCY_MANAGEMENT.md](docs/DEPENDENCY_MANAGEMENT.md) 中的部分依赖版本信息需要更新，以匹配实际使用的版本

### 2. CODE_INDEX.md 文档索引更新
- [CODE_INDEX.md](CODE_INDEX.md) 需要更新以反映最新的文档结构和新增的文件

### 3. 技术栈版本更新
- 前端实际使用的技术栈版本：
  - UMI: ^4.4.12 (@umijs/max)
  - Ant Design: ^5.21.0
  - React 相关：@types/react@^18.2.0, @types/react-dom@^18.2.0
  - TypeScript: ^5.9.2
- 后端实际使用的技术栈版本：
  - Egg.js: ^3.31.0
  - Sequelize 相关：egg-sequelize@^5.0.0
  - TypeScript: ^5.9.2

### 4. 环境配置更新
- Node.js 版本要求：20.19.0
- pnpm 版本要求：8.15.8

所有文档应按照[文档更新流程](docs/PROJECT_RULES.md)进行更新，确保与实际项目保持一致。
