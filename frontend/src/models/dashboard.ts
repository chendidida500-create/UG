import { message } from 'antd';
import { useCallback, useState } from 'react';
// 修复UMI 4.x导入方式
import { typedRequest as request } from '@/utils/request';

// 定义通用API响应格式
interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface DashboardStats {
  users: {
    total: number;
    active: number;
    growth: number;
  };
  roles: {
    total: number;
    growth: number;
  };
  permissions: {
    total: number;
    growth: number;
  };
  logins: {
    today: number;
    growth: number;
  };
}

interface ActivityLog {
  id: string;
  user: string;
  action: string;
  target: string;
  time: string;
  status: 'success' | 'warning' | 'error';
}

interface SystemHealth {
  cpu: number;
  memory: number;
  disk: number;
  network: number;
}

interface ChartData {
  userTrend: Array<{
    date: string;
    count: number;
  }>;
  activityDistribution: Array<{
    name: string;
    value: number;
  }>;
}

// 定义DashboardModelState类型，包含仪表盘统计数据和相关操作
export interface DashboardModelState {
  stats: DashboardStats;
  activities: ActivityLog[];
  systemHealth: SystemHealth;
  chartData: ChartData;
  loading: boolean;
  getDashboardStats: (timeRange?: string) => Promise<any>;
  getRecentActivities: (limit?: number) => Promise<any>;
  getSystemHealth: () => Promise<any>;
  getChartData: (type: string, timeRange?: string) => Promise<any>;
  getUserTrend: (timeRange?: string) => Promise<any>;
  getActivityDistribution: (timeRange?: string) => Promise<any>;
  refreshAllData: (timeRange?: string) => Promise<void>;
  getSystemInfo: () => Promise<any>;
  getOnlineUsers: () => Promise<any>;
  exportReport: (type: string, timeRange?: string) => Promise<boolean>;
}

