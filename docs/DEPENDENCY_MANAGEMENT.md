# 依赖管理指南

## 概述

本文档记录了 UG 项目中依赖管理的最佳实践、常见问题及解决方案。

## 依赖版本管理

### 后端依赖

| 包名          | 版本     | 说明                                                 |
| ------------- | -------- | ---------------------------------------------------- |
| egg           | ^3.31.0  | Egg.js 框架核心包                                    |
| egg-sequelize | ^5.0.0   | Sequelize ORM 插件                                   |
| egg-jwt       | ^3.1.0   | JWT 认证插件                                         |
| egg-cors      | ^3.0.1   | CORS 支持插件                                        |
| egg-validate  | ^2.0.2   | 参数验证插件（注意：最新版本为 2.0.2，不是 3.0.2）   |
| mysql2        | ^3.9.7   | MySQL 数据库驱动                                     |
| bcryptjs      | ^2.4.3   | 密码加密库                                           |
| lodash        | ^4.17.21 | 工具库                                               |
| moment        | ^2.30.1  | 日期处理库                                           |
| sequelize-cli | ^6.6.2   | Sequelize 命令行工具（替换错误的 egg-sequelize-cli） |

### 开发依赖

| 包名                             | 版本     | 说明                     |
| -------------------------------- | -------- | ------------------------ |
| egg-bin                          | ^6.10.0  | Egg.js 开发工具          |
| egg-scripts                      | ^3.0.1   | Egg.js 生产环境脚本      |
| sequelize-cli                    | ^6.6.2   | Sequelize 命令行工具     |
| egg-ts-helper                    | ^2.1.0   | TypeScript 辅助工具      |
| typescript                       | ^5.9.2   | TypeScript 编译器        |
| @types/node                      | ^20.12.7 | Node.js 类型声明         |
| @types/bcryptjs                  | ^2.4.6   | bcryptjs 类型声明        |
| @types/lodash                    | ^4.17.0  | lodash 类型声明          |
| eslint                           | ^8.57.0  | 代码检查工具             |
| prettier                         | ^3.3.0   | 代码格式化工具           |
| @typescript-eslint/eslint-plugin | ^7.7.0   | TypeScript ESLint 插件   |
| @typescript-eslint/parser        | ^7.7.0   | TypeScript ESLint 解析器 |
| autod                            | ^3.1.1   | 自动依赖检测工具         |
| cspell                           | ^8.0.0   | 拼写检查工具             |

## 常见问题及解决方案

### 1. 依赖包版本不存在

**问题**：安装依赖时提示 `No matching version found for egg-validate@^3.0.2`

**原因**：[egg-validate](file:///e:/YSY/UG/backend/node_modules/egg-validate) 包的最新版本是 `2.0.2`，而不是 `3.0.2`

**解决方案**：

1. 将 [backend/package.json](file:///e:/YSY/UG/backend/package.json) 中的依赖版本从 `^3.0.2` 修改为 `^2.0.2`
2. 删除 `node_modules` 和 `pnpm-lock.yaml`
3. 重新安装依赖

### 2. 依赖包名称错误

**问题**：安装依赖时提示 `GET https://registry.npmmirror.com/egg-sequelize-cli: Not Found - 404`

**原因**：使用了错误的包名 `egg-sequelize-cli`，正确名称应为 `sequelize-cli`

**解决方案**：

1. 将 [backend/package.json](file:///e:/YSY/UG/backend/package.json) 中的依赖从 `egg-sequelize-cli` 修改为 `sequelize-cli`
2. 删除 `node_modules` 和 `pnpm-lock.yaml`
3. 重新安装依赖

### 3. 镜像源配置问题

**问题**：依赖安装缓慢或失败

**解决方案**：

1. 在项目根目录创建 [.npmrc](file:///e:/YSY/UG/.npmrc) 文件
2. 配置合适的镜像源：
   ```
   registry=https://registry.npmjs.org/
   sass_binary_site=https://npmmirror.com/mirrors/node-sass/
   electron_mirror=https://npmmirror.com/mirrors/electron/
   puppeteer_download_host=https://npmmirror.com/mirrors/puppeteer/
   ```

## 自动化脚本

项目提供了以下依赖管理相关脚本：

- [scripts/setup-backend-dependencies.bat](file:///e:/YSY/UG/scripts/setup-backend-dependencies.bat) - 安装后端依赖
- [scripts/fix-backend-deps.bat](file:///e:/YSY/UG/scripts/fix-backend-deps.bat) - 修复后端依赖问题
- [scripts/verify-backend-deps.bat](file:///e:/YSY/UG/scripts/verify-backend-deps.bat) - 验证后端依赖
- [scripts/check-backend-dependencies.bat](file:///e:/YSY/UG/scripts/check-backend-dependencies.bat) - 检查后端依赖状态
- [scripts/validate-backend-setup.bat](file:///e:/YSY/UG/scripts/validate-backend-setup.bat) - 验证后端设置

## VS Code 任务

通过 VS Code 任务可以方便地管理依赖：

1. 按 `Ctrl+Shift+P` 打开命令面板
2. 输入并选择 `Tasks: Run Task`
3. 选择相应的依赖管理任务

## 最佳实践

1. **版本一致性**：确保所有配置文件中的依赖版本保持一致
2. **定期更新**：定期检查并更新依赖版本以获取最新功能和安全修复
3. **锁定版本**：使用 `pnpm-lock.yaml` 锁定依赖版本，确保团队成员使用相同版本
4. **工作区配置**：使用 `pnpm-workspace.yaml` 管理多包项目
5. **镜像源配置**：根据网络环境配置合适的镜像源
