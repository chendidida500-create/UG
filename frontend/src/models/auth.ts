import { message } from 'antd';
import { useCallback, useState } from 'react';
// 修复UMI 4.x导入方式
import { history, request } from 'umi';
import type { LoginParams, RegisterParams, User } from '../types';

export type AuthModelState = ReturnType<typeof useAuthModel>;

export default function useAuthModel() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [loginLoading, setLoginLoading] = useState(false);

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
        message.success('注册成功，请登录');
        return { success: true };
      } else {
        throw new Error(response.message || '注册失败');
      }
    } catch (error: any) {
      message.error(error.message || '注册失败');
      throw error;
    }
  }, []);

  // 发送验证码
  const sendVerifyCode = useCallback(async (email: string, type: string) => {
    try {
      const response = await request('/api/auth/send-verify-code', {
        method: 'POST',
        data: { email, type },
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
        setCurrentUser(response.data.user);
      } else {
        // token无效，清除登录状态
        localStorage.removeItem('token');
        localStorage.removeItem('refreshToken');
        setCurrentUser(null);
      }
    } catch (error) {
      // 请求失败，清除登录状态
      localStorage.removeItem('token');
      localStorage.removeItem('refreshToken');
      setCurrentUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  // 刷新token
  const refreshToken = useCallback(async () => {
    const refreshTokenValue = localStorage.getItem('refreshToken');
    if (!refreshTokenValue) {
      throw new Error('No refresh token');
    }

    try {
      const response = await request('/api/auth/refresh', {
        method: 'POST',
        data: { refreshToken: refreshTokenValue },
      });

      if (response.success) {
        const { token, refreshToken: newRefreshToken } = response.data;
        localStorage.setItem('token', token);
        localStorage.setItem('refreshToken', newRefreshToken);
        return token;
      } else {
        throw new Error(response.message || 'Refresh token failed');
      }
    } catch (error) {
      // 刷新token失败，退出登录
      logout();
      throw error;
    }
  }, [logout]);

  // 修改密码
  const changePassword = useCallback(
    async (oldPassword: string, newPassword: string) => {
      try {
        const response = await request('/api/auth/change-password', {
          method: 'POST',
          data: { oldPassword, newPassword },
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
    },
    []
  );

  return {
    currentUser,
    loading,
    loginLoading,
    login,
    register,
    sendVerifyCode,
    logout,
    checkAuth,
    refreshToken,
    changePassword,
  };
}
