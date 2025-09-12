# 项目编译指南

本文档详细说明了UG管理系统的编译流程和方法。

## 编译前准备

在编译项目之前，请确保已完成以下准备工作：

1. 安装Node.js 20.19.0
2. 安装pnpm 8.15.8
3. 安装所有项目依赖

可以通过运行以下脚本自动完成环境设置：

```bash
scripts\setup-environment.bat
```

## 前端项目编译

前端项目基于UMI框架，使用以下命令进行编译：

```bash
cd frontend
pnpm build
```

或者使用项目提供的自动化脚本：

```bash
scripts\auto-build.bat
```

### 编译配置

前端编译配置位于[frontend/.umirc.ts](../frontend/.umirc.ts)文件中，主要配置项包括：

- 禁用MFSU以避免编译问题
- 路由配置
- Ant Design配置
- 状态管理配置
- 权限控制配置
- 请求配置
- 开发代理配置

### 编译输出

编译成功后，前端项目将在`frontend/dist`目录下生成构建产物。

## 后端项目编译

后端项目基于Egg.js框架，通常不需要传统的构建步骤。项目使用TypeScript，可以通过类型检查来验证代码：

```bash
cd backend
pnpm run type-check
```

## 完整项目编译流程

使用项目提供的自动化脚本可以一键完成整个项目的编译：

```bash
scripts\auto-build.bat
```

该脚本会依次执行以下操作：

1. 进入前端目录并执行构建
2. 进入后端目录并执行TypeScript编译检查

## 编译结果

### 成功编译示例

```
info  - Umi v4.4.12
info  - Preparing...
✔ Webpack
  Compiled successfully in 23.85s
info  - Memory Usage: 425.45 MB (RSS: 530.59 MB)
```

### 常见问题及解决方案

1. **编译卡住**: 如果编译过程长时间无响应，可以尝试重启终端并重新执行编译命令。

2. **内存不足**: 如果编译过程中出现内存不足错误，可以尝试关闭其他应用程序释放内存。

3. **依赖问题**: 如果编译失败并提示依赖问题，可以尝试重新安装依赖：
   ```bash
   pnpm install
   ```

## 编译验证

编译完成后，可以通过以下方式验证编译结果：

1. 检查前端`dist`目录是否生成了构建产物
2. 运行类型检查确保无错误：
   ```bash
   pnpm --filter ug-frontend run type-check
   pnpm --filter ug-backend run type-check
   ```

## 自动化编译

项目提供了以下自动化编译相关脚本：

- [scripts/auto-build.bat](../scripts/auto-build.bat) - 自动构建项目
- [scripts/auto-dev-server.bat](../scripts/auto-dev-server.bat) - 启动开发服务器
- [scripts/auto-type-check.bat](../scripts/auto-type-check.bat) - 自动类型检查

可以通过VS Code任务运行这些脚本，也可以直接在命令行中执行。
