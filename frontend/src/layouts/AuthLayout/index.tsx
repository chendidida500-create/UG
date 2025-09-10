import React from 'react';
import { Layout, Card } from 'antd';
import styles from './styles.less';

const { Content } = Layout;

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src="/logo.png" alt="系统Logo" />
            <h1>UG管理系统</h1>
          </div>
          <Card className={styles.card}>{children}</Card>
        </div>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
