import { Layout } from 'antd';
import styles from './index.module.less';

const { Header, Content } = Layout;

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  // 使用默认的背景色而不是从主题中获取
  const colorBgContainer = '#ffffff';

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <img src="/assets/logo.png" alt="Logo" />
          <h1>UG管理系统</h1>
        </div>
      </Header>
      <Content
        className={styles.content}
        style={{ background: colorBgContainer }}
      >
        <div className={styles.container}>{children}</div>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
