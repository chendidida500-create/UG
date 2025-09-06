import { Spin } from 'antd';
import React, { useEffect } from 'react';
import styles from './AuthWrapper.module.less';
// 修复UMI 4.x导入方式
// import { Outlet, useLocation, useModel, useNavigate } from 'umi';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useModel } from '../utils/umiMock';

const AuthWrapper: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, loading, checkAuth } = useModel('auth');

  useEffect(() => {
    checkAuth?.();
  }, []);

  useEffect(() => {
    if (!loading && !currentUser) {
      // 保存当前路径，登录后跳转回来
      const redirectPath = location.pathname + location.search;
      navigate(`/auth/login?redirect=${encodeURIComponent(redirectPath)}`);
    }
  }, [currentUser, loading, navigate, location]);

  if (loading) {
    return (
      <div className={styles.loadingContainer}>
        <Spin size="large" />
      </div>
    );
  }

  if (!currentUser) {
    return null;
  }

  return <Outlet />;
};

export default AuthWrapper;