import { message } from 'antd';
import { useCallback, useState } from 'react';
// 修复UMI 4.x导入方式
import { history, request } from 'umi';
import type { LoginParams, RegisterParams, User } from '../types';

// 定义AuthModelState类型
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
}

export default function useAuthModel(): AuthModelState {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [loginLoading, setLoginLoading] = useState<boolean>(false);

  // 登录
  const login = useCallback(async (params: LoginParams) => {
    setLoginLoading(true);
    try {
      const response = await request('/api/auth/login', {
        method: 'POST',
        data: params,
      });

      if (response.success) {
        const { user, token, refreshToken } = response.data;

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
        throw new Error(response.message || '登录失败');
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
      const response = await request('/api/auth/register', {
        method: 'POST',
        data: params,
      });

      if (response.success) {
        message.success('注册成功');
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || '注册失败');
      }
    } catch (error: any) {
      message.error(error.message || '注册失败');
      throw error;
    }
  }, []);

  // 发送验证码
  const sendCaptcha = useCallback(async (email: string) => {
    try {
      const response = await request('/api/auth/captcha', {
        method: 'POST',
        data: { email },
      });

      if (response.success) {
        return { success: true };
      } else {
        throw new Error(response.message || '发送验证码失败');
      }
    } catch (error: any) {
      message.error(error.message || '发送验证码失败');
      throw error;
    }
  }, []);

  // 退出登录
  const logout = useCallback(async () => {
    try {
      await request('/api/auth/logout', {
        method: 'POST',
      });
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
      const response = await request('/api/auth/me', {
        method: 'GET',
      });

      if (response.success) {
        setCurrentUser(response.data);
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
      const response = await request('/api/me', {
        method: 'PUT',
        data: params,
      });

      if (response.success) {
        // 更新当前用户信息
        setCurrentUser(prev => ({
          ...prev,
          ...response.data,
        }));
        message.success('更新成功');
        return { success: true, data: response.data };
      } else {
        throw new Error(response.message || '更新失败');
      }
    } catch (error: any) {
      message.error(error.message || '更新失败');
      throw error;
    }
  }, []);

  // 修改密码
  const updatePassword = useCallback(async (params: any) => {
    try {
      const response = await request('/api/me/password', {
        method: 'PUT',
        data: params,
      });

      if (response.success) {
        message.success('密码修改成功');
        return { success: true };
      } else {
        throw new Error(response.message || '密码修改失败');
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
  };
}