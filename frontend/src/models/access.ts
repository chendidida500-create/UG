// import { useModel } from 'umi';
// 使用模拟的useModel
import type { Permission, User } from '../types';
// 修复UMI 4.x导入方式
// import { useModel } from 'umi';
import { useModel } from '../utils/umiMock';

// 定义AccessModelState类型，包含当前用户信息和权限检查方法
export interface AccessModelState
{
  currentUser: User | null;
  hasPermission: ( permissionCode: string ) => boolean;
  hasAnyPermission: ( permissionCodes: string[] ) => boolean;
  hasAllPermissions: ( permissionCodes: string[] ) => boolean;
  hasRole: ( roleCode: string ) => boolean;
  hasAnyRole: ( roleCodes: string[] ) => boolean;
  canUser: () => boolean;
  canAdmin: () => boolean;
  canSuperAdmin: () => boolean;
  canManageUsers: () => boolean;
  canViewUsers: () => boolean;
  canCreateUser: () => boolean;
  canUpdateUser: () => boolean;
  canDeleteUser: () => boolean;
  canManageRoles: () => boolean;
  canViewRoles: () => boolean;
  canCreateRole: () => boolean;
  canUpdateRole: () => boolean;
  canDeleteRole: () => boolean;
  canManagePermissions: () => boolean;
  canViewPermissions: () => boolean;
  canCreatePermission: () => boolean;
  canUpdatePermission: () => boolean;
  canDeletePermission: () => boolean;
  canViewProfile: () => boolean;
  canUpdateProfile: () => boolean;
  canUpdatePassword: () => boolean;
  canViewDashboard: () => boolean;
  getMenuPermissions: () => Permission[];
  getButtonPermissions: () => string[];
}

