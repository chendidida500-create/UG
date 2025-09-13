import request from './request';
import { User } from '@/types/user';

export interface UserListParams {
  page?: number;
  pageSize?: number;
  search?: string;
}

export interface UserListItem {
  id: number;
  username: string;
  email: string;
  roles: { id: number; name: string }[];
  createdAt: string;
  updatedAt: string;
}

export interface Pagination {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface UserListResponse {
  success: boolean;
  data: UserListItem[];
  pagination: Pagination;
  message?: string;
}

export interface UserResponse {
  success: boolean;
  data: UserListItem;
  message?: string;
}

export interface CreateUserParams {
  username: string;
  email: string;
  password: string;
}

export interface UpdateUserParams {
  username?: string;
  email?: string;
  password?: string;
}

export interface AssignRolesParams {
  roleIds: number[];
}

/**
 * 获取用户列表
 */
export async function getUserList(params: UserListParams): Promise<UserListResponse> {
  return request('/users', {
    params,
  });
}

/**
 * 获取用户详情
 */
export async function getUserById(id: number): Promise<UserResponse> {
  return request(`/users/${id}`);
}

/**
 * 创建用户
 */
export async function createUser(data: CreateUserParams): Promise<any> {
  return request('/users', {
    method: 'POST',
    data,
  });
}

/**
 * 更新用户
 */
export async function updateUser(id: number, data: UpdateUserParams): Promise<any> {
  return request(`/users/${id}`, {
    method: 'PUT',
    data,
  });
}

/**
 * 删除用户
 */
export async function deleteUser(id: number): Promise<any> {
  return request(`/users/${id}`, {
    method: 'DELETE',
  });
}

/**
 * 为用户分配角色
 */
export async function assignRolesToUser(userId: number, data: AssignRolesParams): Promise<any> {
  return request(`/users/${userId}/roles`, {
    method: 'POST',
    data,
  });
}