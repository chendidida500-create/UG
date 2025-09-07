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
