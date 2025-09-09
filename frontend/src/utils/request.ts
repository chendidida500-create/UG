import { message } from 'antd';
// 修复UMI 4.x导入方式
import { history } from 'umi';
import { extend } from 'umi-request';

// 定义刷新token响应类型
interface RefreshTokenResponse {
  success: boolean;
  data?: {
    token: string;
    refreshToken: string;
  };
}

// 创建请求实例
const request = extend({
  prefix: process.env.API_BASE_URL || 'http://localhost:15001',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
  errorHandler: (error: any) => {
    const { response } = error;

    if (response && response.status) {
      const { status, statusText } = response;
      const errorMessage = `请求错误 ${status}: ${statusText}`;

      switch (status) {
        case 401:
          // 未授权，清除token并跳转到登录页
          localStorage.removeItem('token');
          localStorage.removeItem('refreshToken');
          history.push('/auth/login');
          message.error('登录已过期，请重新登录');
          break;
        case 403:
          message.error('权限不足');
          break;
        case 404:
          message.error('请求的资源不存在');
          break;
        case 500:
          message.error('服务器内部错误');
          break;
        default:
          message.error(errorMessage);
          break;
      }
    } else if (!response) {
      message.error('网络异常，请检查网络连接');
    }

    throw error;
  },
});

// 请求拦截器
request.interceptors.request.use((url: any, options: any) => {
  // 添加 Authorization 头
  const token = localStorage.getItem('token');
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`,
    };
  }

  return {
    url,
    options,
  };
});

// 响应拦截器
request.interceptors.response.use(async (response: any, options: any) => {
  const responseData = await response.clone().json();

  // 处理token过期
  if (responseData.code === 401 && responseData.message === 'Token expired') {
    try {
      // 尝试刷新token
      const refreshToken = localStorage.getItem('refreshToken');
      if (refreshToken) {
        const refreshResponse: RefreshTokenResponse = await request('/api/auth/refresh', {
          method: 'POST',
          data: { refreshToken },
          skipTokenRefresh: true, // 避免无限递归
        });

        if (refreshResponse.success && refreshResponse.data) {
          const { token: newToken, refreshToken: newRefreshToken } = 
            refreshResponse.data;
          localStorage.setItem('token', newToken);
          localStorage.setItem('refreshToken', newRefreshToken);

          // 重新发起原请求
          const newOptions = {
            ...options,
            headers: {
              ...options.headers,
              Authorization: `Bearer ${newToken}`,
            },
          };

          return request(response.url, newOptions);
        }
      }
    } catch (error) {
      console.error('Token refresh failed:', error);
    }

    // 刷新失败，清除token并跳转登录
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    history.push('/auth/login');
    message.error('登录已过期，请重新登录');

    throw new Error('Token expired');
  }

  // 处理业务错误
  if (!responseData.success && responseData.code !== 200) {
    const error: any = new Error(responseData.message || '请求失败');
    error.name = 'BusinessError';
    (error as any).code = responseData.code;
    throw error;
  }

  return response;
});

// 添加泛型支持的请求函数
export const typedRequest = async <T = any>(
  url: string,
  options?: any
): Promise<T> => {
  return request(url, options);
};

// 文件上传请求
export const uploadRequest = (
  url: string,
  file: File,
  onProgress?: (percent: number) => void
) => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();

    // 监听上传进度
    if (onProgress) {
      xhr.upload.onprogress = event => {
        if (event.lengthComputable) {
          const percent = Math.round((event.loaded / event.total) * 100);
          onProgress(percent);
        }
      };
    }

    // 监听状态变化
    xhr.onreadystatechange = () => {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            resolve(response);
          } catch (error) {
            reject(new Error('响应解析失败'));
          }
        } else {
          reject(new Error(`上传失败: ${xhr.status} ${xhr.statusText}`));
        }
      }
    };

    // 监听错误
    xhr.onerror = () => {
      reject(new Error('网络错误'));
    };

    // 添加授权头
    const token = localStorage.getItem('token');
    if (token) {
      xhr.setRequestHeader('Authorization', `Bearer ${token}`);
    }

    // 发送请求
    xhr.open(
      'POST',
      `${process.env.API_BASE_URL || 'http://localhost:15001'}${url}`
    );
    xhr.send(formData);
  });
};

// 下载文件
export const downloadFile = async (url: string, filename?: string) => {
  try {
    const response = await request(url, {
      method: 'GET',
      responseType: 'blob',
    });

    const blob = new Blob([response as BlobPart]);
    const downloadUrl = window.URL.createObjectURL(blob);

    const link = document.createElement('a');
    link.href = downloadUrl;
    link.download = filename || `download_${Date.now()}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    window.URL.revokeObjectURL(downloadUrl);
  } catch (error) {
    message.error('文件下载失败');
    throw error;
  }
};

export default request;