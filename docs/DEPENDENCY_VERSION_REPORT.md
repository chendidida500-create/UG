# 项目依赖版本检查报告

本文档记录了 UG 管理系统项目中所有依赖的当前版本状态，以及与指定版本环境的对比。

## 检查时间

2025年9月7日

## 核心运行时环境

### Node.js

- **要求版本**: 20.19.0
- **当前版本**: v20.19.0
- **状态**: ✅ 符合要求

### pnpm

- **要求版本**: 8.15.8
- **当前版本**: 8.15.8
- **状态**: ✅ 符合要求

## 根目录依赖

### TypeScript

- **要求版本**: 5.9.2
- **当前版本**: 5.9.2
- **状态**: ✅ 符合要求
- **配置文件**: [package.json](file:///e:/YSY/UG/package.json)

### @types/node

- **要求版本**: ^24.3.1
- **当前版本**: 24.3.1
- **状态**: ✅ 符合要求
- **配置文件**: [package.json](file:///e:/YSY/UG/package.json)

## 前端依赖

### React 核心库

- **React**
  - **要求版本**: 18.3.1
  - **当前版本**: 18.3.1
  - **状态**: ✅ 符合要求
  - **配置文件**: [frontend/package.json](file:///e:/YSY/UG/frontend/package.json)

- **React DOM**
  - **要求版本**: 18.3.1
  - **当前版本**: 18.3.1
  - **状态**: ✅ 符合要求
  - **配置文件**: [frontend/package.json](file:///e:/YSY/UG/frontend/package.json)

### UMI 框架

- **UMI**
  - **要求版本**: 4.4.12
  - **当前版本**: 4.4.12
  - **状态**: ✅ 符合要求
  - **配置文件**: [frontend/package.json](file:///e:/YSY/UG/frontend/package.json)

- **@umijs/max**
  - **要求版本**: 4.4.12
  - **当前版本**: 4.4.12
  - **状态**: ✅ 符合要求
  - **配置文件**: [frontend/package.json](file:///e:/YSY/UG/frontend/package.json)

### React 类型定义

- **@types/react**
  - **要求版本**: 18.3.1
  - **当前版本**: 18.3.1
  - **状态**: ✅ 符合要求
  - **配置文件**: [frontend/package.json](file:///e:/YSY/UG/frontend/package.json)

- **@types/react-dom**
  - **要求版本**: 18.3.1
  - **当前版本**: 18.3.1
  - **状态**: ✅ 符合要求
  - **配置文件**: [frontend/package.json](file:///e:/YSY/UG/frontend/package.json)

## 后端依赖

### Egg.js 框架

- **Egg.js**
  - **要求版本**: 3.31.0
  - **当前版本**: 3.31.0
  - **状态**: ✅ 符合要求
  - **配置文件**: [backend/package.json](file:///e:/YSY/UG/backend/package.json)

## 其他依赖状态

### 前端其他依赖

- [@ant-design/icons](file:///e:/YSY/UG/frontend/node_modules/@ant-design/icons): 6.0.1
- [@ant-design/pro-components](file:///e:/YSY/UG/frontend/node_modules/@ant-design/pro-components): 2.8.10
- [ahooks](file:///e:/YSY/UG/frontend/node_modules/ahooks): 3.9.5
- [antd](file:///e:/YSY/UG/frontend/node_modules/antd): 5.27.3
- [axios](file:///e:/YSY/UG/frontend/node_modules/axios): 1.11.0
- [dayjs](file:///e:/YSY/UG/frontend/node_modules/dayjs): 1.11.18
- [lodash](file:///e:/YSY/UG/frontend/node_modules/lodash): 4.17.21

### 后端其他依赖

- [bcryptjs](file:///e:/YSY/UG/backend/node_modules/bcryptjs): 3.0.2
- [dayjs](file:///e:/YSY/UG/backend/node_modules/dayjs): 1.11.18
- [egg-cors](file:///e:/YSY/UG/backend/node_modules/egg-cors): 3.0.1
- [egg-jwt](file:///e:/YSY/UG/backend/node_modules/egg-jwt): 3.1.7
- [egg-scripts](file:///e:/YSY/UG/backend/node_modules/egg-scripts): 3.1.0
- [egg-sequelize](file:///e:/YSY/UG/backend/node_modules/egg-sequelize): 6.0.0
- [egg-validate](file:///e:/YSY/UG/backend/node_modules/egg-validate): 2.0.2
- [jsonwebtoken](file:///e:/YSY/UG/backend/node_modules/jsonwebtoken): 9.0.2
- [lodash](file:///e:/YSY/UG/backend/node_modules/lodash): 4.17.21
- [mysql2](file:///e:/YSY/UG/backend/node_modules/mysql2): 3.14.4
- [sequelize](file:///e:/YSY/UG/backend/node_modules/sequelize): 6.37.7
- [sequelize-cli](file:///e:/YSY/UG/backend/node_modules/sequelize-cli): 6.6.3
- [uuid](file:///e:/YSY/UG/backend/node_modules/uuid): 12.0.0

## 过时依赖检查

通过运行 `pnpm outdated` 命令检查，未发现过时的依赖包。

## 总结

项目中的所有关键依赖版本均符合指定的版本环境要求：

✅ **Node.js**: 20.19.0 (符合要求)  
✅ **TypeScript**: 5.9.2 (符合要求)  
✅ **React**: 18.3.1 (符合要求)  
✅ **UMI**: 4.4.12 (符合要求)  
✅ **Egg.js**: 3.31.0 (符合要求)

所有依赖版本均已锁定，确保了项目的稳定性和一致性。

## 建议

1. 继续使用版本检查脚本定期验证依赖版本
2. 遵循版本锁定规范，避免随意升级依赖
3. 如需更新依赖，请参考 [VERSION_UPGRADE_GUIDE.md](file:///e:/YSY/UG/docs/VERSION_UPGRADE_GUIDE.md)
4. 保持对安全漏洞的关注，及时应用安全补丁