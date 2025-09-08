import { message } from 'antd';
import { useCallback, useState } from 'react';
// 修复UMI 4.x导入方式
import { typedRequest as request } from '@/utils/request';

// 定义通用API响应格式
interface ApiResponse<T>
{
  success: boolean;
  message: string;
  data: T;
}

interface Permission
{
  id: string;
  name: string;
  code: string;
  type: 'menu' | 'button' | 'api';
  parentId?: string;
  path?: string;
  component?: string;
  icon?: string;
  sort: number;
  status: 'active' | 'inactive';
  description?: string;
  children?: Permission[];
  createdAt: string;
  updatedAt: string;
}

interface UserPermissions
{
  [ key: string ]: boolean;
}

// 定义PermissionModelState类型，包含权限列表和权限管理相关操作
export interface PermissionModelState
{
  permissions: Permission[];
  userPermissions: UserPermissions;
  loading: boolean;
  getPermissionList: ( params?: any ) => Promise<any>;
  getAllPermissions: () => Promise<any>;
  createPermission: ( data: Partial<Permission> ) => Promise<any>;
  updatePermission: ( id: string, data: Partial<Permission> ) => Promise<any>;
  deletePermission: ( id: string ) => Promise<any>;
  batchDeletePermissions: ( ids: string[] ) => Promise<any>;
  updatePermissionStatus: ( id: string, status: 'active' | 'inactive' ) => Promise<any>;
  getUserPermissions: ( userId?: string ) => Promise<any>;
  hasPermission: ( permissionCode: string | string[] ) => boolean;
  hasAllPermissions: ( permissionCodes: string[] ) => boolean;
  filterMenuByPermission: ( menus: any[] ) => any[];
}

export default function usePermissionModel (): PermissionModelState
{
  const [ permissions, setPermissions ] = useState<Permission[]>( [] );
  const [ userPermissions, setUserPermissions ] = useState<UserPermissions>( {} );
  const [ loading, setLoading ] = useState<boolean>( false );

  // 获取权限列表
  const getPermissionList = useCallback( async ( params?: any ) =>
  {
    setLoading( true );
    try
    {
      const response = await request<ApiResponse<Permission[]>>( '/api/permissions', {
        method: 'GET',
        params,
      } );

      if ( response.success )
      {
        setPermissions( response.data );
        return response;
      } else
      {
        throw new Error( response.message || '获取权限列表失败' );
      }
    } catch ( error: any )
    {
      message.error( error.message || '获取权限列表失败' );
      throw error;
    } finally
    {
      setLoading( false );
    }
  }, [] );

  // 获取所有权限（树形结构）
  const getAllPermissions = useCallback( async () =>
  {
    try
    {
      const response = await request<ApiResponse<Permission[]>>( '/api/permissions/tree', {
        method: 'GET',
      } );

      if ( response.success )
      {
        return response.data;
      } else
      {
        throw new Error( response.message || '获取权限树失败' );
      }
    } catch ( error: any )
    {
      message.error( error.message || '获取权限树失败' );
      throw error;
    }
  }, [] );

  // 创建权限
  const createPermission = useCallback( async ( data: Partial<Permission> ) =>
  {
    try
    {
      const response = await request<ApiResponse<Permission>>( '/api/permissions', {
        method: 'POST',
        data,
      } );

      if ( response.success )
      {
        message.success( '权限创建成功' );
        return response.data;
      } else
      {
        throw new Error( response.message || '权限创建失败' );
      }
    } catch ( error: any )
    {
      message.error( error.message || '权限创建失败' );
      throw error;
    }
  }, [] );

  // 更新权限
  const updatePermission = useCallback(
    async ( id: string, data: Partial<Permission> ) =>
    {
      try
      {
        const response = await request<ApiResponse<Permission>>( `/api/permissions/${ id }`, {
          method: 'PUT',
          data,
        } );

        if ( response.success )
        {
          message.success( '权限更新成功' );
          return response.data;
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

  // 删除权限
  const deletePermission = useCallback( async ( id: string ) =>
  {
    try
    {
      const response = await request<ApiResponse<void>>( `/api/permissions/${ id }`, {
        method: 'DELETE',
      } );

      if ( response.success )
      {
        message.success( '权限删除成功' );
        return true;
      } else
      {
        throw new Error( response.message || '权限删除失败' );
      }
    } catch ( error: any )
    {
      message.error( error.message || '权限删除失败' );
      throw error;
    }
  }, [] );

  // 批量删除权限
  const batchDeletePermissions = useCallback( async ( ids: string[] ) =>
  {
    try
    {
      const response = await request<ApiResponse<void>>( '/api/permissions/batch', {
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

  // 更新权限状态
  const updatePermissionStatus = useCallback(
    async ( id: string, status: 'active' | 'inactive' ) =>
    {
      try
      {
        const response = await request<ApiResponse<void>>( `/api/permissions/${ id }/status`, {
          method: 'PUT',
          data: { status },
        } );

        if ( response.success )
        {
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

  // 获取用户权限
  const getUserPermissions = useCallback( async ( userId?: string ) =>
  {
    try
    {
      const url = userId
        ? `/api/users/${ userId }/permissions`
        : '/api/auth/permissions';
      const response = await request<ApiResponse<string[]>>( url, {
        method: 'GET',
      } );

      if ( response.success )
      {
        // 将权限数组转换为权限映射对象，便于快速查找
        const permissionMap: UserPermissions = {};
        response.data.forEach( ( permission: string ) =>
        {
          permissionMap[ permission ] = true;
        } );

        setUserPermissions( permissionMap );
        return response.data;
      } else
      {
        throw new Error( response.message || '获取用户权限失败' );
      }
    } catch ( error: any )
    {
      console.error( '获取用户权限失败:', error );
      setUserPermissions( {} );
      throw error;
    }
  }, [] );

  // 检查权限
  const hasPermission = useCallback(
    ( permissionCode: string | string[] ) =>
    {
      if ( !permissionCode ) return true;

      if ( Array.isArray( permissionCode ) )
      {
        // 检查是否拥有任一权限
        return permissionCode.some( code => userPermissions[ code ] === true );
      } else
      {
        // 检查单个权限
        return userPermissions[ permissionCode ] === true;
      }
    },
    [ userPermissions ]
  );

  // 检查多个权限（全部需要拥有）
  const hasAllPermissions = useCallback(
    ( permissionCodes: string[] ) =>
    {
      return permissionCodes.every( code => userPermissions[ code ] === true );
    },
    [ userPermissions ]
  );

  // 按权限过滤菜单
  const filterMenuByPermission = useCallback(
    ( menus: any[] ) =>
    {
      return menus.filter( menu =>
      {
        // 如果没有权限要求，直接显示
        if ( !menu.permission ) return true;

        // 检查权限
        const hasAccess = hasPermission( menu.permission );

        // 如果有子菜单，递归过滤
        if ( menu.children && menu.children.length > 0 )
        {
          menu.children = filterMenuByPermission( menu.children );
          // 如果当前菜单没有权限但有可访问的子菜单，也显示
          return hasAccess || menu.children.length > 0;
        }

        return hasAccess;
      } );
    },
    [ hasPermission ]
  );

  return {
    permissions,
    userPermissions,
    loading,
    getPermissionList,
    getAllPermissions,
    createPermission,
    updatePermission,
    deletePermission,
    batchDeletePermissions,
    updatePermissionStatus,
    getUserPermissions,
    hasPermission,
    hasAllPermissions,
    filterMenuByPermission,
  };
}