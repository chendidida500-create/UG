import React from 'react';
import { Space, Avatar, Dropdown, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import styles from './styles.less';

interface HeaderContentProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

interface InitialState {
  currentUser?: {
    name?: string;
  };
}

const HeaderContent: React.FC<HeaderContentProps> = ({ collapsed, setCollapsed }) => {
  const { initialState, setInitialState } = useModel('@@initialState') as { initialState: InitialState; setInitialState: any };

  const handleLogout = async () => {
    // 实现退出登录逻辑
    await setInitialState({ ...initialState, currentUser: undefined });
  };

  const menu = (
    <Menu
      items={[
        {
          key: 'logout',
          label: '退出登录',
          onClick: handleLogout,
        },
      ]}
    />
  );

  return (
    <div className={styles.headerContent}>
      <div className={styles.trigger}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: styles.triggerIcon,
          onClick: () => setCollapsed(!collapsed),
        })}
      </div>
      <div className={styles.rightContent}>
        <Space>
          <Dropdown menu={{ items: menu.props.items }}>
            <Space className={styles.action}>
              <Avatar icon={<UserOutlined />} />
              <span>{initialState?.currentUser?.name}</span>
            </Space>
          </Dropdown>
        </Space>
      </div>
    </div>
  );
};

export default HeaderContent;