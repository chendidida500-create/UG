import React, { useEffect } from 'react';
import { useModel, useNavigate, useLocation } from 'umi';
import { Spin } from 'antd';
import type { InitialState } from '@/models/initialState';
import styles from './AuthWrapper.module.css';

// 定义useModel返回值的类型
interface InitialStateModel {
  initialState?: InitialState;
  loading?: boolean;
  error?: Error;
}

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const model = useModel('@@initialState') as InitialStateModel | undefined;
  const { initialState, loading, error } = model || {};
  const navigate = useNavigate();
  const location = useLocation();

  // 确保initialState不为undefined
  const safeInitialState = initialState;
  const isLoading = loading !== undefined ? loading : false; // 默认为false而不是true

  useEffect(() => {
    // 检查用户认证状态
    if (safeInitialState && !safeInitialState.currentUser && !isLoading) {
      // 未登录则跳转到登录页
      navigate('/auth/login', {
        state: {
          redirect: location.pathname,
        },
      });
    }
  }, [safeInitialState, isLoading, navigate, location.pathname]);

  // 处理模型加载错误
  if (error) {
    console.error('Initial state model error:', error);
    return (
      <div className={styles.errorContainer}>
        <p>加载用户信息失败</p>
      </div>
    );
  }

  // 如果正在加载，显示加载指示器
  if (isLoading) {
    return <Spin size="large" className={styles.loadingSpinner} />;
  }

  // 如果initialState为undefined，也显示加载状态
  if (!safeInitialState) {
    return <Spin size="large" className={styles.loadingSpinner} />;
  }

  // 如果没有当前用户信息，跳转到登录页面
  if (!safeInitialState.currentUser) {
    navigate('/auth/login', {
      state: {
        redirect: location.pathname,
      },
    });
    return <Spin size="large" className={styles.loadingSpinner} />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
