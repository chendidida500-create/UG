import { message } from 'antd';
import { useCallback, useState } from 'react';
// 修复UMI 4.x导入方式
import { request } from 'umi';
import type { PaginationParams, User } from '../types';

// 定义UserModelState类型
export type UserModelState = ReturnType<typeof useUserModel>;

export default function useUserModel(): UserModelState {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [total, setTotal] = useState<number>(0);

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
        message.success('创建成功');
        return response;
      } else {
        throw new Error(response.message || '创建失败');
      }
    } catch (error: any) {
      message.error(error.message || '创建失败');
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
        message.success('更新成功');
        return response;
      } else {
        throw new Error(response.message || '更新失败');
      }
    } catch (error: any) {
      message.error(error.message || '更新失败');
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
        message.success('删除成功');
        return response;
      } else {
        throw new Error(response.message || '删除失败');
      }
    } catch (error: any) {
      message.error(error.message || '删除失败');
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
        return response;
      } else {
        throw new Error(response.message || '批量删除失败');
      }
    } catch (error: any) {
      message.error(error.message || '批量删除失败');
      throw error;
    }
  }, []);

  // 更新用户状态
  const updateUserStatus = useCallback(async (id: string, status: 0 | 1) => {
    try {
      const response = await request(`/api/users/${id}/status`, {
        method: 'PATCH',
        data: { status },
      });

      if (response.success) {
        message.success('状态更新成功');
        return response;
      } else {
        throw new Error(response.message || '状态更新失败');
      }
    } catch (error: any) {
      message.error(error.message || '状态更新失败');
      throw error;
    }
  }, []);

  // 导出用户
  const exportUsers = useCallback(async () => {
    try {
      const response = await request('/api/users/export', {
        method: 'GET',
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
      return { success: true };
    } catch (error: any) {
      message.error(error.message || '导出失败');
      throw error;
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
    exportUsers,
  };
}

export default useUserModel;
