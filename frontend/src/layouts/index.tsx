import React from 'react';
import { Outlet } from 'umi';
import PageLayout from '@/components/PageLayout';
import styles from './index.module.css';

const Layout: React.FC = () => {
  return (
    <PageLayout>
      <div className={styles.container}>
        <Outlet />
      </div>
    </PageLayout>
  );
};

export default Layout;
