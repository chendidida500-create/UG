// 修复UMI 4.x导入方式
import { request } from 'umi';
// // 使用模拟的request
// const request = async <T = any>(url: string, options?: any): Promise<T> => {
//   // 模拟请求实现，实际应用中需要正确的实现
//   return { success: true, data: {} } as T;
// };
import type {
  CreatePermissionParams,
  CreateRoleParams,
  CreateUserParams,
  LoginParams,
  LoginResult,
  PaginationParams,
  Permission,
  RegisterParams,
  Role,
  UpdateMyPasswordParams,
  UpdatePasswordParams,
  UpdatePermissionParams,
  UpdateProfileParams,
  UpdateRoleParams,
  UpdateUserParams,
  User,
} from '../types';

// API基础URL，与UMI配置保持一致
const API_BASE_URL = '/api';

// 通用请求配置，与后端错误处理中间件响应格式保持一致
const requestConfig = {
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
};

// 认证相关API - 对应后端 router.js 认证路由
export const authAPI = {
  // 用户登录 - POST /api/auth/login
  login: (params: LoginParams) =>
    request<{ data: LoginResult }>(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      data: params,
      ...requestConfig,
    }),

  // 用户注册 - POST /api/auth/register  
  register: (params: RegisterParams) =>
    request<{ data: User }>(`${API_BASE_URL}/auth/register`, {
      method: 'POST',
      data: params,
      ...requestConfig,
    }),

  // 刷新Token - POST /api/auth/refresh
  refresh: (refreshToken: string) =>
    request<{ data: LoginResult }>(`${API_BASE_URL}/auth/refresh`, {
      method: 'POST',
      data: { refreshToken },
      ...requestConfig,
    }),

  // 退出登录 - POST /api/auth/logout
  logout: () =>
    request(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      ...requestConfig,
    }),
};

// 用户管理API - 对应后端 router.js 用户路由
export const userAPI = {
  // 获取用户列表 - GET /api/users
  getUsers: (params: PaginationParams) =>
    request(`${API_BASE_URL}/users`, {
      method: 'GET',
      params,
      ...requestConfig,
    }),

  // 获取单个用户 - GET /api/users/:id
  getUser: (id: string) =>
    request<{ data: User }>(`${API_BASE_URL}/users/${id}`, {
      method: 'GET',
      ...requestConfig,
    }),

  // 创建用户 - POST /api/users
  createUser: (params: CreateUserParams) =>
    request<{ data: User }>(`${API_BASE_URL}/users`, {
      method: 'POST',
      data: params,
      ...requestConfig,
    }),

  // 更新用户 - PUT /api/users/:id
  updateUser: (params: UpdateUserParams) =>
    request<{ data: User }>(`${API_BASE_URL}/users/${params.id}`, {
      method: 'PUT',
      data: params,
      ...requestConfig,
    }),

  // 删除用户 - DELETE /api/users/:id
  deleteUser: (id: string) =>
    request(`${API_BASE_URL}/users/${id}`, {
      method: 'DELETE',
      ...requestConfig,
    }),

  // 更新用户状态 - PATCH /api/users/:id/status
  updateUserStatus: (id: string, status: 0 | 1) =>
    request(`${API_BASE_URL}/users/${id}/status`, {
      method: 'PATCH',
      data: { status },
      ...requestConfig,
    }),

  // 重置用户密码 - PATCH /api/users/:id/password
  updateUserPassword: (params: UpdatePasswordParams) =>
    request(`${API_BASE_URL}/users/${params.id}/password`, {
      method: 'PATCH',
      data: params,
      ...requestConfig,
    }),

  // 获取当前用户信息 - GET /api/me
  getProfile: () =>
    request<{ data: User }>(`${API_BASE_URL}/me`, {
      method: 'GET',
      ...requestConfig,
    }),

  // 更新个人信息 - PUT /api/me
  updateProfile: (params: UpdateProfileParams) =>
    request<{ data: User }>(`${API_BASE_URL}/me`, {
      method: 'PUT',
      data: params,
      ...requestConfig,
    }),

  // 修改个人密码 - PUT /api/me/password
  updateMyPassword: (params: UpdateMyPasswordParams) =>
    request(`${API_BASE_URL}/me/password`, {
      method: 'PUT',
      data: params,
      ...requestConfig,
    }),
};

