import { Spin } from 'antd';
import { useEffect } from 'react';
import styles from './AuthWrapper.module.less';
// 直接导入模型而不是使用useModel hook
import useAuthModel from '@/models/auth';
import { Outlet, useLocation, useNavigate } from 'umi';

const AuthWrapper = () =>
{
  const navigate = useNavigate();
  const location = useLocation();

  // 直接使用模型而不是通过useModel hook
  const authModel = useAuthModel();
  const { currentUser, loading, checkAuth } = authModel;

  useEffect( () =>
  {
    checkAuth?.();
  }, [] );

  useEffect( () =>
  {
    if ( !loading && !currentUser )
    {
      // 保存当前路径，登录后跳转回来
      const redirectPath = location.pathname + location.search;
      navigate( `/auth/login?redirect=${ encodeURIComponent( redirectPath ) }` );
    }
  }, [ currentUser, loading, navigate, location ] );

  if ( loading )
  {
    return (
      <div className={ styles.loadingContainer }>
        <Spin size="large" />
      </div>
    );
  }

  if ( !currentUser )
  {
    return null;
  }

  return <Outlet />;
};

export default AuthWrapper;