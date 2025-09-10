# 增加基础管理页面设计文档

## 1. 概述

为UG管理系统增加基础的管理页面，包括用户管理、角色管理和权限管理三个核心功能模块。这些页面将基于系统的RBAC权限模型实现，提供完整的增删改查功能和权限分配能力。页面将遵循UMI框架的约定式路由规范进行组织。

## 2. 页面功能需求

### 2.1 用户管理页面

- 用户列表展示（支持分页、搜索、筛选）
- 用户创建、编辑、删除功能
- 用户状态管理（启用/禁用）
- 用户角色分配
- 用户密码重置

### 2.2 角色管理页面

- 角色列表展示（支持分页、搜索、筛选）
- 角色创建、编辑、删除功能
- 角色状态管理（启用/禁用）
- 角色权限分配（树形结构展示权限）

### 2.3 权限管理页面

- 权限树形结构展示
- 权限创建、编辑、删除功能
- 权限状态管理（启用/禁用）
- 权限父子关系管理

## 3. 前端架构设计

### 3.1 页面结构

```
src/
├── layouts/                   # 布局组件
│   ├── BasicLayout/          # 基础布局
│   │   ├── index.tsx         # 基础布局主文件
│   │   ├── components/       # 布局相关组件
│   │   │   ├── Header/       # 顶部导航栏
│   │   │   ├── Sidebar/      # 侧边栏菜单
│   │   │   └── Footer/       # 底部信息
│   │   └── styles/           # 布局样式文件
│   └── AuthLayout/           # 认证布局
│       ├── index.tsx         # 认证布局主文件
│       ├── components/       # 认证布局组件
│       └── styles/           # 认证布局样式
├── pages/
│   ├── Dashboard/             # 仪表盘页面（已存在）
│   ├── System/                # 系统管理模块
│   │   ├── User/              # 用户管理页面
│   │   │   ├── index.tsx     # 用户列表页面
│   │   │   └── components/   # 用户管理相关组件
│   │   ├── Role/              # 角色管理页面
│   │   │   ├── index.tsx     # 角色列表页面
│   │   │   └── components/   # 角色管理相关组件
│   │   └── Permission/        # 权限管理页面
│   │       ├── index.tsx     # 权限列表页面
│   │       └── components/   # 权限管理相关组件
```

### 3.2 路由配置

由于项目使用UMI的约定式路由，页面将按照目录结构自动生成路由，无需在`.umirc.ts`中手动配置。页面路径将根据文件夹结构自动映射：

- 用户管理页面: `/system/user`
- 角色管理页面: `/system/role`
- 权限管理页面: `/system/permission`

如果需要自定义路由名称或路径，可以在`.umirc.ts`中添加以下配置：

```typescript
routes: [
  {
    path: '/',
    redirect: '/dashboard',
  },
  {
    name: '仪表盘',
    path: '/dashboard',
    component: './Dashboard',
  },
  {
    name: '系统管理',
    path: '/system',
    routes: [
      {
        name: '用户管理',
        path: '/system/user',
        component: './System/User',
      },
      {
        name: '角色管理',
        path: '/system/role',
        component: './System/Role',
      },
      {
        name: '权限管理',
        path: '/system/permission',
        component: './System/Permission',
      },
    ],
  },
],
```

## 4. 页面组件设计

### 4.1 用户管理页面 (System/User/index.tsx)

- 使用 Ant Design 的 Table 组件展示用户列表
- 集成搜索功能（用户名、邮箱等字段）
- 操作列包含编辑、删除、状态切换、重置密码等按钮
- 提供创建用户和编辑用户的模态框表单

### 4.2 角色管理页面 (System/Role/index.tsx)

- 使用 Ant Design 的 Table 组件展示角色列表
- 集成搜索功能（角色名称、描述等字段）
- 操作列包含编辑、删除、状态切换、权限设置等按钮
- 提供创建角色和编辑角色的模态框表单
- 权限设置使用 Tree 组件展示树形权限结构

### 4.3 权限管理页面 (System/Permission/index.tsx)

- 使用 Ant Design 的 Tree 组件展示权限树形结构
- 提供创建权限和编辑权限的表单
- 支持权限的父子关系管理
- 提供权限状态切换功能

### 4.4 布局组件设计

#### BasicLayout (layouts/BasicLayout/index.tsx)

- 顶部导航栏：显示用户信息、通知、登出按钮
- 侧边栏菜单：根据用户权限动态生成导航菜单
- 内容区域：展示具体页面内容
- 响应式设计：适配不同屏幕尺寸
- 权限控制：根据用户权限控制菜单项显示

#### AuthLayout (layouts/AuthLayout/index.tsx)

- 登录/注册表单容器
- 品牌标识展示
- 统一的认证页面样式
- 响应式布局设计

## 5. 状态管理设计

### 5.1 用户模型 (models/user.ts)

- getUserList: 获取用户列表
- createUser: 创建用户
- updateUser: 更新用户信息
- deleteUser: 删除用户
- updateUserStatus: 更新用户状态
- resetUserPassword: 重置用户密码
- getUserRoles: 获取用户角色
- updateUserRoles: 更新用户角色

