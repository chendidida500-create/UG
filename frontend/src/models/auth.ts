import { message } from 'antd';
import axios from 'axios';
import { useCallback, useState } from 'react';
// 使用 browser history 代替 umi history
import { createBrowserHistory } from 'history';
import type { LoginParams, RegisterParams, User } from '../types/index.ts';

// 创建 browser history 实例
const history = createBrowserHistory();

// 定义通用API响应格式
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

// 定义AuthModelState类型，包含当前用户信息和认证相关操作
export interface AuthModelState {
  currentUser: User | null;
  loading: boolean;
  loginLoading: boolean;
  login: (params: LoginParams) => Promise<any>;
  register: (params: RegisterParams) => Promise<any>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
  updateProfile: (params: any) => Promise<any>;
  updatePassword: (params: any) => Promise<any>;
  getRememberedUsername: () => string;
  // 添加sendCaptcha函数到接口定义中
  sendCaptcha: (email: string) => Promise<any>;
}

export default function useAuthModel(): AuthModelState {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

  // 登录
  const login = useCallback(async (params: LoginParams) => {
    setLoginLoading(true);
    try {
      const response = await axios.post('/api/auth/login', params);
      const apiResponse = response.data as ApiResponse<{
        user: User;
        token: string;
        refreshToken: string;
      }>;

      if (apiResponse.success) {
        const { user, token, refreshToken } = apiResponse.data;

        // 保存token
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', refreshToken);

        // 设置当前用户
        setCurrentUser(user);

        // 记住密码
        if (params.remember) {
          localStorage.setItem('rememberedUsername', params.username);
        } else {
          localStorage.removeItem('rememberedUsername');
        }

        message.success('登录成功');

        // 跳转到重定向页面或首页
        const urlParams = new URLSearchParams(window.location.search);
        const redirect = urlParams.get('redirect') || '/dashboard';
        history.push(decodeURIComponent(redirect));

        return { success: true, data: user };
      } else {
        throw new Error(apiResponse.message || '登录失败');
      }
    } catch (error: any) {
      message.error(error.message || '登录失败');
      throw error;
    } finally {
      setLoginLoading(false);
    }
  }, []);

  // 注册
  const register = useCallback(async (params: RegisterParams) => {
    try {
      const response = await axios.post('/api/auth/register', params);
      const apiResponse = response.data as ApiResponse<User>;

      if (apiResponse.success) {
        message.success('注册成功');
        return { success: true, data: apiResponse.data };
      } else {
        throw new Error(apiResponse.message || '注册失败');
      }
    } catch (error: any) {
      message.error(error.message || '注册失败');
      throw error;
    }
  }, []);

  // 发送验证码
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const sendCaptcha = useCallback(async (email: string) => {
    try {
      const response = await axios.post('/api/auth/captcha', { email });
      const apiResponse = response.data as ApiResponse<void>;

      if (apiResponse.success) {
        return { success: true };
      } else {
        throw new Error(apiResponse.message || '发送验证码失败');
      }
    } catch (error: any) {
      message.error(error.message || '发送验证码失败');
      throw error;
    }
  }, []);

  // 退出登录
  const logout = useCallback(async () => {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.log('logout error:', error);
    } finally {
      // 清除本地存储
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      setCurrentUser(null);

      // 跳转到登录页
      history.push('/auth/login');
      message.success('已退出登录');
    }
  }, []);

  // 检查认证状态
  const checkAuth = useCallback(async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setCurrentUser(null);
      return;
    }

    setLoading(true);
    try {
      const response = await axios.get('/api/auth/me');
      const apiResponse = response.data as ApiResponse<User>;

      if (apiResponse.success) {
        setCurrentUser(apiResponse.data);
      } else {
        // Token无效，清除本地存储
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setCurrentUser(null);
      }
    } catch (error) {
      console.log('checkAuth error:', error);
      // 网络错误或其他异常，清除本地存储
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 更新个人信息
  const updateProfile = useCallback(async (params: any) => {
    try {
      const response = await axios.put('/api/me', params);
      const apiResponse = response.data as ApiResponse<User>;

      if (apiResponse.success) {
        // 更新当前用户信息
        setCurrentUser((prev: User | null) => {
          if (!prev) return null;
          return {
            ...prev,
            ...apiResponse.data,
          };
        });
        message.success('更新成功');
        return { success: true, data: apiResponse.data };
      } else {
        throw new Error(apiResponse.message || '更新失败');
      }
    } catch (error: any) {
      message.error(error.message || '更新失败');
      throw error;
    }
  }, []);

  // 修改密码
  const updatePassword = useCallback(async (params: any) => {
    try {
      const response = await axios.put('/api/me/password', params);
      const apiResponse = response.data as ApiResponse<void>;

      if (apiResponse.success) {
        message.success('密码修改成功');
        return { success: true };
      } else {
        throw new Error(apiResponse.message || '密码修改失败');
      }
    } catch (error: any) {
      message.error(error.message || '密码修改失败');
      throw error;
    }
  }, []);

  // 获取记住的用户名
  const getRememberedUsername = useCallback(() => {
    return localStorage.getItem('rememberedUsername') || '';
  }, []);

  return {
    currentUser,
    loading,
    loginLoading,
    login,
    register,
    logout,
    checkAuth,
    updateProfile,
    updatePassword,
    getRememberedUsername,
    // 在返回对象中添加sendCaptcha函数
    sendCaptcha,
  };
}