export default function useDashboardModel(): DashboardModelState {
  const [stats, setStats] = useState<DashboardStats>({
    users: { total: 0, active: 0, growth: 0 },
    roles: { total: 0, growth: 0 },
    permissions: { total: 0, growth: 0 },
    logins: { today: 0, growth: 0 },
  });
  const [activities, setActivities] = useState<ActivityLog[]>([]);
  const [systemHealth, setSystemHealth] = useState<SystemHealth>({
    cpu: 0,
    memory: 0,
    disk: 0,
    network: 0,
  });
  const [chartData, setChartData] = useState<ChartData>({
    userTrend: [],
    activityDistribution: [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  // 获取仪表盘统计数据
  const getDashboardStats = useCallback(async (timeRange?: string) => {
    try {
      const response = await request<ApiResponse<DashboardStats>>(
        '/api/dashboard/stats',
        {
          method: 'GET',
          params: { timeRange },
        }
      );

      if (response.success) {
        setStats(response.data);
        return response.data;
      } else {
        throw new Error(response.message || '获取统计数据失败');
      }
    } catch (error: any) {
      console.error('获取仪表盘统计数据失败:', error);
      // 使用模拟数据
      const mockStats: DashboardStats = {
        users: { total: 1256, active: 1089, growth: 12.5 },
        roles: { total: 8, growth: 0 },
        permissions: { total: 45, growth: 2.3 },
        logins: { today: 234, growth: 8.7 },
      };
      setStats(mockStats);
      return mockStats;
    }
  }, []);

  // 获取最近活动
  const getRecentActivities = useCallback(async (limit?: number) => {
    try {
      const response = await request<ApiResponse<ActivityLog[]>>(
        '/api/dashboard/activities',
        {
          method: 'GET',
          params: { limit: limit || 10 },
        }
      );

      if (response.success) {
        setActivities(response.data);
        return response.data;
      } else {
        throw new Error(response.message || '获取活动日志失败');
      }
    } catch (error: any) {
      console.error('获取最近活动失败:', error);
      // 使用模拟数据
      const mockActivities: ActivityLog[] = [
        {
          id: '1',
          user: 'admin',
          action: '创建用户',
          target: 'user_001',
          time: new Date().toISOString(),
          status: 'success',
        },
        {
          id: '2',
          user: 'admin',
          action: '更新权限',
          target: 'role_admin',
          time: new Date(Date.now() - 300000).toISOString(),
          status: 'success',
        },
        {
          id: '3',
          user: 'user1',
          action: '登录系统',
          target: 'login',
          time: new Date(Date.now() - 600000).toISOString(),
          status: 'success',
        },
        {
          id: '4',
          user: 'user2',
          action: '修改密码',
          target: 'password',
          time: new Date(Date.now() - 900000).toISOString(),
          status: 'warning',
        },
        {
          id: '5',
          user: 'user3',
          action: '删除文件',
          target: 'file.txt',
          time: new Date(Date.now() - 1200000).toISOString(),
          status: 'error',
        },
      ];
      setActivities(mockActivities);
      return mockActivities;
    }
  }, []);

  // 获取系统健康状态
  const getSystemHealth = useCallback(async () => {
    try {
      const response = await request<ApiResponse<SystemHealth>>(
        '/api/dashboard/health',
        {
          method: 'GET',
        }
      );

      if (response.success) {
        setSystemHealth(response.data);
        return response.data;
      } else {
        throw new Error(response.message || '获取系统健康状态失败');
      }
    } catch (error: any) {
      console.error('获取系统健康状态失败:', error);
      // 使用模拟数据
      const mockHealth: SystemHealth = {
        cpu: Math.floor(Math.random() * 30) + 40, // 40-70%
        memory: Math.floor(Math.random() * 20) + 60, // 60-80%
        disk: Math.floor(Math.random() * 15) + 45, // 45-60%
        network: Math.floor(Math.random() * 10) + 85, // 85-95%
      };
      setSystemHealth(mockHealth);
      return mockHealth;
    }
  }, []);

  // 获取图表数据
  const getChartData = useCallback(async (type: string, timeRange?: string) => {
    try {
      const response = await request<ApiResponse<any>>(
        '/api/dashboard/charts',
        {
          method: 'GET',
          params: { type, timeRange },
        }
      );

      if (response.success) {
        setChartData(prev => ({ ...prev, [type]: response.data }));
        return response.data;
      } else {
        throw new Error(response.message || '获取图表数据失败');
      }
    } catch (error: any) {
      console.error('获取图表数据失败:', error);
      // 使用模拟数据
      if (type === 'userTrend') {
        // 使用显式的循环来避免类型推断问题
        const mockData: Array<{ date: string; count: number }> = [];
        for (let i = 0; i < 7; i++) {
          const dateValue = new Date(
            Date.now() - (6 - i) * 24 * 60 * 60 * 1000
          );
          const dateStr = dateValue.toISOString().split('T')[0];
          // 确保dateStr不为undefined
          if (dateStr) {
            mockData.push({
              date: dateStr,
              count: Math.floor(Math.random() * 100) + 50,
            });
          }
        }
        setChartData(prev => ({ ...prev, userTrend: mockData }));
        return mockData;
      } else if (type === 'activityDistribution') {
        const mockData: Array<{ name: string; value: number }> = [
          { name: '用户管理', value: 35 },
          { name: '角色管理', value: 25 },
          { name: '权限设置', value: 20 },
          { name: '系统配置', value: 20 },
        ];
        setChartData(prev => ({ ...prev, activityDistribution: mockData }));
        return mockData;
      }
    }
  }, []);

  // 获取用户增长趋势
  const getUserTrend = useCallback(
    async (timeRange?: string) => {
      return getChartData('userTrend', timeRange);
    },
    [getChartData]
  );

  // 获取活动分布
  const getActivityDistribution = useCallback(
    async (timeRange?: string) => {
      return getChartData('activityDistribution', timeRange);
    },
    [getChartData]
  );

  // 刷新所有数据
  const refreshAllData = useCallback(
    async (timeRange?: string) => {
      setLoading(true);
      try {
        await Promise.all([
          getDashboardStats(timeRange),
          getRecentActivities(),
          getSystemHealth(),
          getUserTrend(timeRange),
          getActivityDistribution(timeRange),
        ]);
      } catch (error) {
        console.error('刷新数据失败:', error);
      } finally {
        setLoading(false);
      }
    },
    [
      getDashboardStats,
      getRecentActivities,
      getSystemHealth,
      getUserTrend,
      getActivityDistribution,
    ]
  );

  // 获取系统信息
  const getSystemInfo = useCallback(async () => {
    try {
      const response = await request<
        ApiResponse<{
          version: string;
          environment: string;
          uptime: string;
          nodeVersion: string;
          platform: string;
        }>
      >('/api/dashboard/system-info', {
        method: 'GET',
      });

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || '获取系统信息失败');
      }
    } catch (error: any) {
      console.error('获取系统信息失败:', error);
      // 返回模拟数据
      return {
        version: '1.0.0',
        environment: 'development',
        uptime: '2小时30分钟',
        nodeVersion: 'v16.14.0',
        platform: 'win32',
      };
    }
  }, []);

  // 获取在线用户
  const getOnlineUsers = useCallback(async (): Promise<any[]> => {
    try {
      const response = await request<ApiResponse<any[]>>(
        '/api/dashboard/online-users',
        {
          method: 'GET',
        }
      );

      if (response.success) {
        return response.data;
      } else {
        throw new Error(response.message || '获取在线用户失败');
      }
    } catch (error: any) {
      console.error('获取在线用户失败:', error);
      return [];
    }
  }, []);

  // 导出报表
  const exportReport = useCallback(async (type: string, timeRange?: string) => {
    try {
      const response = await request<ApiResponse<Blob>>(
        '/api/dashboard/export',
        {
          method: 'GET',
          params: { type, timeRange },
          responseType: 'blob',
        }
      );

      // 创建下载链接
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute(
        'download',
        `${type}_报表_${new Date().toLocaleDateString()}.xlsx`
      );
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      message.success('报表导出成功');
      return true;
    } catch (error: any) {
      message.error(error.message || '导出失败');
      throw error;
    }
  }, []);

  return {
    stats,
    activities,
    systemHealth,
    chartData,
    loading,
    getDashboardStats,
    getRecentActivities,
    getSystemHealth,
    getChartData,
    getUserTrend,
    getActivityDistribution,
    refreshAllData,
    getSystemInfo,
    getOnlineUsers,
    exportReport,
  };
}
