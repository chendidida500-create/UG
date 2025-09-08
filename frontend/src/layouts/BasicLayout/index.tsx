import { useModel } from '@/utils/umiMock';
import {
  FileOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  PieChartOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Button, Layout, Menu, MenuProps, theme } from 'antd';
import { useEffect, useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './index.module.less';

const { Header, Sider, Content } = Layout;

type MenuItem = Required<MenuProps>['items'][number];

function getItem(
  label: React.ReactNode,
  key: React.Key,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group'
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem('仪表盘', '/', <PieChartOutlined />),
  getItem('系统管理', '/system', <SettingOutlined />, [
    getItem('用户管理', '/system/user', <UserOutlined />),
    getItem('角色管理', '/system/role', <TeamOutlined />),
    getItem('权限管理', '/system/permission', <FileOutlined />),
  ]),
];

const BasicLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const location = useLocation();
  const navigate = useNavigate();

  const authModel = useModel('auth');
  const { currentUser, logout } = authModel;

  const handleLogout = () => {
    logout?.();
    navigate('/auth/login');
  };

  // 设置默认展开的菜单项
  const getDefaultOpenKeys = () => {
    const path = location.pathname;
    if (path.startsWith('/system')) {
      return ['/system'];
    }
    return [];
  };

  const [openKeys, setOpenKeys] = useState<string[]>(getDefaultOpenKeys());

  // 监听路由变化，更新展开的菜单项
  useEffect(() => {
    setOpenKeys(getDefaultOpenKeys());
  }, [location.pathname]);

  return (
    <Layout className={styles.layout}>
      <Sider
        trigger={null}
        collapsible
        collapsed={collapsed}
        className={styles.sider}
      >
        <div className={styles.logo}>
          <img src="/logo.png" alt="Logo" />
          {!collapsed && <h1>UG管理系统</h1>}
        </div>
        <Menu
          theme="dark"
          mode="inline"
          selectedKeys={[location.pathname]}
          openKeys={openKeys}
          onOpenChange={setOpenKeys}
          items={items}
          onClick={({ key }) => navigate(key)}
        />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
          <div className={styles.userMenu}>
            <span>欢迎，{currentUser?.username}</span>
            <Button type="link" onClick={handleLogout}>
              退出登录
            </Button>
          </div>
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
