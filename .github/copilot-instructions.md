# GitHub Copilot Instructions for UG Codebase

## 项目架构

- 全栈系统，前端基于 UmiJS + React + Ant Design + TypeScript，后端基于 Egg.js + Sequelize + MySQL。
- 目录结构清晰：`frontend/`（页面、组件、配置）、`backend/`（服务、模型、数据库）、`scripts/`（自动化）、`docs/`（开发文档）。
- 前后端通过 RESTful API 通信，前端环境变量 `API_BASE_URL` 指向后端服务。

## 关键开发流程

- 所有依赖统一用 pnpm 管理，分别在 `frontend/` 和 `backend/` 目录下安装。
- 推荐使用自动化脚本（位于 `scripts/`）完成环境设置、构建、格式化、类型检查、数据库初始化等：
  - `scripts/setup-environment.bat` 一键环境初始化
  - `scripts/auto-dev-server.bat` 启动前后端开发服务器
  - `scripts/auto-build.bat` 构建项目
  - `scripts/auto-format-and-lint.bat` 格式化和检查代码
  - `scripts/auto-type-check.bat` 类型检查
  - `scripts/init-database.bat` 初始化数据库
  - 其他脚本详见 README 和 scripts 目录
- 数据库迁移与种子数据通过 Sequelize CLI 管理，常用命令见 README。

## 项目约定与特殊模式

- 前端页面采用 Umi 约定式路由，页面文件放在 `frontend/src/pages/`，每个页面默认导出 React 组件。
- 后端 Egg.js 控制器、服务、模型分离，数据库模型定义在 `backend/models/`。
- 环境变量分别配置于 `frontend/.env` 和 `backend/.env`，注意端口和 API 地址一致性。
- 代码风格统一使用 Prettier，配置文件分别在前后端根目录，保存时自动格式化。
- 类型声明问题、依赖冲突、Umi 配置等常见问题有专用修复脚本（如 `fix-frontend-types.bat`、`fix-umi-config.bat`），详见 README。

## 重要文件/目录参考

- `frontend/src/pages/`：Umi 页面入口
- `backend/app/`：Egg.js 应用主入口
- `backend/models/`：Sequelize 数据库模型
- `scripts/`：自动化脚本集合
- `docs/`：开发文档与问题解决方案
- `README.md`：完整开发流程、常见问题、脚本说明

## 示例：常见开发任务

- 启动开发环境：`scripts/auto-dev-server.bat`
- 修复前端类型声明：`scripts/fix-frontend-typings.bat`
- 检查数据库迁移状态：`pnpm sequelize db:migrate:status`（在 backend 目录）

## 其他说明

- 项目已集成 VS Code 任务，可通过 `Tasks: Run Task` 快速执行常用脚本。
- 推荐安装 Prettier、ESLint、TypeScript、React 相关 VS Code 扩展。
- 遇到依赖或类型问题，优先查阅 docs/ 相关文档和运行对应修复脚本。

---

如需补充特殊约定、跨模块通信细节或遇到未覆盖的问题，请在 PR/Issue 中说明，便于 AI agent 持续优化协作。
