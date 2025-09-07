# UG 管理系统 - 代码索引

这个索引文件旨在帮助开发者快速找到相关的代码文件和组件。

## 目录结构

```
UG/
├── frontend/                    # 前端项目
│   ├── src/
│   │   ├── components/         # 公共组件
│   │   ├── layouts/            # 布局组件
│   │   ├── models/             # 状态管理
│   │   ├── pages/              # 页面组件
│   │   ├── services/           # API 服务
│   │   ├── utils/              # 工具函数
│   │   ├── wrappers/           # 路由包装器
│   │   └── styles/             # 样式文件
│   ├── public/                 # 静态资源
│   └── config/                 # UMI 配置
├── backend/                    # 后端项目
│   ├── app/
│   │   ├── controller/         # 控制器
│   │   ├── service/            # 服务层
│   │   ├── model/              # 数据模型
│   │   ├── middleware/         # 中间件
│   │   └── extend/             # 扩展
│   ├── config/                 # 配置文件
│   ├── database/               # 数据库
│   │   ├── migrations/         # 迁移文件
│   │   └── seeders/            # 种子数据
│   ├── app.js                  # 应用入口
│   └── package.json            # 依赖配置
└── docs/                       # 项目文档
```

## 核心组件索引

### 前端核心组件

#### 动态组件

- [DynamicTable](../frontend/src/components/DynamicTable/index.tsx) - 动态表格组件
- [DynamicForm](../frontend/src/components/DynamicForm/index.tsx) - 动态表单组件
- [CrudComponent](../frontend/src/components/CrudComponent/index.tsx) - CRUD 组件

#### 布局组件

- [BasicLayout](../frontend/src/layouts/BasicLayout/index.tsx) - 主布局
- [AuthLayout](../frontend/src/layouts/AuthLayout/index.tsx) - 认证布局

#### 页面组件

- [Dashboard](../frontend/src/pages/Dashboard/index.tsx) - 仪表盘页面
- [Login](../frontend/src/pages/Auth/Login/index.tsx) - 登录页面
- [Register](../frontend/src/pages/Auth/Register/index.tsx) - 注册页面
- [UserManagement](../frontend/src/pages/System/User/index.tsx) - 用户管理页面
- [RoleManagement](../frontend/src/pages/System/Role/index.tsx) - 角色管理页面
- [PermissionManagement](../frontend/src/pages/System/Permission/index.tsx) - 权限管理页面
- [Profile](../frontend/src/pages/Profile/index.tsx) - 个人中心页面

#### 状态管理 (UMI Models)

- [auth](../frontend/src/models/auth.ts) - 认证模型
- [user](../frontend/src/models/user.ts) - 用户模型
- [role](../frontend/src/models/role.ts) - 角色模型
- [permission](../frontend/src/models/permission.ts) - 权限模型
- [dashboard](../frontend/src/models/dashboard.ts) - 仪表盘模型

#### 工具函数

- [request](../frontend/src/utils/request.ts) - 请求封装
- [umiMock](../frontend/src/utils/umiMock.ts) - UMI 模拟实现

### 后端核心组件

#### 控制器

- [AuthController](../backend/app/controller/auth.js) - 认证控制器
- [UserController](../backend/app/controller/user.js) - 用户控制器
- [RoleController](../backend/app/controller/role.js) - 角色控制器
- [PermissionController](../backend/app/controller/permission.js) - 权限控制器

#### 服务层

- [AuthService](../backend/app/service/auth.js) - 认证服务
- [UserService](../backend/app/service/user.js) - 用户服务
- [RoleService](../backend/app/service/role.js) - 角色服务
- [PermissionService](../backend/app/service/permission.js) - 权限服务

#### 数据模型

- [User](../backend/app/model/user.js) - 用户模型
- [Role](../backend/app/model/role.js) - 角色模型
- [Permission](../backend/app/model/permission.js) - 权限模型

#### 中间件

- [jwtAuth](../backend/app/middleware/jwtAuth.js) - JWT 认证中间件
- [errorHandler](../backend/app/middleware/errorHandler.js) - 错误处理中间件

## 配置文件

### 前端配置

- [UMI 配置](../frontend/.umirc.ts) - UMI 框架配置
- [TypeScript 配置](../frontend/tsconfig.json) - TypeScript 配置（已更新以解决 moduleResolution=node10 弃用警告）
- [ESLint 配置](../frontend/.eslintrc.json) - 代码规范配置
- [Prettier 配置](../frontend/.prettierrc.json) - 代码格式化配置

### 后端配置

- [默认配置](../backend/config/config.default.js) - 默认配置文件
- [插件配置](../backend/config/plugin.js) - 插件配置文件

## 数据库文件

### 迁移文件

- [用户表迁移](../backend/database/migrations/20230906000000-create-user.js)
- [角色表迁移](../backend/database/migrations/20230906000001-create-role.js)
- [权限表迁移](../backend/database/migrations/20230906000002-create-permission.js)
- [用户角色关联表迁移](../backend/database/migrations/20230906000003-create-user-role.js)
- [角色权限关联表迁移](../backend/database/migrations/20230906000004-create-role-permission.js)

### 种子数据

- [用户种子](../backend/database/seeders/20230906000000-user.js)
- [角色种子](../backend/database/seeders/20230906000001-role.js)
- [权限种子](../backend/database/seeders/20230906000002-permission.js)

## 测试文件

### 后端测试

- [认证测试](../backend/test/app/controller/auth.test.js)
- [用户测试](../backend/test/app/controller/user.test.js)
- [角色测试](../backend/test/app/controller/role.test.js)
- [权限测试](../backend/test/app/controller/permission.test.js)

## 类型定义

- [前端类型定义](../frontend/src/types/index.ts) - 前端 TypeScript 类型定义
- [后端类型定义](../backend/app/extend/context.js) - 后端响应类型扩展

## 部署文件

- [Dockerfile (前端)](../frontend/Dockerfile) - 前端 Docker 配置
- [Dockerfile (后端)](../backend/Dockerfile) - 后端 Docker 配置
- [Nginx 配置](../frontend/nginx.conf) - Nginx 服务器配置
- [开发环境 Docker Compose](../docker-compose.yml) - 开发环境编排
- [生产环境 Docker Compose](../docker-compose.prod.yml) - 生产环境编排

---

_此索引文件最后更新: 2024-09-06_
