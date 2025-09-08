# 项目版本锁定说明

本文档说明了 UG 管理系统项目中所有关键依赖的固定版本要求。这些版本已被锁定，不允许随意升级。

## 核心运行时环境

### Node.js

- **版本**: 20.19.0
- **说明**: 项目前后端均需要此版本
- **配置文件**:
  - 根目录 [package.json](file:///e:/YSY/UG/package.json)
  - 前端 [frontend/package.json](file:///e:/YSY/UG/frontend/package.json)
  - 后端 [backend/package.json](file:///e:/YSY/UG/backend/package.json)

### pnpm

- **版本**: 8.15.8
- **说明**: 项目统一使用 pnpm 作为包管理器
- **配置文件**: [package.json](file:///e:/YSY/UG/package.json)

## 主要框架版本

### 前端框架

#### UMI

- **版本**: 4.4.12
- **说明**: 前端核心框架
- **配置文件**: [frontend/package.json](file:///e:/YSY/UG/frontend/package.json)
- **相关依赖**:
  - [@umijs/max](file:///e:/YSY/UG/frontend/node_modules/@umijs/max): 4.4.12

#### React

- **版本**: 18.3.1
- **说明**: 前端 UI 库
- **配置文件**: [frontend/package.json](file:///e:/YSY/UG/frontend/package.json)
- **相关依赖**:
  - [react](file:///e:/YSY/UG/frontend/node_modules/react): 18.3.1
  - [react-dom](file:///e:/YSY/UG/frontend/node_modules/react-dom): 18.3.1
  - [@types/react](file:///e:/YSY/UG/frontend/node_modules/@types/react): 18.3.24
  - [@types/react-dom](file:///e:/YSY/UG/frontend/node_modules/@types/react-dom): 18.3.1

### 后端框架

#### Egg.js

- **版本**: 3.31.0
- **说明**: 后端核心框架
- **配置文件**: [backend/package.json](file:///e:/YSY/UG/backend/package.json)
- **相关依赖**:
  - [egg](file:///e:/YSY/UG/backend/node_modules/egg): 3.31.0

## 开发工具版本

### TypeScript

- **版本**: 5.9.2
- **说明**: 项目统一使用的 TypeScript 版本
- **配置文件**: [package.json](file:///e:/YSY/UG/package.json) (根目录)

## 版本锁定原因

1. **稳定性**: 这些版本已经过充分测试，确保项目功能正常
2. **兼容性**: 各依赖之间版本兼容性已验证
3. **安全性**: 这些版本没有已知的重大安全漏洞
4. **维护性**: 团队熟悉这些版本的特性和问题

## 版本更新流程

如果确实需要更新版本，必须遵循以下流程：

1. **评估必要性**: 确定更新的原因和收益
2. **兼容性测试**: 测试新版本与现有代码的兼容性
3. **团队评审**: 组织团队评审更新的影响
4. **灰度发布**: 先在测试环境部署验证
5. **文档更新**: 更新相关文档说明

## 禁止的操作

以下操作是被禁止的：

1. 随意升级任何核心依赖版本
2. 在没有团队同意的情况下修改版本锁定
3. 使用不兼容的依赖版本
4. 忽略版本锁定文档的要求

## 版本检查脚本

项目提供了版本检查脚本，可以验证当前环境是否符合版本要求：

```cmd
cd e:\YSY\UG
tools\check-versions.bat
```

## 注意事项

1. 所有版本要求都是经过严格评估的
2. 不建议使用更高版本，除非经过充分测试和团队同意
3. 在团队协作中，请确保所有成员使用相同的版本
4. 生产环境部署时，请严格按照版本要求配置