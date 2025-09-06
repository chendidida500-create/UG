import { message } from 'antd';
import { useCallback, useState } from 'react';
// 修复UMI 4.x导入方式
import { request } from 'umi';
import type { PaginationParams, User } from '../types';

export default function useUserModel() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);

  // 获取用户列表
  const getUserList = useCallback(async (params?: PaginationParams) => {
    setLoading(true);
    try {
      const response = await request('/api/users', {
        method: 'GET',
        params,
      });

      if (response.success) {
        setUsers(response.data.list);
        setTotal(response.data.total);
        return response;
      } else {
        throw new Error(response.message || '获取用户列表失败');
      }
    } catch (error: any) {
      message.error(error.message || '获取用户列表失败');
      throw error;
    } finally {
      setLoading(false);
    }
  }, []);

  // 创建用户
  const createUser = useCallback(async (data: Partial<User>) => {
    try {
      const response = await request('/api/users', {
        method: 'POST',
        data,
      });

      if (response.success) {
        message.success('用户创建成功');
        return response.data;
      } else {
        throw new Error(response.message || '用户创建失败');
      }
    } catch (error: any) {
      message.error(error.message || '用户创建失败');
      throw error;
    }
  }, []);

  // 更新用户
  const updateUser = useCallback(async (id: string, data: Partial<User>) => {
    try {
      const response = await request(`/api/users/${id}`, {
        method: 'PUT',
        data,
      });

      if (response.success) {
        message.success('用户更新成功');
        return response.data;
      } else {
        throw new Error(response.message || '用户更新失败');
      }
    } catch (error: any) {
      message.error(error.message || '用户更新失败');
      throw error;
    }
  }, []);

  // 删除用户
  const deleteUser = useCallback(async (id: string) => {
    try {
      const response = await request(`/api/users/${id}`, {
        method: 'DELETE',
      });

      if (response.success) {
        message.success('用户删除成功');
        return true;
      } else {
        throw new Error(response.message || '用户删除失败');
      }
    } catch (error: any) {
      message.error(error.message || '用户删除失败');
      throw error;
    }
  }, []);

  // 批量删除用户
  const batchDeleteUsers = useCallback(async (ids: string[]) => {
    try {
      const response = await request('/api/users/batch', {
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

  // 更新用户状态
  const updateUserStatus = useCallback(async (id: string, status: string) => {
    try {
      const response = await request(`/api/users/${id}/status`, {
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

  // 重置密码
  const resetUserPassword = useCallback(async (id: string, newPassword?: string) => {
    try {
      const response = await request(`/api/users/${id}/reset-password`, {
        method: 'POST',
        data: { newPassword },
      });

      if (response.success) {
        message.success('密码重置成功');
        return response.data;
      } else {
        throw new Error(response.message || '密码重置失败');
      }
    } catch (error: any) {
      message.error(error.message || '密码重置失败');
      throw error;
    }
  }, []);

  // 更新用户角色
  const updateUserRoles = useCallback(async (id: string, roleIds: string[]) => {
    try {
      const response = await request(`/api/users/${id}/roles`, {
        method: 'PUT',
        data: { roleIds },
      });

      if (response.success) {
        message.success('角色分配成功');
        return true;
      } else {
        throw new Error(response.message || '角色分配失败');
      }
    } catch (error: any) {
      message.error(error.message || '角色分配失败');
      throw error;
    }
  }, []);

  // 获取用户详情
  const getUserDetail = useCallback(async (id: string) => {
    try {
      const response = await request(`/api/users/${id}`, {
        method: 'GET',
      });

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || '获取用户详情失败');
      }
    } catch (error: any) {
      message.error(error.message || '获取用户详情失败');
      throw error;
    }
  }, []);

  // 导出用户数据
  const exportUsers = useCallback(async (params?: any) => {
    try {
      const response = await request('/api/users/export', {
        method: 'GET',
        params,
        responseType: 'blob',
      });

      // 创建下载链接
      const url = window.URL.createObjectURL(new Blob([response]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.xlsx');
      document.body.appendChild(link);
      link.click();
      link.remove();

      message.success('导出成功');
      return true;
    } catch (error: any) {
      message.error(error.message || '导出失败');
      throw error;
    }
  }, []);

  // 导入用户数据
  const importUsers = useCallback(async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await request('/api/users/import', {
        method: 'POST',
        data: formData,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.success) {
        message.success('导入成功');
        return response.data;
      } else {
        throw new Error(response.message || '导入失败');
      }
    } catch (error: any) {
      message.error(error.message || '导入失败');
      throw error;
    }
  }, []);

  // 获取用户统计信息
  const getUserStats = useCallback(async () => {
    try {
      const response = await request('/api/users/stats', {
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

  // 检查用户名是否可用
  const checkUsername = useCallback(async (username: string, excludeId?: string) => {
    try {
      const response = await request('/api/users/check-username', {
        method: 'POST',
        data: { username, excludeId },
      });

      return response.success ? response.data.available : false;
    } catch (error: any) {
      console.error('检查用户名失败:', error);
      return false;
    }
  }, []);

  // 检查邮箱是否可用
  const checkEmail = useCallback(async (email: string, excludeId?: string) => {
    try {
      const response = await request('/api/users/check-email', {
        method: 'POST',
        data: { email, excludeId },
      });

      return response.success ? response.data.available : false;
    } catch (error: any) {
      console.error('检查邮箱失败:', error);
      return false;
    }
  }, []);

  return {
    users,
    loading,
    total,
    getUserList,
    createUser,
    updateUser,
    deleteUser,
    batchDeleteUsers,
    updateUserStatus,
    resetUserPassword,
    updateUserRoles,
    getUserDetail,
    exportUsers,
    importUsers,
    getUserStats,
    checkUsername,
    checkEmail,
  };
}