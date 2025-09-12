# 页面结构文档

## 概述

本文档记录了UG管理系统的页面结构和组织方式。系统基于UMI框架构建，采用约定式路由配置。

## 页面文件结构

```
src/
├── pages/
│   ├── Dashboard.tsx          # 仪表盘页面
│   ├── Dashboard.module.css   # 仪表盘页面样式
│   ├── Login.tsx              # 登录页面
│   ├── Login.module.css       # 登录页面样式
│   ├── UserManagement.tsx     # 用户管理页面
│   ├── UserManagement.module.css # 用户管理页面样式
│   ├── SystemSettings.tsx     # 系统设置页面
│   └── SystemSettings.module.css # 系统设置页面样式
```

## 路由配置

路由在 [.umirc.ts](file://e:/YSY/UG/frontend/.umirc.ts) 文件中配置：

1. **登录页面** (`/login`)
   - 路径: `/login`
   - 组件: `./Login`
   - 布局: 无（独立页面）

2. **仪表盘** (`/dashboard`)
   - 路径: `/dashboard`
   - 组件: `./Dashboard`
   - 名称: 仪表盘

3. **用户管理** (`/users`)
   - 路径: `/users`
   - 组件: `./UserManagement`
   - 名称: 用户管理

4. **系统设置** (`/settings`)
   - 路径: `/settings`
   - 组件: `./SystemSettings`
   - 名称: 系统设置

## 页面详情

### 1. 登录页面 (Login.tsx)

- **功能**: 用户身份验证入口
- **主要组件**: 
  - 用户名输入框
  - 密码输入框
  - 记住我复选框
  - 登录按钮
- **样式文件**: Login.module.css

### 2. 仪表盘页面 (Dashboard.tsx)

- **功能**: 系统主界面，展示系统概览信息
- **主要组件**: 
  - 系统介绍
  - 技术栈展示
- **样式文件**: Dashboard.module.css

### 3. 用户管理页面 (UserManagement.tsx)

- **功能**: 管理系统用户
- **主要组件**: 
  - 用户表格展示
  - 添加用户模态框
  - 编辑用户功能
  - 删除用户功能
- **样式文件**: UserManagement.module.css

### 4. 系统设置页面 (SystemSettings.tsx)

- **功能**: 系统配置管理
- **主要组件**: 
  - 基本信息设置
  - 界面设置
  - 功能设置
- **样式文件**: SystemSettings.module.css

## 样式规范

所有页面均使用CSS模块化方案，避免样式冲突：
- 文件命名: `{PageName}.module.css`
- 类名命名: 使用语义化的英文命名，如 `.container`, `.header` 等

## 后续扩展建议

1. **权限管理**: 根据用户角色控制页面访问权限
2. **页面优化**: 添加加载状态、错误处理等用户体验优化
3. **响应式设计**: 适配不同屏幕尺寸的设备
4. **国际化**: 支持多语言切换