// 角色管理API - 对应后端 router.js 角色路由
export const roleAPI = {
  // 获取角色列表 - GET /api/roles
  getRoles: (params: PaginationParams) =>
    request(`${API_BASE_URL}/roles`, {
      method: 'GET',
      params,
      ...requestConfig,
    }),

  // 获取单个角色 - GET /api/roles/:id
  getRole: (id: string) =>
    request<{ data: Role }>(`${API_BASE_URL}/roles/${id}`, {
      method: 'GET',
      ...requestConfig,
    }),

  // 创建角色 - POST /api/roles
  createRole: (params: CreateRoleParams) =>
    request<{ data: Role }>(`${API_BASE_URL}/roles`, {
      method: 'POST',
      data: params,
      ...requestConfig,
    }),

  // 更新角色 - PUT /api/roles/:id
  updateRole: (params: UpdateRoleParams) =>
    request<{ data: Role }>(`${API_BASE_URL}/roles/${params.id}`, {
      method: 'PUT',
      data: params,
      ...requestConfig,
    }),

  // 删除角色 - DELETE /api/roles/:id
  deleteRole: (id: string) =>
    request(`${API_BASE_URL}/roles/${id}`, {
      method: 'DELETE',
      ...requestConfig,
    }),

  // 获取角色权限 - GET /api/roles/:id/permissions
  getRolePermissions: (id: string) =>
    request<{ data: Permission[] }>(`${API_BASE_URL}/roles/${id}/permissions`, {
      method: 'GET',
      ...requestConfig,
    }),

  // 更新角色权限 - PUT /api/roles/:id/permissions
  updateRolePermissions: (id: string, permissionIds: string[]) =>
    request(`${API_BASE_URL}/roles/${id}/permissions`, {
      method: 'PUT',
      data: { permissionIds },
      ...requestConfig,
    }),
};

// 权限管理API - 对应后端 router.js 权限路由
export const permissionAPI = {
  // 获取权限列表 - GET /api/permissions
  getPermissions: (params: PaginationParams) =>
    request(`${API_BASE_URL}/permissions`, {
      method: 'GET',
      params,
      ...requestConfig,
    }),

  // 获取权限树 - GET /api/permissions/tree
  getPermissionTree: () =>
    request<{ data: Permission[] }>(`${API_BASE_URL}/permissions/tree`, {
      method: 'GET',
      ...requestConfig,
    }),

  // 获取单个权限 - GET /api/permissions/:id
  getPermission: (id: string) =>
    request<{ data: Permission }>(`${API_BASE_URL}/permissions/${id}`, {
      method: 'GET',
      ...requestConfig,
    }),

  // 创建权限 - POST /api/permissions
  createPermission: (params: CreatePermissionParams) =>
    request<{ data: Permission }>(`${API_BASE_URL}/permissions`, {
      method: 'POST',
      data: params,
      ...requestConfig,
    }),

  // 更新权限 - PUT /api/permissions/:id
  updatePermission: (params: UpdatePermissionParams) =>
    request<{ data: Permission }>(`${API_BASE_URL}/permissions/${params.id}`, {
      method: 'PUT',
      data: params,
      ...requestConfig,
    }),

  // 删除权限 - DELETE /api/permissions/:id
  deletePermission: (id: string) =>
    request(`${API_BASE_URL}/permissions/${id}`, {
      method: 'DELETE',
      ...requestConfig,
    }),
};

// 系统健康检查API - 对应后端 router.js 健康检查路由
export const systemAPI = {
  // 健康检查 - GET /api/health
  health: () =>
    request(`${API_BASE_URL}/health`, {
      method: 'GET',
      ...requestConfig,
    }),
};