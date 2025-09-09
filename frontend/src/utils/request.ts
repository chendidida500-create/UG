import { message } from 'antd';
// 严格遵循UMI 4.x官方规范
import { history } from 'umi';
import { request } from '@umijs/max';
import type { RequestOptions } from '@umijs/max';

// 定义刷新token响应类型
interface RefreshTokenResponse {
  success: boolean;
  data?: {
    token: string;
    refreshToken: string;
  };
}

// 严格遵循UMI 4.x官方规范，创建配置函数
const getRequestConfig = (options?: RequestOptions): RequestOptions => {
  // 添加token到请求头
  const token = localStorage.getItem('token');
  return {
    timeout: 30000,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    ...options,
  };
};

// 定义请求错误类型
interface RequestError extends Error {
  response?: {
    status: number;
    statusText: string;
    data?: {
      message?: string;
      success?: boolean;
      code?: string | number;
    };
  };
  code?: string | number;
}

// 处理响应错误
const handleResponseError = (error: RequestError): never => {
  const { response } = error;

  if (response && response.status) {
    const { status, statusText } = response;
    const errorMessage = `请求错误 ${status}: ${statusText || response.data?.message || '未知错误'}`;
    message.error(errorMessage);
  } else if (!response) {
    message.error('网络异常，请检查网络连接');
  }

  throw error;
};

// 处理token过期逻辑
const handleTokenExpired = async (): Promise<boolean> => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      return false;
    }

    // 刷新token - 严格按照API使用方式，并添加类型断言
    const refreshResponse: RefreshTokenResponse = (await request(
      '/api/auth/refresh',
      {
        method: 'POST',
        data: { refreshToken },
      }
    ).catch(handleResponseError)) as RefreshTokenResponse;

    if (refreshResponse.success && refreshResponse.data) {
      const { token: newToken, refreshToken: newRefreshToken } =
        refreshResponse.data;
      localStorage.setItem('token', newToken);
      localStorage.setItem('refreshToken', newRefreshToken);
      return true;
    }
    return false;
  } catch (error) {
    // 移除了控制台错误输出，避免意外的 console 语句
    return false;
    return false;
  }
};

// 添加泛型支持的请求函数 - 与项目中现有代码保持兼容
export const typedRequest = async <T = unknown>(
  url: string,
  options?: RequestOptions
): Promise<T> => {
  try {
    const config = getRequestConfig(options);

    // 第一次请求 - 严格按照API使用方式
    try {
      const response = await request<T>(url, config);
      return response;
    } catch (error: unknown) {
      // 类型断言为 RequestError
      const requestError = error as RequestError;

      // 处理token过期情况
      if (
        requestError.response?.status === 401 &&
        requestError.response?.data?.message === 'Token expired'
      ) {
        // 尝试刷新token
        const refreshed = await handleTokenExpired();
        if (refreshed) {
          // 刷新成功后重新请求
          const newConfig = getRequestConfig(options);
          const response = await request<T>(url, newConfig);
          return response;
        }
      }

      // 其他错误处理
      if (requestError.response?.status === 401) {
        // 未授权，清除token并跳转到登录页
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        history.push('/auth/login');
        message.error('登录已过期，请重新登录');
      }

      // 业务错误处理
      if (
        requestError.response?.data?.success === false &&
        requestError.response?.data?.code !== 200
      ) {
        const businessError = new Error(
          requestError.response.data.message || '请求失败'
        );
        businessError.name = 'BusinessError';
        if (requestError.response.data.code !== undefined) {
          (businessError as RequestError).code =
            requestError.response.data.code;
        }
        throw businessError;
      }

      // 处理其他网络错误
      throw handleResponseError(requestError);
    }
  } catch (error) {
    // 向上抛出错误
    throw error;
  }
};

// 文件上传请求 - 保持原有API不变
export const uploadRequest = (
  url: string,
  file: File,
  onProgress?: (percent: number) => void
): Promise<unknown> => {
  return new Promise((resolve, reject) => {
    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();

    // 监听上传进度
    if (onProgress) {
      xhr.upload.onprogress = (event: ProgressEvent) => {
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

// 下载文件 - 保持原有API不变
export const downloadFile = async (
  url: string,
  filename?: string
): Promise<void> => {
  try {
    // 使用@umijs/max的request进行文件下载 - 严格按照API使用方式
    const response = await request(url, {
      method: 'GET',
      responseType: 'blob',
      headers: {
        Authorization: localStorage.getItem('token')
          ? `Bearer ${localStorage.getItem('token')}`
          : '',
      },
    });

    // 处理Blob响应
    const blob = new Blob([response as unknown as BlobPart]);
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

// 默认导出 - 与项目中现有代码保持兼容

export default typedRequest;
