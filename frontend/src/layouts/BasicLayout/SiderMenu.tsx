import React from 'react';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'umi';
import { useModel } from 'umi';
import styles from './styles.less';

// 菜单项定义
const menuItems = [
  {
    key: '/dashboard',
    label: '仪表盘',
  },
  {
    key: '/system',
    label: '系统管理',
    children: [
      {
        key: '/system/users',
        label: '用户管理',
      },
      {
        key: '/system/roles',
        label: '角色管理',
      },
      {
        key: '/system/permissions',
        label: '权限管理',
      },
    ],
  },
];

interface InitialState {
  currentUser?: any;
}

const SiderMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { initialState } = useModel('@@initialState') as { initialState: InitialState };

  // 根据权限过滤菜单项
  const filterMenuItems = (items: any[]) => {
    // 实现权限过滤逻辑
    return items;
  };

  const filteredMenuItems = filterMenuItems(menuItems);

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={({ key }) => navigate(key)}
      items={filteredMenuItems}
      className={styles.menu}
    />
  );
};

export default SiderMenu;