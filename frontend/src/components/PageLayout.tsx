import React from 'react';
import { Layout, Menu, Typography } from 'antd';
import {
  DashboardOutlined,
  FileOutlined,
  UserOutlined,
  TeamOutlined,
  SafetyCertificateOutlined,
  MonitorOutlined,
  BarChartOutlined,
  SettingOutlined,
  BookOutlined,
  NotificationOutlined,
} from '@ant-design/icons';
import { useNavigate, useLocation } from 'umi';
import styles from './PageLayout.module.css';

const { Header, Sider, Content } = Layout;

interface PageLayoutProps {
  children: React.ReactNode;
}

const PageLayout: React.FC<PageLayoutProps> = ({ 
  children 
}: PageLayoutProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
    },
    {
      key: '/tasks',
      icon: <FileOutlined />,
      label: '任务管理',
    },
    {
      key: '/users',
      icon: <UserOutlined />,
      label: '用户管理',
    },
    {
      key: '/roles',
      icon: <TeamOutlined />,
      label: '角色管理',
    },
    {
      key: '/permissions',
      icon: <SafetyCertificateOutlined />,
      label: '权限管理',
    },
    {
      key: '/monitor',
      icon: <MonitorOutlined />,
      label: '系统监控',
    },
    {
      key: '/reports',
      icon: <BarChartOutlined />,
      label: '报表管理',
    },
    {
      key: '/config',
      icon: <SettingOutlined />,
      label: '系统配置',
    },
    {
      key: '/dict',
      icon: <BookOutlined />,
      label: '字典管理',
    },
    {
      key: '/notice',
      icon: <NotificationOutlined />,
      label: '通知公告',
    },
    {
      key: '/settings',
      icon: <SettingOutlined />,
      label: '系统设置',
    },
  ];

  const handleMenuClick = ({ key }: { key: string }) => {
    navigate(key);
  };

  return (
    <Layout className={styles.layout}>
      <Header className={styles.header}>
        <div className={styles.logo}>
          <Typography.Title level={3} style={{ color: 'white', margin: 0 }}>
            UG管理系统
          </Typography.Title>
        </div>
      </Header>
      <Layout>
        <Sider width={200} className={styles.sider}>
          <Menu
            mode="inline"
            selectedKeys={[location.pathname]}
            items={menuItems}
            onClick={handleMenuClick}
          />
        </Sider>
        <Layout className={styles.contentLayout}>
          <Content className={styles.content}>{children}</Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PageLayout;