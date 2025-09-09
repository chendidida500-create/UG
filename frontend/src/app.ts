import { userAPI } from './services/api.ts';
import type { User } from './types/index.ts';
import { logger } from './utils/logger.ts';

// 全局初始状态，与后端用户认证系统保持一致
export async function getInitialState (): Promise<{
  currentUser?: User;
  loading?: boolean;
  settings?: {
    title: string;
    logo?: string;
    primaryColor: string;
    navTheme: 'light' | 'dark';
    layout: 'side' | 'top' | 'mix';
    contentWidth: 'Fluid' | 'Fixed';
    fixedHeader: boolean;
    fixSiderbar: boolean;
    colorWeak: boolean;
  };
}>
{
  // 检查是否有存储的token
  const token = localStorage.getItem( 'ug_token' );

  // 如果没有token，返回默认状态
  if ( !token )
  {
    return {
      settings: {
        title: 'UG管理系统',
        primaryColor: '#1890ff',
        navTheme: 'light',
        layout: 'side',
        contentWidth: 'Fluid',
        fixedHeader: true,
        fixSiderbar: true,
        colorWeak: false,
      },
    };
  }

  try
  {
    // 尝试获取当前用户信息，与后端userAPI.getProfile保持一致
    const response = await userAPI.getProfile();
    const currentUser = response.data;

    return {
      currentUser,
      settings: {
        title: 'UG管理系统',
        primaryColor: '#1890ff',
        navTheme: 'light',
        layout: 'side',
        contentWidth: 'Fluid',
        fixedHeader: true,
        fixSiderbar: true,
        colorWeak: false,
      },
    };
  } catch ( error )
  {
    logger.error( 'Failed to get initial user info:', error );

    // 获取用户信息失败，清除无效token
    localStorage.removeItem( 'ug_token' );
    localStorage.removeItem( 'ug_refresh_token' );

    return {
      settings: {
        title: 'UG管理系统',
        primaryColor: '#1890ff',
        navTheme: 'light',
        layout: 'side',
        contentWidth: 'Fluid',
        fixedHeader: true,
        fixSiderbar: true,
        colorWeak: false,
      },
    };
  }
}
