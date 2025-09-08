# 项目依赖管理规范

本文档详细说明了 UG 管理系统项目的依赖管理策略和最佳实践，以确保项目依赖版本的一致性和可维护性。

## 依赖管理策略

### 1. 版本锁定机制

项目使用多种机制确保依赖版本的一致性：

1. **resolutions 字段** (根目录 [package.json](file:///e:/YSY/UG/package.json)):
   - 用于强制解决依赖版本冲突
   - 确保整个工作区使用统一的依赖版本

2. **overrides 字段** (根目录和前端 [package.json](file:///e:/YSY/UG/package.json)):
   - 用于覆盖依赖包的子依赖版本
   - 确保特定依赖使用指定版本

3. **devDependencies 字段** (各项目 [package.json](file:///e:/YSY/UG/package.json)):
   - 明确指定开发依赖的版本要求
   - 确保开发工具版本一致性

### 2. 依赖分类管理

#### 核心依赖
- **React/React DOM**: 18.3.1
- **TypeScript**: 5.9.2
- **Egg.js**: 3.31.0

#### 开发工具依赖
- **ESLint**: ^8.0.0
- **Prettier**: ^3.0.0
- **Jest**: 30.x

#### 类型定义依赖
- **@types/react**: 18.3.1
- **@types/react-dom**: 18.3.1
- **@types/node**: ^24.3.1

## 配置文件统一管理

### 1. TypeScript 配置统一

项目使用继承机制统一 TypeScript 配置：

1. **基础配置**: [config/tsconfig/base.json](file:///e:/YSY/UG/config/tsconfig/base.json)
   - 定义通用的编译选项
   - 设置基础的类型检查规则

2. **前端配置**: [config/tsconfig/frontend.json](file:///e:/YSY/UG/config/tsconfig/frontend.json)
   - 继承基础配置
   - 添加前端特定的配置（如 JSX 支持）

3. **后端配置**: [config/tsconfig/backend.json](file:///e:/YSY/UG/config/tsconfig/backend.json)
   - 继承基础配置
   - 添加后端特定的配置

### 2. ESLint 配置统一

1. **基础配置**: [config/eslint/base.json](file:///e:/YSY/UG/config/eslint/base.json)
   - 定义通用的 ESLint 规则
   - 设置基础的 TypeScript 和 React 规则

2. **前端配置**: [config/eslint/frontend.json](file:///e:/YSY/UG/config/eslint/frontend.json)
   - 继承基础配置
   - 添加前端特定的规则和插件

3. **后端配置**: [config/eslint/backend.json](file:///e:/YSY/UG/config/eslint/backend.json)
   - 继承基础配置
   - 添加后端特定的规则（如 Egg.js 规则）

### 3. Prettier 配置统一

1. **基础配置**: [config/prettier/base.json](file:///e:/YSY/UG/config/prettier/base.json)
   - 定义通用的代码格式化规则

2. **前端配置**: [config/prettier/frontend.json](file:///e:/YSY/UG/config/prettier/frontend.json)
   - 继承基础配置
   - 保持与基础配置一致

## 依赖版本更新流程

### 1. 小版本更新
1. 检查依赖的更新日志和变更说明
2. 更新 [package.json](file:///e:/YSY/UG/package.json) 中的版本号
3. 运行 `pnpm install` 安装新版本
4. 运行测试确保兼容性
5. 提交更改并更新 [DEPENDENCY_UPDATES.md](DEPENDENCY_UPDATES.md)

### 2. 大版本更新
1. 评估更新的影响范围
2. 创建特性分支进行测试
3. 更新所有相关配置文件
4. 修改代码以适配新版本API
5. 全面测试确保功能正常
6. 更新文档说明
7. 合并到主分支

## 依赖冲突解决

### 1. 识别冲突
使用以下命令识别依赖冲突：
```bash
pnpm list --depth=0
pnpm why <package-name>
```

### 2. 解决冲突
1. 使用 resolutions 字段强制指定版本
2. 使用 overrides 字段覆盖子依赖版本
3. 联系依赖包维护者报告问题
4. 考虑替换有问题的依赖包

## 最佳实践

### 1. 版本指定策略
- 使用精确版本号（如 18.3.1）确保一致性
- 使用兼容版本前缀（如 ^8.0.0）允许小版本更新
- 避免使用最新版本前缀（如 * 或 latest）

### 2. 依赖范围控制
- 只在需要的项目中安装依赖
- 避免在根目录安装不必要的依赖
- 定期清理未使用的依赖

### 3. 配置文件维护
- 保持配置文件的一致性
- 定期审查和更新配置
- 文档化所有配置变更

## 相关文档

- [VERSION_REQUIREMENTS.md](VERSION_REQUIREMENTS.md) - 项目版本要求
- [VERSION_UPGRADE_GUIDE.md](VERSION_UPGRADE_GUIDE.md) - 版本升级指南
- [DEPENDENCY_UPDATES.md](DEPENDENCY_UPDATES.md) - 依赖更新日志
- [ESLINT_PRETTIER_CONFIG.md](ESLINT_PRETTIER_CONFIG.md) - ESLint 和 Prettier 配置规范