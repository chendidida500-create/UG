import {
  CaretDownOutlined,
  CaretUpOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  ExclamationCircleOutlined,
  SafetyCertificateOutlined,
  TeamOutlined,
  UnlockOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  Avatar,
  Button,
  Card,
  Col,
  DatePicker,
  Progress,
  Row,
  Select,
  Space,
  Spin,
  Statistic,
  Table,
  Tag,
  Typography
} from 'antd';
import * as echarts from 'echarts';
import React, { useEffect, useState } from 'react';
// 修复UMI 4.x导入方式
// import { useModel } from 'umi';
import { useModel } from '../../utils/umiMock';
import styles from './index.module.less';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

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

const Dashboard: React.FC = () => {
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
  const [loading, setLoading] = useState(false);
  const [chartPeriod, setChartPeriod] = useState('7d');

  const { currentUser } = useModel('auth');
  const dashboardModel = useModel('dashboard');
  const { getDashboardStats, getRecentActivities, getSystemHealth } = dashboardModel || {};

  // 加载仪表盘数据
  const loadDashboardData = async () => {
    setLoading(true);
    try {
      const [statsData, activitiesData, healthData] = await Promise.all([
        getDashboardStats?.(),
        getRecentActivities?.(),
        getSystemHealth?.(),
      ]);

      // 修复数据处理逻辑
      if (statsData && 'data' in statsData) {
        setStats(statsData.data as DashboardStats);
      } else if (statsData) {
        setStats(statsData as DashboardStats);
      }

      if (activitiesData && 'data' in activitiesData) {
        setActivities(activitiesData.data as ActivityLog[]);
      } else if (activitiesData) {
        setActivities(activitiesData as ActivityLog[]);
      }

      if (healthData && 'data' in healthData) {
        setSystemHealth(healthData.data as SystemHealth);
      } else if (healthData) {
        setSystemHealth(healthData as SystemHealth);
      }
    } catch (error: any) {
      console.error('加载仪表盘数据失败:', error);
    } finally {
      setLoading(false);
    }
  };

  // 初始化图表
  const initCharts = () => {
    // 用户增长趋势图
    const userTrendChart = echarts.init(document.getElementById('userTrendChart'));
    const userTrendOption = {
      title: {
        text: '用户增长趋势',
        textStyle: { fontSize: 16 }
      },
      tooltip: { trigger: 'axis' },
      xAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      yAxis: { type: 'value' },
      series: [{
        data: [120, 200, 150, 80, 70, 110, 130],
        type: 'line',
        smooth: true,
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: 'rgba(24, 144, 255, 0.3)' },
            { offset: 1, color: 'rgba(24, 144, 255, 0.1)' }
          ])
        }
      }]
    };
    userTrendChart.setOption(userTrendOption);

    // 活动分布图
    const activityChart = echarts.init(document.getElementById('activityChart'));
    const activityOption = {
      title: {
        text: '活动分布',
        textStyle: { fontSize: 16 }
      },
      tooltip: { trigger: 'item' },
      series: [{
        type: 'pie',
        radius: ['40%', '70%'],
        data: [
          { value: 35, name: '用户管理' },
          { value: 25, name: '角色管理' },
          { value: 20, name: '权限设置' },
          { value: 20, name: '系统配置' }
        ],
        emphasis: {
          itemStyle: {
            shadowBlur: 10,
            shadowOffsetX: 0,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        }
      }]
    };
    activityChart.setOption(activityOption);

    // 响应式处理
    const handleResize = () => {
      userTrendChart.resize();
      activityChart.resize();
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  };

  // 活动日志表格配置
  const activityColumns = [
    {
      title: '用户',
      dataIndex: 'user',
      key: 'user',
      width: 100,
      render: (user: string) => (
        <Space>
          <Avatar size="small" icon={<UserOutlined />} />
          <Text>{user}</Text>
        </Space>
      ),
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
      width: 120,
    },
    {
      title: '对象',
      dataIndex: 'target',
      key: 'target',
      width: 120,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 80,
      render: (status: string) => {
        const statusConfig = {
          success: { color: 'success', icon: <CheckCircleOutlined /> },
          warning: { color: 'warning', icon: <ExclamationCircleOutlined /> },
          error: { color: 'error', icon: <ClockCircleOutlined /> },
        };
        const config = statusConfig[status as keyof typeof statusConfig];
        return (
          <Tag color={config.color} icon={config.icon}>
            {status}
          </Tag>
        );
      },
    },
    {
      title: '时间',
      dataIndex: 'time',
      key: 'time',
      width: 120,
      render: (time: string) => new Date(time).toLocaleString(),
    },
  ];

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    const cleanup = initCharts();
    return cleanup;
  }, [chartPeriod]);

  return (
    <Spin spinning={loading}>
      <div className={styles.dashboard}>
        {/* 欢迎区域 */}
        <Card className={styles.welcomeCard}>
          <Row align="middle">
            <Col flex="auto">
              <Title level={3} className={styles.welcomeTitle}>
                欢迎回来，{currentUser?.username || '用户'}！
              </Title>
              <Text type="secondary">
                今天是 {new Date().toLocaleDateString('zh-CN')}，系统运行正常
              </Text>
            </Col>
            <Col>
              <Space>
                <RangePicker />
                <Select
                  value={chartPeriod}
                  onChange={setChartPeriod}
                  style={{ width: 120 }}
                >
                  <Option value="1d">今天</Option>
                  <Option value="7d">近7天</Option>
                  <Option value="30d">近30天</Option>
                </Select>
              </Space>
            </Col>
          </Row>
        </Card>

        {/* 统计卡片 */}
        <Row gutter={[16, 16]} className={styles.statsRow}>
          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="总用户数"
                value={stats.users.total}
                prefix={<UserOutlined />}
                suffix={
                  <Space>
                    {stats.users.growth > 0 ? (
                      <CaretUpOutlined style={{ color: '#52c41a' }} />
                    ) : (
                      <CaretDownOutlined style={{ color: '#ff4d4f' }} />
                    )}
                    <Text type={stats.users.growth > 0 ? 'success' : 'danger'}>
                      {Math.abs(stats.users.growth)}%
                    </Text>
                  </Space>
                }
                valueStyle={{ color: '#1890ff' }}
              />
              <Progress
                percent={75}
                size="small"
                showInfo={false}
                className={styles.progress}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="活跃用户"
                value={stats.users.active}
                prefix={<UnlockOutlined />}
                suffix={
                  <Text type="secondary">
                    /{stats.users.total}
                  </Text>
                }
                valueStyle={{ color: '#52c41a' }}
              />
              <Progress
                percent={60}
                size="small"
                showInfo={false}
                strokeColor="#52c41a"
                className={styles.progress}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="角色数量"
                value={stats.roles.total}
                prefix={<TeamOutlined />}
                suffix={
                  <Space>
                    <CaretUpOutlined style={{ color: '#52c41a' }} />
                    <Text type="success">{stats.roles.growth}%</Text>
                  </Space>
                }
                valueStyle={{ color: '#722ed1' }}
              />
              <Progress
                percent={85}
                size="small"
                showInfo={false}
                strokeColor="#722ed1"
                className={styles.progress}
              />
            </Card>
          </Col>

          <Col xs={24} sm={12} lg={6}>
            <Card>
              <Statistic
                title="权限数量"
                value={stats.permissions.total}
                prefix={<SafetyCertificateOutlined />}
                suffix={
                  <Space>
                    <CaretUpOutlined style={{ color: '#52c41a' }} />
                    <Text type="success">{stats.permissions.growth}%</Text>
                  </Space>
                }
                valueStyle={{ color: '#fa8c16' }}
              />
              <Progress
                percent={90}
                size="small"
                showInfo={false}
                strokeColor="#fa8c16"
                className={styles.progress}
              />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className={styles.chartsRow}>
          {/* 图表区域 */}
          <Col xs={24} lg={16}>
            <Card
              title="用户增长趋势"
              extra={
                <Button size="small" onClick={loadDashboardData}>
                  刷新数据
                </Button>
              }
            >
              <div id="userTrendChart" className={styles.chart} />
            </Card>
          </Col>

          <Col xs={24} lg={8}>
            <Card title="活动分布">
              <div id="activityChart" className={styles.chart} />
            </Card>
          </Col>
        </Row>

        <Row gutter={[16, 16]} className={styles.contentRow}>
          {/* 系统健康度 */}
          <Col xs={24} lg={8}>
            <Card title="系统健康度" className={styles.healthCard}>
              <div className={styles.healthItem}>
                <Text>CPU 使用率</Text>
                <Progress
                  percent={systemHealth.cpu}
                  status={systemHealth.cpu > 80 ? 'exception' : 'active'}
                  size="small"
                />
              </div>
              <div className={styles.healthItem}>
                <Text>内存使用率</Text>
                <Progress
                  percent={systemHealth.memory}
                  status={systemHealth.memory > 80 ? 'exception' : 'active'}
                  size="small"
                />
              </div>
              <div className={styles.healthItem}>
                <Text>磁盘使用率</Text>
                <Progress
                  percent={systemHealth.disk}
                  status={systemHealth.disk > 80 ? 'exception' : 'active'}
                  size="small"
                />
              </div>
              <div className={styles.healthItem}>
                <Text>网络状态</Text>
                <Progress
                  percent={systemHealth.network}
                  size="small"
                  strokeColor="#52c41a"
                />
              </div>
            </Card>
          </Col>

          {/* 最近活动 */}
          <Col xs={24} lg={16}>
            <Card
              title="最近活动"
              extra={
                <Button size="small" type="link">
                  查看全部
                </Button>
              }
            >
              <Table
                dataSource={activities}
                columns={activityColumns}
                size="small"
                pagination={false}
                scroll={{ y: 300 }}
                rowKey="id"
              />
            </Card>
          </Col>
        </Row>
      </div>
    </Spin>
  );
};

export default Dashboard;