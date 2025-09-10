import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import HeaderContent from './HeaderContent.tsx';
import SiderMenu from './SiderMenu.tsx';
import styles from './styles.less';

const { Header, Sider, Content, Footer } = Layout;

interface BasicLayoutProps {
  children: React.ReactNode;
}

const BasicLayout: React.FC<BasicLayoutProps> = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className={styles.layout}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className={styles.sider}
      >
        <div className={styles.logo} />
        <SiderMenu />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <HeaderContent collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>
        <Content
          className={styles.content}
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className={styles.contentInner}>{children}</div>
        </Content>
        <Footer className={styles.footer}>
          UG管理系统 ©2025 Created by UG Team
        </Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;