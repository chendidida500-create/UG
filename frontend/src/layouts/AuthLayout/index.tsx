import React from 'react';
import styles from './index.module.less';
// 修复UMI 4.x导入方式
import { Outlet } from 'umi';
// 使用React Router的Outlet
// import { Outlet } from 'react-router-dom';
// // 使用简单的div作为Outlet的替代
// const Outlet = () => <div>内容区域</div>;

const AuthLayout: React.FC = () => {
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <Outlet />
      </div>
      <div className={styles.footer}>
        <p>UG管理系统 &copy; 2025</p>
      </div>
    </div>
  );
};

export default AuthLayout;
