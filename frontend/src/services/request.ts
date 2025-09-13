import { extend } from 'umi-request';
import { notification, message } from 'antd';

// 创建请求实例
const request = extend({
  credentials: 'include', // 默认请求是否带上cookie
  prefix: '/api',
});

// 错误统一处理
const errorHandler = (error: any) => {
  const { response } = error;
  
  if (response && response.status) {
    const errorText = `请求错误 ${response.status}`;
    
    notification.error({
      message: errorText,
      description: error.message,
    });
    
    // 403 处理
    if (response.status === 403) {
      window.location.href = '/exception/403';
    }
    
    // 5xx 错误处理
    if (response.status >= 500) {
      window.location.href = '/exception/500';
    }
  } else if (!error.request) {
    // 网络异常
    notification.error({
      message: '网络异常',
      description: '请检查您的网络连接',
    });
  }
  
  return Promise.reject(error);
};

// 响应拦截器
request.interceptors.response.use(async (response) => {
  try {
    const data = await response.clone().json();

    // 如果返回401，跳转到登录页
    if (response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
      return Promise.reject(new Error('未授权'));
    }

    return response;
  } catch (error) {
    return Promise.reject(error);
  }
});

// 请求拦截器
request.interceptors.request.use((url, options) => {
  const token = localStorage.getItem('token');
  
  if (token) {
    const headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json;charset=UTF-8',
    };
    
    return {
      url,
      options: {
        ...options,
        headers,
        interceptors: true,
      },
    };
  }
  
  return {
    url,
    options: { ...options, interceptors: true },
  };
});

export default request;