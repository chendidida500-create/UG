import { useState, useEffect } from 'react';

export interface CurrentUser {
  name?: string;
  avatar?: string;
  userid?: string;
  email?: string;
  signature?: string;
  title?: string;
  group?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  notifyCount?: number;
  unreadCount?: number;
  country?: string;
  access?: string;
  geographic?: {
    province: {
      label: string;
      key: string;
    };
    city: {
      label: string;
      key: string;
    };
  };
  address?: string;
  phone?: string;
}

export interface InitialState {
  currentUser?: CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<CurrentUser | undefined>;
}

const useInitialState = (): InitialState => {
  const [currentUser, setCurrentUser] = useState<CurrentUser | undefined>(
    undefined
  );
  const [loading, setLoading] = useState<boolean>(false); // 默认为false

  const fetchUserInfo = async (): Promise<CurrentUser | undefined> => {
    try {
      setLoading(true); // 开始加载时设置为true

      // 这里应该调用实际的API获取用户信息
      // 暂时返回模拟数据
      const mockUser: CurrentUser = {
        name: '测试用户',
        avatar:
          'https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png',
        userid: '00000001',
        email: 'test@example.com',
        signature: '海纳百川，有容乃大',
        title: '交互专家',
        group: '蚂蚁金服－某某某事业群－某某平台部－某某技术部－UED',
        tags: [
          { key: '0', label: '很有想法的' },
          { key: '1', label: '专注设计' },
          { key: '2', label: '辣~' },
          { key: '3', label: '大长腿' },
          { key: '4', label: '川妹子' },
          { key: '5', label: '海纳百川' },
        ],
        notifyCount: 12,
        unreadCount: 11,
        country: 'China',
        access: 'admin',
        geographic: {
          province: {
            label: '浙江省',
            key: '330000',
          },
          city: {
            label: '杭州市',
            key: '330100',
          },
        },
        address: '西湖区工专路 77 号',
        phone: '0752-268888888',
      };

      setCurrentUser(mockUser);
      return mockUser;
    } catch (error) {
      console.error('获取用户信息失败:', error);
      return undefined;
    } finally {
      setLoading(false); // 完成后设置为false
    }
  };

  useEffect(() => {
    // 组件挂载时获取用户信息
    fetchUserInfo();
  }, []);

  return {
    currentUser,
    loading,
    fetchUserInfo,
  };
};

export default useInitialState;
