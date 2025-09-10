import React, { useEffect } from 'react';
import { useModel, useNavigate, useLocation } from 'umi';
import { Spin } from 'antd';

interface CurrentUser {
  name?: string;
  // 可以根据实际用户模型添加更多字段
}

interface InitialState {
  currentUser?: CurrentUser;
}

interface AuthWrapperProps {
  children: React.ReactNode;
}

const AuthWrapper: React.FC<AuthWrapperProps> = ({ children }) => {
  const { initialState, loading } = useModel('@@initialState') as {
    initialState: InitialState;
    loading: boolean;
  };
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 检查用户认证状态
    if (!initialState?.currentUser && !loading) {
      // 未登录则跳转到登录页
      navigate('/auth/login', {
        state: {
          redirect: location.pathname,
        },
      });
    }
  }, [initialState, loading]);

  if (loading) {
    return (
      <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />
    );
  }

  return <>{children}</>;
};

export default AuthWrapper;
