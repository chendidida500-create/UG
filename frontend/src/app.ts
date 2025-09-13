import { RequestConfig, history } from 'umi';
import { message } from 'antd';

// 定义全局初始化状态的返回类型
interface InitialState {
  currentUser: any;
}

// 全局初始化状态
export async function getInitialState(): Promise<InitialState> {
  const token = localStorage.getItem('token');
  if (!token) {
    return {
      currentUser: undefined,
    };
  }

  try {
    // 获取用户信息
    const response = await fetch('/api/auth/profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.ok) {
      const result = await response.json();
      if (result.success) {
        return {
          currentUser: result.data,
        };
      }
    }
  } catch (error) {
    console.error('获取用户信息失败:', error);
  }

  // 如果获取用户信息失败，清除token
  localStorage.removeItem('token');
  return {
    currentUser: undefined,
  };
}

// 请求配置
export const request: RequestConfig = {
  // 统一请求前缀
  prefix: '/api',
  
  // 请求拦截器
  requestInterceptors: [
    (url, options) => {
      const token = localStorage.getItem('token');
      if (token) {
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };
      }
      return { url, options };
    },
  ],

  // 响应拦截器
  responseInterceptors: [
    (response) => {
      // 处理401未授权错误
      if (response.status === 401) {
        localStorage.removeItem('token');
        history.push('/login');
        message.error('登录已过期，请重新登录');
      }
      return response;
    },
  ],
};

// 路由权限控制
export function render(oldRender: () => void) {
  oldRender();
}