# 任务管理功能文档

## 概述

本文档记录了UG管理系统中任务管理功能的设计和实现。任务管理功能允许团队成员创建、跟踪和管理项目中的各项任务。

## 功能特性

1. **任务列表展示**
   - 以表格形式展示所有任务
   - 支持分页显示
   - 显示任务的关键信息（ID、名称、描述、状态、优先级、负责人、工时、截止日期等）

2. **任务状态管理**
   - 待办 (todo)
   - 进行中 (in-progress)
   - 已完成 (done)
   - 已取消 (cancelled)

3. **任务优先级**
   - 低 (low)
   - 中 (medium)
   - 高 (high)

4. **任务操作**
   - 添加新任务
   - 编辑现有任务
   - 删除任务
   - 标记任务为完成

## 页面文件

### 任务管理页面 (TaskManagement.tsx)

- **路径**: [frontend/src/pages/TaskManagement.tsx](file://e:/YSY/UG/frontend/src/pages/TaskManagement.tsx)
- **功能组件**:
  - 任务列表表格
  - 添加/编辑任务模态框
  - 任务状态标签
  - 任务优先级标签
  - 任务操作按钮

### 样式文件

- **路径**: [frontend/src/pages/TaskManagement.module.css](file://e:/YSY/UG/frontend/src/pages/TaskManagement.module.css)
- **样式规范**: 使用CSS模块化方案，避免样式冲突

## 数据结构

### Task 接口

```typescript
interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in-progress' | 'done' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  createdAt: string;
  dueDate?: string;
  estimatedHours?: number;
}
```

## 路由配置

在 [.umirc.ts](file://e:/YSY/UG/frontend/.umirc.ts) 中添加了任务管理页面的路由：

```typescript
{
  name: '任务管理',
  path: '/tasks',
  component: './TaskManagement',
}
```

## 使用说明

1. **访问任务管理页面**
   - 在侧边栏导航中点击"任务管理"菜单项
   - 或直接访问 `/tasks` 路径

2. **添加任务**
   - 点击"添加任务"按钮
   - 填写任务信息（名称、描述、优先级、负责人等）
   - 点击"确认"保存任务

3. **编辑任务**
   - 点击任务行的"编辑"按钮
   - 修改任务信息
   - 点击"确认"保存更改

4. **完成任务**
   - 点击任务行的"完成"按钮
   - 任务状态将更新为"已完成"

5. **删除任务**
   - 点击任务行的"删除"按钮
   - 确认删除操作

## 后续优化建议

1. **数据持久化**
   - 集成后端API，实现任务数据的持久化存储
   - 添加任务搜索和筛选功能

2. **权限控制**
   - 根据用户角色控制任务操作权限
   - 实现任务分配功能

3. **通知提醒**
   - 添加任务截止日期提醒功能
   - 集成邮件或站内信通知

4. **统计报表**
   - 添加任务完成情况统计图表
   - 实现团队工作量统计功能