// 权限访问控制，与后端权限中间件逻辑保持一致
export default function useAccessModel (): AccessModelState
{
  const { currentUser } = useModel<'auth'>( 'auth' );

  // 检查用户是否有指定权限
  const hasPermission = ( permissionCode: string ): boolean =>
  {
    if ( !currentUser || !currentUser.roles )
    {
      return false;
    }

    // 超级管理员拥有所有权限
    if (
      currentUser.roles.some(
        ( role: { code: string } ) => role.code === 'super_admin'
      )
    )
    {
      return true;
    }

    // 检查用户角色是否包含指定权限
    return currentUser.roles.some(
      ( role: { permissions?: Array<{ code: string; status: number }> } ) =>
        role.permissions?.some(
          ( permission: { code: string; status: number } ) =>
            permission.code === permissionCode && permission.status === 1
        )
    );
  };

  // 检查用户是否有任意一个权限
  const hasAnyPermission = ( permissionCodes: string[] ): boolean =>
  {
    return permissionCodes.some( code => hasPermission( code ) );
  };

  // 检查用户是否拥有所有权限
  const hasAllPermissions = ( permissionCodes: string[] ): boolean =>
  {
    return permissionCodes.every( code => hasPermission( code ) );
  };

  // 检查用户是否有指定角色
  const hasRole = ( roleCode: string ): boolean =>
  {
    if ( !currentUser || !currentUser.roles )
    {
      return false;
    }

    return currentUser.roles.some(
      ( role: { code: string; status: number } ) =>
        role.code === roleCode && role.status === 1
    );
  };

  // 检查用户是否有任意一个角色
  const hasAnyRole = ( roleCodes: string[] ): boolean =>
  {
    return roleCodes.some( code => hasRole( code ) );
  };

  // 基础访问权限定义，与后端路由权限保持一致
  const accessPermissions = {
    // 基础用户权限
    canUser: (): boolean =>
    {
      return !!currentUser && ( currentUser as User ).status === 1;
    },

    // 管理员权限
    canAdmin: (): boolean =>
    {
      return hasAnyRole( [ 'admin', 'super_admin' ] );
    },

    // 超级管理员权限
    canSuperAdmin: (): boolean =>
    {
      return hasRole( 'super_admin' );
    },

    // 用户管理权限
    canManageUsers: (): boolean =>
    {
      return hasPermission( 'system:user:manage' ) || hasRole( 'super_admin' );
    },

    canViewUsers: (): boolean =>
    {
      return (
        hasPermission( 'system:user:view' ) || accessPermissions.canManageUsers()
      );
    },

    canCreateUser: (): boolean =>
    {
      return (
        hasPermission( 'system:user:create' ) ||
        accessPermissions.canManageUsers()
      );
    },

    canUpdateUser: (): boolean =>
    {
      return (
        hasPermission( 'system:user:update' ) ||
        accessPermissions.canManageUsers()
      );
    },

    canDeleteUser: (): boolean =>
    {
      return (
        hasPermission( 'system:user:delete' ) ||
        accessPermissions.canManageUsers()
      );
    },

    // 角色管理权限
    canManageRoles: (): boolean =>
    {
      return hasPermission( 'system:role:manage' ) || hasRole( 'super_admin' );
    },

    canViewRoles: (): boolean =>
    {
      return (
        hasPermission( 'system:role:view' ) || accessPermissions.canManageRoles()
      );
    },

    canCreateRole: (): boolean =>
    {
      return (
        hasPermission( 'system:role:create' ) ||
        accessPermissions.canManageRoles()
      );
    },

    canUpdateRole: (): boolean =>
    {
      return (
        hasPermission( 'system:role:update' ) ||
        accessPermissions.canManageRoles()
      );
    },

    canDeleteRole: (): boolean =>
    {
      return (
        hasPermission( 'system:role:delete' ) ||
        accessPermissions.canManageRoles()
      );
    },

    // 权限管理权限
    canManagePermissions: (): boolean =>
    {
      return (
        hasPermission( 'system:permission:manage' ) || hasRole( 'super_admin' )
      );
    },

    canViewPermissions: (): boolean =>
    {
      return (
        hasPermission( 'system:permission:view' ) ||
        accessPermissions.canManagePermissions()
      );
    },

    canCreatePermission: (): boolean =>
    {
      return (
        hasPermission( 'system:permission:create' ) ||
        accessPermissions.canManagePermissions()
      );
    },

    canUpdatePermission: (): boolean =>
    {
      return (
        hasPermission( 'system:permission:update' ) ||
        accessPermissions.canManagePermissions()
      );
    },

    canDeletePermission: (): boolean =>
    {
      return (
        hasPermission( 'system:permission:delete' ) ||
        accessPermissions.canManagePermissions()
      );
    },

    // 个人中心权限
    canViewProfile: (): boolean =>
    {
      return accessPermissions.canUser();
    },

    canUpdateProfile: (): boolean =>
    {
      return accessPermissions.canUser();
    },

    canUpdatePassword: (): boolean =>
    {
      return accessPermissions.canUser();
    },

    // 工作台权限
    canViewDashboard: (): boolean =>
    {
      return accessPermissions.canUser();
    },
  };

  // 获取用户菜单权限，与后端菜单权限保持一致
  const getMenuPermissions = (): Permission[] =>
  {
    if ( !currentUser || !currentUser.roles )
    {
      return [];
    }

    const menuPermissions: Permission[] = [];

    currentUser.roles.forEach(
      ( role: { permissions?: Permission[]; status: number } ) =>
      {
        if ( role.permissions && role.status === 1 )
        {
          role.permissions.forEach( ( permission: Permission ) =>
          {
            if ( permission.type === 'menu' && permission.status === 1 )
            {
              // 避免重复添加
              if ( !menuPermissions.find( p => p.id === permission.id ) )
              {
                menuPermissions.push( permission );
              }
            }
          } );
        }
      }
    );

    return menuPermissions;
  };

  // 获取用户按钮权限
  const getButtonPermissions = (): string[] =>
  {
    if ( !currentUser || !currentUser.roles )
    {
      return [];
    }

    const buttonPermissions: string[] = [];

    currentUser.roles.forEach(
      ( role: {
        permissions?: Array<{ type: string; status: number; code: string }>;
        status: number;
      } ) =>
      {
        if ( role.permissions && role.status === 1 )
        {
          role.permissions.forEach(
            ( permission: { type: string; status: number; code: string } ) =>
            {
              if ( permission.type === 'button' && permission.status === 1 )
              {
                buttonPermissions.push( permission.code );
              }
            }
          );
        }
      }
    );

    return [ ...new Set( buttonPermissions ) ]; // 去重
  };

  return {
    // 当前用户信息
    currentUser,

    // 权限检查方法
    hasPermission,
    hasAnyPermission,
    hasAllPermissions,
    hasRole,
    hasAnyRole,

    // 具体权限检查，与UMI路由配置的access保持一致
    ...accessPermissions,

    // 权限数据获取
    getMenuPermissions,
    getButtonPermissions,
  };
}
