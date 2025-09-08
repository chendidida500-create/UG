# 项目版本要求

本文档详细说明了 UG 管理系统项目所需的所有软件和依赖版本要求。

## 核心运行时环境

### Node.js

- **版本要求**: 20.19.0
- **说明**: 项目前后端均需要此版本或更高版本
- **配置文件**:
  - 根目录 [package.json](file:///e:/YSY/UG/package.json)
  - 前端 [frontend/package.json](file:///e:/YSY/UG/frontend/package.json)
  - 后端 [backend/package.json](file:///e:/YSY/UG/backend/package.json)

### pnpm

- **版本要求**: 8.15.8
- **说明**: 项目统一使用 pnpm 作为包管理器
- **配置文件**: [package.json](file:///e:/YSY/UG/package.json)

## 数据库环境

### MySQL

- **版本要求**: 8.0 或更高版本
- **说明**: 用于存储用户、角色、权限等核心数据

### Redis (可选)

- **版本要求**: 6.x 或更高版本
- **说明**: 用于缓存和会话存储

## 主要依赖版本

### 前端依赖

- **React**: 18.3.1
- **React DOM**: 18.3.1
- **@types/react**: 18.3.24
- **@types/react-dom**: 18.3.1
- **TypeScript**: 5.9.2
- **UMI**: 4.4.12

### 后端依赖

- **Egg.js**: 3.31.0
- **egg-cors**: ^3.0.1
- **egg-jwt**: ^3.1.7
- **egg-scripts**: ^3.1.0
- **egg-sequelize**: ^6.0.0
- **sequelize**: ^6.32.1

### 开发依赖

- **TypeScript**: 5.9.2 (根目录)
- **@types/node**: ^24.3.1
- **ESLint**: ^9.35.0
- **Prettier**: ^3.0.3

## 构建工具

### Webpack

- **版本要求**: 5.x
- **说明**: 通过 UMI 框架间接使用

### Babel

- **版本要求**: 7.x
- **说明**: 通过 UMI 框架间接使用

## 测试工具

### Jest

- **版本要求**: 30.x
- **说明**: 用于前端单元测试

### Mocha

- **版本要求**: 10.x
- **说明**: 用于后端单元测试

## 部署工具

### PM2 (生产环境)

- **版本要求**: 5.x
- **说明**: 用于 Node.js 应用进程管理

### Nginx (生产环境)

- **版本要求**: 1.20.x 或更高版本
- **说明**: 用于反向代理和静态资源服务

## 开发工具

### VS Code (推荐)

- **版本要求**: 1.80.x 或更高版本
- **说明**: 推荐的开发 IDE

### Git

- **版本要求**: 2.30.x 或更高版本
- **说明**: 用于版本控制

## 版本检查脚本

项目提供了版本检查脚本，可以验证当前环境是否符合要求：

```cmd
cd e:\YSY\UG
tools\check-versions.bat
```

## 版本升级指南

如果需要升级项目依赖版本，请参考 [VERSION_UPGRADE_GUIDE.md](VERSION_UPGRADE_GUIDE.md)。

## 注意事项

1. 所有版本要求都是经过测试验证的稳定版本
2. 不建议使用更高版本，除非经过充分测试
3. 在团队协作中，请确保所有成员使用相同的版本
4. 生产环境部署时，请严格按照版本要求配置