### 5.2 角色模型 (models/role.ts)

- getRoleList: 获取角色列表
- createRole: 创建角色
- updateRole: 更新角色信息
- deleteRole: 删除角色
- updateRoleStatus: 更新角色状态
- getRolePermissions: 获取角色权限
- updateRolePermissions: 更新角色权限
- getRoleUsers: 获取角色用户列表

### 5.3 权限模型 (models/permission.ts)

- getPermissionList: 获取权限列表
- getPermissionTree: 获取权限树
- createPermission: 创建权限
- updatePermission: 更新权限信息
- deletePermission: 删除权限
- updatePermissionStatus: 更新权限状态

### 5.4 布局模型 (models/layout.ts)

- getMenus: 获取菜单列表
- getMenuPermissions: 获取菜单权限
- updateLayoutConfig: 更新布局配置

## 6. API 接口设计

### 6.1 用户管理接口

- GET /api/users - 获取用户列表
- POST /api/users - 创建用户
- GET /api/users/:id - 获取用户详情
- PUT /api/users/:id - 更新用户信息
- DELETE /api/users/:id - 删除用户
- PUT /api/users/:id/status - 更新用户状态
- PUT /api/users/:id/password/reset - 重置用户密码
- GET /api/users/:id/roles - 获取用户角色
- PUT /api/users/:id/roles - 更新用户角色
- GET /api/users/:id/permissions - 获取用户权限

### 6.2 角色管理接口

- GET /api/roles - 获取角色列表
- POST /api/roles - 创建角色
- GET /api/roles/:id - 获取角色详情
- PUT /api/roles/:id - 更新角色信息
- DELETE /api/roles/:id - 删除角色
- PUT /api/roles/:id/status - 更新角色状态
- GET /api/roles/:id/permissions - 获取角色权限
- PUT /api/roles/:id/permissions - 更新角色权限

### 6.3 权限管理接口

- GET /api/permissions - 获取权限列表
- GET /api/permissions/tree - 获取权限树
- POST /api/permissions - 创建权限
- PUT /api/permissions/:id - 更新权限信息
- DELETE /api/permissions/:id - 删除权限
- PUT /api/permissions/:id/status - 更新权限状态
- GET /api/permissions/:id/roles - 获取权限关联的角色列表
- GET /api/permissions/:id/users - 获取权限关联的用户列表

## 7. 权限控制设计

### 7.1 前端权限控制

- 使用 UMI 的 access 插件实现路由级别的权限控制
- 页面内按钮级权限控制通过权限码判断显示/隐藏
- 布局权限控制通过菜单权限动态生成导航菜单
- 权限码命名规范：
  - 用户管理：system:user:view, system:user:create, system:user:update, system:user:delete
  - 角色管理：system:role:view, system:role:create, system:role:update, system:role:delete
  - 权限管理：system:permission:view, system:permission:create, system:permission:update, system:permission:delete
  - 布局菜单：layout:menu:view, layout:menu:update

### 7.2 后端权限控制

- 通过中间件实现接口级别的权限验证
- 每个接口对应特定的权限码
- 用户访问接口时验证其是否拥有对应权限

## 8. 数据模型设计

### 8.1 用户模型 (User)

```typescript
interface User {
  id: string;
  username: string;
  email: string;
  nickname?: string;
  avatar?: string;
  status: number; // 0: 禁用, 1: 启用
  lastLoginAt?: string;
  createdAt: string;
  updatedAt: string;
}
```

### 8.2 角色模型 (Role)

```typescript
interface Role {
  id: string;
  name: string;
  code: string;
  description?: string;
  status: number; // 0: 禁用, 1: 启用
  isSystem: number; // 0: 非系统角色, 1: 系统角色
  userCount?: number; // 关联用户数
  permissionCount?: number; // 关联权限数
  createdAt: string;
  updatedAt: string;
}
```

### 8.3 权限模型 (Permission)

```typescript
interface Permission {
  id: string;
  name: string;
  code: string;
  type: string; // menu: 菜单, button: 按钮, api: 接口
  parentId?: string;
  path?: string; // 前端路由路径
  component?: string; // 前端组件路径
  icon?: string;
  sort: number;
  status: number; // 0: 禁用, 1: 启用
  createdAt: string;
  updatedAt: string;
  children?: Permission[]; // 子权限
}
```

### 8.4 用户角色关联模型 (UserRole)

```typescript
interface UserRole {
  id: string;
  userId: string;
  roleId: string;
  createdAt: string;
  updatedAt: string;
}
```

### 8.5 角色权限关联模型 (RolePermission)

```typescript
interface RolePermission {
  id: string;
  roleId: string;
  permissionId: string;
  createdAt: string;
  updatedAt: string;
}
```

### 8.6 布局菜单模型 (Menu)

```typescript
interface Menu {
  id: string;
  name: string;
  code: string;
  path?: string;
  icon?: string;
  parentId?: string;
  sort: number;
  status: number; // 0: 禁用, 1: 启用
  createdAt: string;
  updatedAt: string;
  children?: Menu[]; // 子菜单
}
```
