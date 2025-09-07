import { useModel } from '@/utils/umiMock';
import {
  AreaChartOutlined,
  BarChartOutlined,
  PieChartOutlined,
  UserOutlined,
} from '@ant-design/icons';
import { Card, Col, Row, Statistic, Tabs, theme } from 'antd';
import { useState } from 'react';
import styles from './index.module.less';

const DashboardPage: React.FC = () => {
  const { token } = theme.useToken();

  const authModel = useModel('auth');
  const { currentUser } = authModel;
  const [activeTab, setActiveTab] = useState('1');

  // 模拟统计数据
  const stats = {
    users: 1234,
    orders: 5678,
    revenue: 98765,
    growth: 12.3,
  };

  // 模拟图表数据
  const chartData = [
    { name: 'Jan', value: 400 },
    { name: 'Feb', value: 600 },
    { name: 'Mar', value: 800 },
    { name: 'Apr', value: 500 },
    { name: 'May', value: 900 },
    { name: 'Jun', value: 700 },
  ];

  return (
    <div className={styles.dashboard}>
      <div className={styles.welcome}>
        <h2>欢迎回来，{currentUser?.username}！</h2>
        <p>这里是您的仪表盘，可以查看系统的关键指标。</p>
      </div>

      <Row gutter={16} className={styles.statsRow}>
        <Col span={6}>
          <Card>
            <Statistic
              title="用户总数"
              value={stats.users}
              prefix={<UserOutlined />}
              valueStyle={{ color: token.colorPrimary }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="订单总数"
              value={stats.orders}
              prefix={<BarChartOutlined />}
              valueStyle={{ color: token.colorSuccess }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="总收入"
              value={stats.revenue}
              prefix={<AreaChartOutlined />}
              valueStyle={{ color: token.colorError }}
              suffix="元"
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="增长率"
              value={stats.growth}
              prefix={<PieChartOutlined />}
              valueStyle={{ color: token.colorWarning }}
              suffix="%"
            />
          </Card>
        </Col>
      </Row>

      <Card className={styles.chartCard}>
        <Tabs
          activeKey={activeTab}
          onChange={setActiveTab}
          items={[
            {
              key: '1',
              label: '用户增长趋势',
            },
            {
              key: '2',
              label: '订单统计',
            },
            {
              key: '3',
              label: '收入分析',
            },
          ]}
        >
        </Tabs>
        <div className={styles.chartContainer}>
          {/* 这里应该放置实际的图表组件 */}
          <div className={styles.placeholderChart}>
            图表数据展示区域
          </div>
        </div>
      </Card>
    </div>
  );
};

export default DashboardPage;