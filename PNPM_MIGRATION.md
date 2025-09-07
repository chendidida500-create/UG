# PNPM 包管理器迁移说明

## 概述

本项目现已完全迁移到 **pnpm** 作为唯一的包管理器，版本为 `8.15.8`。所有之前的 npm 和 yarn 配置已被移除。

## 为什么选择 pnpm？

1. **性能优势**:
   - 安装速度比 npm 和 Yarn Classic 更快
   - 通过硬链接和符号链接节省磁盘空间
   - 内存使用效率更高

2. **严格的依赖管理**:
   - 防止幽灵依赖问题
   - 确保依赖的一致性和可重现性
   - 更好的依赖隔离

3. **UMI 官方推荐**:
   - UMI 团队推荐使用 pnpm
   - 与 UMI 4.x 兼容性最佳

## 配置变更

### 已更新的文件

1. **package.json 文件**:
   - 所有 `package.json` 文件中的 `packageManager` 字段已设置为 `"pnpm@8.15.8"`
   - 所有脚本命令中的 `npm` 和 `yarn` 已替换为 `pnpm`

2. **UMI 配置**:
   - `frontend/.umirc.ts` 中的 `npmClient` 已设置为 `'pnpm'`

3. **工作区配置**:
   - 新增 `pnpm-workspace.yaml` 文件配置工作区

4. **镜像源配置**:
   - `.npmrc` 文件配置淘宝镜像源
   - `.pnpmfile.cjs` 文件配置 pnpm 镜像源

### 已移除的配置

1. **yarn 相关文件**:
   - `yarn.lock` 文件
   - `.yarnrc` 文件

2. **npm 相关文件**:
   - `package-lock.json` 文件（如果存在）

## 使用说明

### 安装依赖

```bash
# 安装所有依赖
pnpm install

# 添加新依赖
pnpm add <package-name>

# 添加开发依赖
pnpm add -D <package-name>

# 移除依赖
pnpm remove <package-name>
```

### 运行脚本

```bash
# 启动开发服务器
pnpm dev

# 构建项目
pnpm build

# 运行测试
pnpm test

# 运行 lint
pnpm lint
```

### 工作区命令

```bash
# 在特定工作区运行命令
pnpm --filter frontend dev
pnpm --filter backend dev

# 在所有工作区运行命令
pnpm -r dev
```

## 常见问题

### 1. 如何安装 pnpm？

```bash
# 使用 npm 安装
npm install -g pnpm@8.15.8

# 或使用官方安装脚本
curl -fsSL https://get.pnpm.io/install.sh | sh -
```

### 2. 如何验证配置是否正确？

运行项目根目录下的验证脚本：

```bash
node scripts/verify-pnpm-setup.js
```

### 3. 如果之前使用 npm 或 yarn 安装了依赖怎么办？

请删除 `node_modules` 目录和相关的 lock 文件，然后使用 pnpm 重新安装：

```bash
# 删除旧的依赖文件
rm -rf node_modules
rm -f package-lock.json yarn.lock

# 使用 pnpm 安装
pnpm install
```

## 注意事项

1. **不要混用包管理器**:
   - 请始终使用 pnpm 管理依赖
   - 避免使用 npm 或 yarn 命令

2. **版本锁定**:
   - 项目使用 `pnpm-lock.yaml` 文件锁定依赖版本
   - 请将此文件提交到版本控制系统

3. **团队协作**:
   - 确保团队成员都使用 pnpm 8.15.8
   - 可以使用 `.nvmrc` 文件统一 Node.js 版本

## 故障排除

### 1. pnpm 命令未找到

确保 pnpm 已正确安装并添加到系统 PATH 中：

```bash
# 检查 pnpm 版本
pnpm --version

# 如果未安装，重新安装
npm install -g pnpm@8.15.8
```

### 2. 依赖安装失败

尝试清除缓存后重新安装：

```bash
# 清除 pnpm 缓存
pnpm store prune

# 重新安装依赖
pnpm install
```

### 3. 运行时错误

确保所有脚本都使用 pnpm 运行，并检查 `package.json` 中的脚本配置是否正确。