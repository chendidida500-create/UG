import { message } from 'antd';
import { useCallback, useState } from 'react';
// 修复UMI 4.x导入方式
import { typedRequest as request } from '@/utils/request';

interface Role
{
  id: string;
  name: string;
  code: string;
  description?: string;
  status: 'active' | 'inactive';
  userCount: number;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

// 更新RoleListResponse接口，添加success和message属性
interface RoleListResponse
{
  success: boolean;
  message: string;
  data: {
    list: Role[];
    total: number;
    current: number;
    pageSize: number;
  };
}

// 定义通用API响应格式
interface ApiResponse<T>
{
  success: boolean;
  message: string;
  data: T;
}

// 定义RoleModelState类型，包含角色列表和角色管理相关操作
export interface RoleModelState
{
  roles: Role[];
  loading: boolean;
  total: number;
  current: number;
  pageSize: number;
  getRoleList: ( params?: any ) => Promise<any>;
  getRole: ( id: string ) => Promise<any>;
  createRole: ( data: Partial<Role> ) => Promise<any>;
  updateRole: ( id: string, data: Partial<Role> ) => Promise<any>;
  deleteRole: ( id: string ) => Promise<any>;
  batchDeleteRoles: ( ids: string[] ) => Promise<any>;
  updateRoleStatus: ( id: string, status: 'active' | 'inactive' ) => Promise<any>;
  getRolePermissions: ( id: string ) => Promise<any>;
  updateRolePermissions: ( id: string, permissionIds: string[] ) => Promise<any>;
  getAllPermissions: () => Promise<any>;
}

export default function useRoleModel (): RoleModelState
{
  const [ roles, setRoles ] = useState<Role[]>( [] );
  const [ loading, setLoading ] = useState<boolean>( false );
  const [ total, setTotal ] = useState<number>( 0 );
  const [ current, setCurrent ] = useState<number>( 1 );
  const [ pageSize, setPageSize ] = useState<number>( 20 );

  // 获取角色列表
  const getRoleList = useCallback( async ( params?: any ) =>
  {
    setLoading( true );
    try
    {
      const response = await request<RoleListResponse>( '/api/roles', {
        method: 'GET',
        params: {
          current,
          pageSize,
          ...params,
        },
      } );

      if ( response.success )
      {
        setRoles( response.data.list );
        setTotal( response.data.total );
        setCurrent( response.data.current );
        setPageSize( response.data.pageSize );
        return response;
      } else
      {
        throw new Error( response.message || '获取角色列表失败' );
      }
    } catch ( error: any )
    {
      message.error( error.message || '获取角色列表失败' );
      throw error;
    } finally
    {
      setLoading( false );
    }
  }, [ current, pageSize ] );

  // 获取单个角色
  const getRole = useCallback( async ( id: string ) =>
  {
    try
    {
      const response = await request<ApiResponse<Role>>( `/api/roles/${ id }`, {
        method: 'GET',
      } );

      if ( response.success )
      {
        return response.data;
      } else
      {
        throw new Error( response.message || '获取角色失败' );
      }
    } catch ( error: any )
    {
      message.error( error.message || '获取角色失败' );
      throw error;
    }
  }, [] );

  // 创建角色
  const createRole = useCallback( async ( data: Partial<Role> ) =>
  {
    try
    {
      const response = await request<ApiResponse<Role>>( '/api/roles', {
        method: 'POST',
        data,
      } );

      if ( response.success )
      {
        message.success( '角色创建成功' );
        return response.data;
      } else
      {
        throw new Error( response.message || '角色创建失败' );
      }
    } catch ( error: any )
    {
      message.error( error.message || '角色创建失败' );
      throw error;
    }
  }, [] );

  // 更新角色
  const updateRole = useCallback(
    async ( id: string, data: Partial<Role> ) =>
    {
      try
      {
        const response = await request<ApiResponse<Role>>( `/api/roles/${ id }`, {
          method: 'PUT',
          data,
        } );

        if ( response.success )
        {
          message.success( '角色更新成功' );
          return response.data;
        } else
        {
          throw new Error( response.message || '角色更新失败' );
        }
      } catch ( error: any )
      {
        message.error( error.message || '角色更新失败' );
        throw error;
      }
    },
    []
  );

  // 删除角色
  const deleteRole = useCallback( async ( id: string ) =>
  {
    try
    {
      // 使用ApiResponse<void>类型来明确响应结构
      const response = await request<ApiResponse<void>>( `/api/roles/${ id }`, {
        method: 'DELETE',
      } );

      if ( response.success )
      {
        message.success( '角色删除成功' );
        return true;
      } else
      {
        throw new Error( response.message || '角色删除失败' );
      }
    } catch ( error: any )
    {
      message.error( error.message || '角色删除失败' );
      throw error;
    }
  }, [] );

  // 批量删除角色
  const batchDeleteRoles = useCallback( async ( ids: string[] ) =>
  {
    try
    {
      // 使用ApiResponse<void>类型来明确响应结构
      const response = await request<ApiResponse<void>>( '/api/roles/batch', {
        method: 'DELETE',
        data: { ids },
      } );

      if ( response.success )
      {
        message.success( '批量删除成功' );
        return true;
      } else
      {
        throw new Error( response.message || '批量删除失败' );
      }
    } catch ( error: any )
    {
      message.error( error.message || '批量删除失败' );
      throw error;
    }
  }, [] );

  // 更新角色状态
  const updateRoleStatus = useCallback(
    async ( id: string, status: 'active' | 'inactive' ) =>
    {
      try
      {
        // 使用ApiResponse<void>类型来明确响应结构
        const response = await request<ApiResponse<void>>( `/api/roles/${ id }/status`, {
          method: 'PUT',
          data: { status },
        } );

        if ( response.success )
        {
          message.success( '状态更新成功' );
          return true;
        } else
        {
          throw new Error( response.message || '状态更新失败' );
        }
      } catch ( error: any )
      {
        message.error( error.message || '状态更新失败' );
        throw error;
      }
    },
    []
  );

  // 获取角色权限
  const getRolePermissions = useCallback( async ( id: string ) =>
  {
    try
    {
      const response = await request<ApiResponse<string[]>>(
        `/api/roles/${ id }/permissions`,
        {
          method: 'GET',
        } );

      if ( response.success )
      {
        return response.data;
      } else
      {
        throw new Error( response.message || '获取角色权限失败' );
      }
    } catch ( error: any )
    {
      message.error( error.message || '获取角色权限失败' );
      throw error;
    }
  }, [] );

  // 更新角色权限
  const updateRolePermissions = useCallback(
    async ( id: string, permissionIds: string[] ) =>
    {
      try
      {
        // 使用ApiResponse<void>类型来明确响应结构
        const response = await request<ApiResponse<void>>(
          `/api/roles/${ id }/permissions`,
          {
            method: 'PUT',
            data: { permissionIds },
          }
        );

        if ( response.success )
        {
          message.success( '权限更新成功' );
          return true;
        } else
        {
          throw new Error( response.message || '权限更新失败' );
        }
      } catch ( error: any )
      {
        message.error( error.message || '权限更新失败' );
        throw error;
      }
    },
    []
  );

  // 获取所有权限（树形结构）- 从权限模型中获取
  const getAllPermissions = useCallback( async () =>
  {
    try
    {
      // 注意：这里应该调用权限模型的getAllPermissions方法
      // 但在当前上下文中我们无法直接访问它
      // 实际实现中应该通过useModel('permission')获取权限模型
      // 然后调用permissionModel.getAllPermissions()
      // 这里暂时返回一个空的成功响应
      return { success: true, data: [] };
    } catch ( error: any )
    {
      message.error( error.message || '获取权限树失败' );
      throw error;
    }
  }, [] );

  return {
    roles,
    loading,
    total,
    current,
    pageSize,
    getRoleList,
    getRole,
    createRole,
    updateRole,
    deleteRole,
    batchDeleteRoles,
    updateRoleStatus,
    getRolePermissions,
    updateRolePermissions,
    getAllPermissions,
  };
}