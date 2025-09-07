# 版本升级指南

本文档说明如何将 UG 管理系统升级到指定的依赖版本。

## 目标版本

- Node.js: 20.19.0
- TypeScript: 5.9.2
- React: 18.3.1
- React DOM: 18.3.1
- @types/react: 18.3.24
- @types/react-dom: 18.3.1

## 升级步骤

### 1. 升级 Node.js 版本

如果尚未安装 Node.js 20.19.0，请按照以下步骤操作：

1. 下载并安装 nvm-windows:
   - 访问 https://github.com/coreybutler/nvm-windows/releases
   - 下载最新版本的 nvm-setup.exe
   - 运行安装程序

2. 安装并使用 Node.js 20.19.0:

   ```cmd
   nvm install 20.19.0
   nvm use 20.19.0
   ```

3. 验证版本:
   ```cmd
   node --version
   ```

### 2. 更新项目配置

项目配置已在以下文件中更新：

- `package.json` (根目录)
- `frontend/package.json`
- `backend/package.json`
- `README.md`

### 3. 安装依赖

运行以下脚本以安装正确的依赖版本：

```cmd
cd e:\YSY\UG
tools\update-and-install.bat
```

### 4. 验证安装

运行以下脚本以验证安装的版本：

```cmd
cd e:\YSY\UG
tools\check-versions.bat
```

## 故障排除

### 如果遇到权限问题

在 Windows 上，可能需要以管理员身份运行命令提示符。

### 如果遇到依赖冲突

1. 清理所有 node_modules 目录和 lock 文件
2. 运行 `pnpm store prune` 清理缓存
3. 重新安装依赖

### 如果 TypeScript 编译失败

1. 检查 tsconfig.json 配置
2. 确保所有类型定义包版本兼容
3. 运行 `pnpm tsc --noEmit` 查看具体错误信息

## 相关文件

- `tools/update-and-install.bat` - 更新和安装脚本
- `tools/check-versions.bat` - 版本检查脚本
- `tools/upgrade-nodejs.bat` - Node.js 升级脚本
- `.nvmrc` - Node.js 版本配置文件

```

```
