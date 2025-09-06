import type { ReactNode } from 'react';

// UMI 框架相关类型扩展
export interface API {
  // 通用API响应格式，与后端 context.js 扩展保持一致
  response: <T = any>(data?: T) => {
    success: boolean;
    code: string;
    message: string;
    data: T;
    timestamp: number;
  };

  // 分页响应格式，与后端 successWithPagination 保持一致
  paginationResponse: <T = any>(data: T[]) => {
    success: boolean;
    code: string;
    message: string;
    data: {
      list: T[];
      pagination: {
        current: number;
        pageSize: number;
        total: number;
        totalPages: number;
      };
    };
    timestamp: number;
  };
}

// 用户相关类型定义，与后端数据库表结构保持一致
export interface User {
  id: string;
  username: string;
  email: string;
  nickname?: string;
  avatar?: string;
  phone?: string;
  status: 0 | 1; // 0: 禁用, 1: 启用
  last_login_at?: string;
  created_at: string;
  updated_at: string;
  roles?: Role[];
}

// 角色类型定义
export interface Role {
  id: string;
  name: string;
  code: string;
  description?: string;
  status: 0 | 1;
  created_at: string;
  updated_at: string;
  permissions?: Permission[];
}

// 权限类型定义
export interface Permission {
  id: string;
  name: string;
  code: string;
  type: 'menu' | 'button' | 'api';
  parent_id?: string;
  path?: string;
  component?: string;
  icon?: string;
  sort: number;
  status: 0 | 1;
  description?: string;
  created_at: string;
  updated_at: string;
  children?: Permission[];
}

// 登录相关类型，与后端认证系统保持一致
export interface LoginParams {
  username: string;
  password: string;
  remember?: boolean;
}

export interface LoginResult {
  token: string;
  refreshToken: string;
  user: User;
  expires: number;
}

export interface RegisterParams {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  nickname?: string;
}

// 分页参数，与后端 getPagination 方法保持一致
export interface PaginationParams {
  current?: number;
  pageSize?: number;
  keyword?: string;
  status?: 0 | 1;
  startTime?: string;
  endTime?: string;
}

// 用户管理相关类型
export interface CreateUserParams {
  username: string;
  email: string;
  password: string;
  nickname?: string;
  phone?: string;
  roleIds?: string[];
}

export interface UpdateUserParams {
  id: string;
  username?: string;
  email?: string;
  nickname?: string;
  phone?: string;
  status?: 0 | 1;
  roleIds?: string[];
}

export interface UpdatePasswordParams {
  id: string;
  newPassword: string;
  confirmPassword: string;
}

// 角色管理相关类型
export interface CreateRoleParams {
  name: string;
  code: string;
  description?: string;
  permissionIds?: string[];
}

export interface UpdateRoleParams {
  id: string;
  name?: string;
  code?: string;
  description?: string;
  status?: 0 | 1;
  permissionIds?: string[];
}

// 权限管理相关类型
export interface CreatePermissionParams {
  name: string;
  code: string;
  type: 'menu' | 'button' | 'api';
  parent_id?: string;
  path?: string;
  component?: string;
  icon?: string;
  sort?: number;
  description?: string;
}

export interface UpdatePermissionParams {
  id: string;
  name?: string;
  code?: string;
  type?: 'menu' | 'button' | 'api';
  parent_id?: string;
  path?: string;
  component?: string;
  icon?: string;
  sort?: number;
  status?: 0 | 1;
  description?: string;
}

// 个人中心相关类型
export interface UpdateProfileParams {
  nickname?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export interface UpdateMyPasswordParams {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
}

// 系统配置类型
export interface SystemConfig {
  siteName: string;
  siteDescription: string;
  siteLogo?: string;
  siteFavicon?: string;
  allowRegister: boolean;
  defaultRole: string;
}

// 操作日志类型
export interface OperationLog {
  id: string;
  user_id: string;
  username: string;
  action: string;
  target: string;
  ip: string;
  user_agent: string;
  created_at: string;
  user?: User;
}

// 动态表格配置类型
export interface TableConfig {
  columns: {
    key: string;
    title: string;
    dataIndex: string;
    width?: number;
    fixed?: 'left' | 'right';
    render?: string | ((value: any, record: any, index: number) => ReactNode); // 支持渲染函数名或函数
    sorter?: boolean | ((a: any, b: any) => number);
    filters?: Array<{ text: string; value: any }>;
    ellipsis?: boolean;
  }[];
  rowKey?: string; // 添加rowKey支持
  size?: 'small' | 'middle' | 'large'; // 添加size支持
  bordered?: boolean; // 添加bordered支持
  pagination?: {
    pageSize: number;
    showSizeChanger: boolean;
    showQuickJumper: boolean;
  };
  rowSelection?: {
    type?: 'checkbox' | 'radio';
    selectedRowKeys?: React.Key[];
    onChange?: (selectedRowKeys: React.Key[], selectedRows: any[]) => void;
    getCheckboxProps?: (record: any) => {
      disabled?: boolean;
      name?: string;
    };
    onSelect?: (record: any, selected: boolean, selectedRows: any[], nativeEvent: Event) => void;
    onSelectAll?: (selected: boolean, selectedRows: any[], changeRows: any[]) => void;
    onSelectInvert?: (selectedRowKeys: React.Key[]) => void;
    onSelectNone?: () => void;
    selections?: Array<{
      key: string;
      text: ReactNode;
      onSelect?: (changeableRowKeys: React.Key[]) => void;
    }> | boolean;
    hideSelectAll?: boolean;
    preserveSelectedRowKeys?: boolean;
    columnWidth?: string | number;
    columnTitle?: string | ReactNode;
    fixed?: boolean;
    renderCell?: (checked: boolean, record: any, index: number, originNode: ReactNode) => ReactNode;
  };
  actions?: {
    view?: boolean;
    edit?: boolean;
    delete?: boolean;
    custom?: Array<{
      key: string;
      title: string;
      icon?: string;
      permission?: string;
    }>;
  };
  scroll?: {
    x?: number | string | boolean;
    y?: number | string;
  };
}

// 动态表单配置类型
export interface FormConfig {
  fields: Array<{
    key: string;
    name?: string; // 为了兼容旧配置，添加name字段
    label: string;
    type: 'input' | 'password' | 'textarea' | 'number' | 'select' | 'radio' | 'checkbox' | 'date' | 'time' | 'upload' | 'switch' | 'rate' | 'slider' | 'cascader' | 'tree-select';
    required?: boolean;
    placeholder?: string;
    options?: Array<{ label: string; value: any }>;
    rules?: any[];
    props?: Record<string, any>;
    span?: number; // 表单项占用的栅格数
    tooltip?: string; // 字段提示
    extra?: string; // 额外说明
    hidden?: boolean; // 是否隐藏
    permission?: string; // 权限要求
    dependencies?: string[]; // 添加dependencies属性
    visible?: (values: any) => boolean; // 添加visible属性
  }>;
  // 字段分组配置
  fieldGroups?: Array<{
    key?: string;
    title?: string;
    fields: string[]; // 字段key数组
  }>;
  layout?: 'horizontal' | 'vertical' | 'inline';
  labelCol?: { span: number };
  wrapperCol?: { span: number };
}

// 扩展全局类型，与根目录 typings.d.ts 保持一致
declare global {
  interface Window {
    UG_CONFIG?: SystemConfig;
  }
}

export { };

