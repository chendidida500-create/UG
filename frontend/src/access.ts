// src/access.ts
import { InitialState } from '@@/plugin-initial-state/InitialState';

// 定义权限检查规则
export default function access(initialState: InitialState | undefined) {
  const { currentUser } = initialState || {};
  
  return {
    // 管理员权限
    isAdmin: currentUser?.roles?.includes('admin'),
    
    // 用户管理权限
    canUserManage: currentUser?.roles?.includes('admin') || currentUser?.roles?.includes('userManager'),
    
    // 角色管理权限
    canRoleManage: currentUser?.roles?.includes('admin') || currentUser?.roles?.includes('roleManager'),
    
    // 权限管理权限
    canPermissionManage: currentUser?.roles?.includes('admin') || currentUser?.roles?.includes('permissionManager'),
    
    // 系统监控权限
    canSystemMonitor: currentUser?.roles?.includes('admin') || currentUser?.roles?.includes('monitor'),
    
    // 报表查看权限
    canViewReports: currentUser?.roles?.includes('admin') || currentUser?.roles?.includes('reportViewer'),
  };
}