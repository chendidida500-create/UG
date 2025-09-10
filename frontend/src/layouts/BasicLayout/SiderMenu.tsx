import React from 'react';
import { Menu } from 'antd';
import type { MenuProps } from 'antd';
import { useLocation, useNavigate } from 'umi';
import { useModel } from 'umi';
import styles from './styles.less';

type MenuItem = Required<MenuProps>['items'][number];

// 菜单项定义
const menuItems: MenuItem[] = [
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
  currentUser?: {
    name?: string;
  };
}

const SiderMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 注意：这里暂时不使用_initialState，但在实际应用中可能需要
  const { initialState: _initialState } = useModel('@@initialState') as {
    initialState: InitialState;
  };

  // 根据权限过滤菜单项
  const filterMenuItems = (items: MenuItem[]): MenuItem[] => {
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
