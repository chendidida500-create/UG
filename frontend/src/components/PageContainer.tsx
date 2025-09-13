import React from 'react';
import { Helmet } from 'umi';
import { Layout, Card } from 'antd';
import styles from './PageContainer.module.css';

const { Content } = Layout;

interface PageContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

const PageContainer: React.FC<PageContainerProps> = ({
  title,
  children,
  className = '',
}) => {
  return (
    <Layout className={`${styles.container} ${className}`}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      <Content className={styles.content}>
        <Card className={styles.card}>{children}</Card>
      </Content>
    </Layout>
  );
};

export default PageContainer;
