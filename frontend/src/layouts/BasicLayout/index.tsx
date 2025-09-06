import {
  BellOutlined,
  DashboardOutlined,
  HomeOutlined,
  LogoutOutlined,
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  Avatar,
  Badge,
  Breadcrumb,
  Button,
  Drawer,
  Dropdown,
  Layout,
  Menu,
  Space,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.less';
// 修复UMI 4.x导入方式
import { Outlet, useLocation, useModel, useNavigate } from 'umi';
// 使用React Router的Hook
// import { Outlet, useLocation, useNavigate } from 'react-router-dom';
// // 使用模拟实现
// const Outlet = () => <div>内容区域</div>;
// const useLocation = () => ({ pathname: '/dashboard', search: '', hash: '', state: null });
// const useNavigate = () => (path: string) => { window.location.href = path; };
// // 使用模拟的useModel
// // 使用模拟的useModel
// const useModel = (namespace: string) => {
//   // 模拟返回不同namespace的数据结构
//   switch (namespace) {
//     case 'auth':
//       return {
//         currentUser: {
//           id: '1',
//           username: 'admin',
//           email: 'admin@example.com',
//           avatar: undefined, // 添加avatar属性
//           roles: []
//         },
//         logout: () => {
//           console.log('logout called');
//         }
//       };
//     case 'permission':
//       return {
//         hasPermission: (permission: string) => true
//       };
//     default:
//       return {};
//   }
// };

const { Header, Sider, Content } = Layout;
const { Text } = Typography;

interface MenuItem {
  key: string;
  icon: React.ReactNode;
  label: string;
  path?: string;
  children?: MenuItem[];
  permission?: string;
}

const BasicLayout: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileDrawerVisible, setMobileDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const { currentUser, logout } = useModel('auth');
  const { hasPermission } = useModel('permission');

  // 检测移动端
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 菜单配置
  const menuItems: MenuItem[] = [
    {
      key: '/dashboard',
      icon: <DashboardOutlined />,
      label: '仪表盘',
      path: '/dashboard',
    },
    {
      key: '/system',
      icon: <SettingOutlined />,
      label: '系统管理',
      permission: 'system:view',
      children: [
        {
          key: '/system/users',
          icon: <UserOutlined />,
          label: '用户管理',
          path: '/system/users',
          permission: 'system:user:view',
        },
        {
          key: '/system/roles',
          icon: <TeamOutlined />,
          label: '角色管理',
          path: '/system/roles',
          permission: 'system:role:view',
        },
        {
          key: '/system/permissions',
          icon: <SafetyCertificateOutlined />,
          label: '权限管理',
          path: '/system/permissions',
          permission: 'system:permission:view',
        },
      ],
    },
  ];

  // 过滤有权限的菜单
  const filterMenuByPermission = (items: MenuItem[]): MenuItem[] => {
    return items.filter(item => {
      if (item.permission && !hasPermission?.(item.permission)) {
        return false;
      }
      if (item.children) {
        item.children = filterMenuByPermission(item.children);
        return item.children.length > 0;
      }
      return true;
    });
  };

  const filteredMenuItems = filterMenuByPermission(menuItems);

  // 转换为Antd菜单格式
  const convertToAntdMenuItems = (items: MenuItem[]): any => {
    return items.map(item => ({
      key: item.key,
      icon: item.icon,
      label: item.label,
      children: item.children ? convertToAntdMenuItems(item.children) : undefined,
    }));
  };

  // 获取当前选中的菜单
  const getSelectedKeys = () => {
    const { pathname } = location;
    return [pathname];
  };

  // 获取当前展开的菜单
  const getOpenKeys = () => {
    const { pathname } = location;
    const keys: string[] = [];

    // 查找父级菜单
    const findParentKeys = (items: MenuItem[], targetPath: string): string[] => {
      for (const item of items) {
        if (item.children) {
          if (item.children.some(child => child.path === targetPath)) {
            keys.push(item.key);
          }
          findParentKeys(item.children, targetPath);
        }
      }
      return keys;
    };

    return findParentKeys(filteredMenuItems, pathname);
  };

  // 菜单点击处理
  const handleMenuClick = ({ key }: { key: string }) => {
    // 查找菜单项
    const findMenuItem = (items: MenuItem[], targetKey: string): MenuItem | null => {
      for (const item of items) {
        if (item.key === targetKey) {
          return item;
        }
        if (item.children) {
          const found = findMenuItem(item.children, targetKey);
          if (found) return found;
        }
      }
      return null;
    };

    const menuItem = findMenuItem(filteredMenuItems, key);
    if (menuItem?.path) {
      navigate(menuItem.path);
      if (isMobile) {
        setMobileDrawerVisible(false);
      }
    }
  };

  // 用户菜单
  const userMenuItems = [
    {
      key: 'profile',
      icon: <UserOutlined />,
      label: '个人中心',
    },
    {
      key: 'settings',
      icon: <SettingOutlined />,
      label: '账户设置',
    },
    {
      type: 'divider',
    },
    {
      key: 'logout',
      icon: <LogoutOutlined />,
      label: '退出登录',
    },
  ];

  // 用户菜单点击处理
  const handleUserMenuClick = ({ key }: { key: string }) => {
    switch (key) {
      case 'profile':
        navigate('/profile');
        break;
      case 'settings':
        navigate('/settings');
        break;
      case 'logout':
        logout?.();
        break;
    }
  };

  // 面包屑
  const getBreadcrumbItems = () => {
    const { pathname } = location;
    const pathSegments = pathname.split('/').filter(Boolean);

    const items = [
      {
        title: (
          <span>
            <HomeOutlined />
            <span className={styles.breadcrumbIcon}>首页</span>
          </span>
        ),
      },
    ];

    // 根据路径生成面包屑
    let currentPath = '';
    pathSegments.forEach((segment: string, index: number) => {
      currentPath += `/${segment}`;

      // 查找对应的菜单项
      const findMenuByPath = (items: MenuItem[], path: string): MenuItem | null => {
        for (const item of items) {
          if (item.path === path) {
            return item;
          }
          if (item.children) {
            const found = findMenuByPath(item.children, path);
            if (found) return found;
          }
        }
        return null;
      };

      const menuItem = findMenuByPath(menuItems, currentPath);
      if (menuItem) {
        items.push({
          title: (
            <span>
              {menuItem.icon}
              <span className={styles.breadcrumbIcon}>{menuItem.label}</span>
            </span>
          ),
        });
      }
    });

    return items;
  };

  // 侧边栏内容
  const siderContent = (
    <>
      <div className={styles.logo}>
        <img src="/logo.png" alt="Logo" />
        {!collapsed && <span>UG管理系统</span>}
      </div>
      <Menu
        theme="dark"
        mode="inline"
        selectedKeys={getSelectedKeys()}
        openKeys={collapsed ? [] : getOpenKeys()}
        items={convertToAntdMenuItems(filteredMenuItems)}
        onClick={handleMenuClick}
      />
    </>
  );

  return (
    <Layout className={styles.layout}>
      {/* 桌面端侧边栏 */}
      {!isMobile && (
        <Sider
          trigger={null}
          collapsible
          collapsed={collapsed}
          className={styles.sider}
        >
          {siderContent}
        </Sider>
      )}

      {/* 移动端抽屉 */}
      {isMobile && (
        <Drawer
          title="导航菜单"
          placement="left"
          onClose={() => setMobileDrawerVisible(false)}
          open={mobileDrawerVisible}
          bodyStyle={{ padding: 0 }}
          className={styles.mobileDrawer}
        >
          {siderContent}
        </Drawer>
      )}

      <Layout>
        {/* 头部 */}
        <Header className={styles.header}>
          <div className={styles.headerLeft}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => {
                if (isMobile) {
                  setMobileDrawerVisible(true);
                } else {
                  setCollapsed(!collapsed);
                }
              }}
              className={styles.trigger}
            />
          </div>

          <div className={styles.headerRight}>
            <Space size="middle">
              {/* 通知 */}
              <Badge count={3} size="small">
                <Button
                  type="text"
                  icon={<BellOutlined />}
                  className={styles.actionButton}
                />
              </Badge>

              {/* 用户信息 */}
              <Dropdown
                menu={{
                  items: userMenuItems,
                  onClick: handleUserMenuClick,
                }}
                placement="bottomRight"
              >
                <div className={styles.userInfo}>
                  <Avatar
                    size="small"
                    icon={<UserOutlined />}
                    src={currentUser?.avatar || '/default-avatar.png'}
                  />
                  <Text className={styles.username}>
                    {currentUser?.username || '用户'}
                  </Text>
                </div>
              </Dropdown>
            </Space>
          </div>
        </Header>

        {/* 面包屑 */}
        <div className={styles.breadcrumbWrapper}>
          <Breadcrumb items={getBreadcrumbItems()} />
        </div>

        {/* 内容区域 */}
        <Content className={styles.content}>
          <Outlet />
        </Content>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;