import { message } from 'antd';
import { useCallback, useState } from 'react';
// 修复UMI 4.x导入方式
import { request } from 'umi';
import type { PaginationParams, Role } from '../types';
// // 使用模拟的request
// const request = async <T = any>(url: string, options?: any): Promise<T> => {
//   // 模拟请求实现，实际应用中需要正确的实现
//   return {
//     success: true,
//     data: {
//       list: [],
//       total: 0,
//       available: true
//     },
//     message: 'success'
//   };
// };

export default function useRoleModel() {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // 获取角色列表
  const getRoleList = useCallback(async (params?: PaginationParams) => {
    setLoading(true);
    try {
      const response = await request('/api/roles', {
        method: 'GET',
        params,
      });

      if (response.success) {
        setRoles(response.data.list);
        setTotal(response.data.total);
        return response;
      } else {
        throw new Error(response.message || '获取角色列表失败');
      }
    } catch (error: any) {
      message.error(error.message || '获取角色列表失败');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // 获取所有角色（不分页）
  const getAllRoles = useCallback(async () => {
    try {
      const response = await request('/api/roles/all', {
        method: 'GET',
      });

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || '获取角色列表失败');
      }
    } catch (error: any) {
      message.error(error.message || '获取角色列表失败');
      throw error;
    }
  }, []);

  // 创建角色
  const createRole = useCallback(async (data: Partial<Role>) => {
    try {
      const response = await request('/api/roles', {
        method: 'POST',
        data,
      });

      if (response.success) {
        message.success('角色创建成功');
        return response.data;
      } else {
        throw new Error(response.message || '角色创建失败');
      }
    } catch (error: any) {
      message.error(error.message || '角色创建失败');
      throw error;
    }
  }, []);

  // 更新角色
  const updateRole = useCallback(async (id: string, data: Partial<Role>) => {
    try {
      const response = await request(`/api/roles/${id}`, {
        method: 'PUT',
        data,
      });

      if (response.success) {
        message.success('角色更新成功');
        return response.data;
      } else {
        throw new Error(response.message || '角色更新失败');
      }
    } catch (error: any) {
      message.error(error.message || '角色更新失败');
      throw error;
    }
  }, []);

  // 删除角色
  const deleteRole = useCallback(async (id: string) => {
    try {
      const response = await request(`/api/roles/${id}`, {
        method: 'DELETE',
      });

      if (response.success) {
        message.success('角色删除成功');
        return true;
      } else {
        throw new Error(response.message || '角色删除失败');
      }
    } catch (error: any) {
      message.error(error.message || '角色删除失败');
      throw error;
    }
  }, []);

  // 批量删除角色
  const batchDeleteRoles = useCallback(async (ids: string[]) => {
    try {
      const response = await request('/api/roles/batch', {
        method: 'DELETE',
        data: { ids },
      });

      if (response.success) {
        message.success('批量删除成功');
        return true;
      } else {
        throw new Error(response.message || '批量删除失败');
      }
    } catch (error: any) {
      message.error(error.message || '批量删除失败');
      throw error;
    }
  }, []);

  // 更新角色状态
  const updateRoleStatus = useCallback(async (id: string, status: 0 | 1) => {
    try {
      const response = await request(`/api/roles/${id}/status`, {
        method: 'PUT',
        data: { status },
      });

      if (response.success) {
        return true;
      } else {
        throw new Error(response.message || '状态更新失败');
      }
    } catch (error: any) {
      message.error(error.message || '状态更新失败');
      throw error;
    }
  }, []);

  // 获取角色权限
  const getRolePermissions = useCallback(async (id: string) => {
    try {
      const response = await request(`/api/roles/${id}/permissions`, {
        method: 'GET',
      });

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || '获取角色权限失败');
      }
    } catch (error: any) {
      message.error(error.message || '获取角色权限失败');
      throw error;
    }
  }, []);

  // 更新角色权限
  const updateRolePermissions = useCallback(async (id: string, permissionIds: string[]) => {
    try {
      const response = await request(`/api/roles/${id}/permissions`, {
        method: 'PUT',
        data: { permissionIds },
      });

      if (response.success) {
        return true;
      } else {
        throw new Error(response.message || '权限设置失败');
      }
    } catch (error: any) {
      message.error(error.message || '权限设置失败');
      throw error;
    }
  }, []);

  // 获取角色详情
  const getRoleDetail = useCallback(async (id: string) => {
    try {
      const response = await request(`/api/roles/${id}`, {
        method: 'GET',
      });

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || '获取角色详情失败');
      }
    } catch (error: any) {
      message.error(error.message || '获取角色详情失败');
      throw error;
    }
  }, []);

  // 复制角色
  const copyRole = useCallback(async (id: string, newName: string, newCode: string) => {
    try {
      const response = await request(`/api/roles/${id}/copy`, {
        method: 'POST',
        data: { name: newName, code: newCode },
      });

      if (response.success) {
        message.success('角色复制成功');
        return response.data;
      } else {
        throw new Error(response.message || '角色复制失败');
      }
    } catch (error: any) {
      message.error(error.message || '角色复制失败');
      throw error;
    }
  }, []);

  // 获取角色统计信息
  const getRoleStats = useCallback(async () => {
    try {
      const response = await request('/api/roles/stats', {
        method: 'GET',
      });

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || '获取统计信息失败');
      }
    } catch (error: any) {
      message.error(error.message || '获取统计信息失败');
      throw error;
    }
  }, []);

  // 检查角色编码是否可用
  const checkRoleCode = useCallback(async (code: string, excludeId?: string) => {
    try {
      const response = await request('/api/roles/check-code', {
        method: 'POST',
        data: { code, excludeId },
      });

      return response.success ? response.data.available : false;
    } catch (error: any) {
      console.error('检查角色编码失败:', error);
      return false;
    }
  }, []);

  // 获取角色用户列表
  const getRoleUsers = useCallback(async (id: string, params?: PaginationParams) => {
    try {
      const response = await request(`/api/roles/${id}/users`, {
        method: 'GET',
        params,
      });

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || '获取角色用户失败');
      }
    } catch (error: any) {
      message.error(error.message || '获取角色用户失败');
      throw error;
    }
  }, []);

  // 为角色添加用户
  const addUsersToRole = useCallback(async (id: string, userIds: string[]) => {
    try {
      const response = await request(`/api/roles/${id}/users`, {
        method: 'POST',
        data: { userIds },
      });

      if (response.success) {
        message.success('用户添加成功');
        return true;
      } else {
        throw new Error(response.message || '用户添加失败');
      }
    } catch (error: any) {
      message.error(error.message || '用户添加失败');
      throw error;
    }
  }, []);

  // 从角色移除用户
  const removeUsersFromRole = useCallback(async (id: string, userIds: string[]) => {
    try {
      const response = await request(`/api/roles/${id}/users`, {
        method: 'DELETE',
        data: { userIds },
      });

      if (response.success) {
        message.success('用户移除成功');
        return true;
      } else {
        throw new Error(response.message || '用户移除失败');
      }
    } catch (error: any) {
      message.error(error.message || '用户移除失败');
      throw error;
    }
  }, []);

  return {
    roles,
    loading,
    total,
    getRoleList,
    getAllRoles,
    createRole,
    updateRole,
    deleteRole,
    batchDeleteRoles,
    updateRoleStatus,
    getRolePermissions,
    updateRolePermissions,
    getRoleDetail,
    copyRole,
    getRoleStats,
    checkRoleCode,
    getRoleUsers,
    addUsersToRole,
    removeUsersFromRole,
  };
}