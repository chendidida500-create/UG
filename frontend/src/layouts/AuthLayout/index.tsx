import logo from '@/assets/logo.png';
import { Layout, theme } from 'antd';
import styles from './index.module.less';

const { Header, Content } = Layout;

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <img src={logo} alt="Logo" />
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