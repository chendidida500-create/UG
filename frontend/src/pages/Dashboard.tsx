import React, { useState, useEffect } from 'react';
import {
  Card,
  Typography,
  message,
  DatePicker,
  Table,
  Space,
  Tag,
  Statistic,
  Row,
  Col,
} from 'antd';
import {
  UserOutlined,
  TeamOutlined,
  FileDoneOutlined,
  BarChartOutlined,
} from '@ant-design/icons';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { Helmet } from 'umi';
import styles from './Dashboard.module.css';

const { RangePicker } = DatePicker;

// 用户数据类型
interface UserData {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'inactive';
  createdAt: string;
}

// 任务数据类型
interface TaskData {
  id: number;
  title: string;
  status: 'todo' | 'in-progress' | 'done' | 'cancelled';
  priority: 'low' | 'medium' | 'high';
  assignee: string;
  createdAt: string;
  dueDate?: string;
}

// 统计数据类型
interface StatisticData {
  id?: number;
  title: string;
  value: number;
  icon: React.ReactNode;
  color: string;
}

// 图表数据类型
interface ChartData {
  name: string;
  value: number;
}

const Dashboard: React.FC = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [statistics, setStatistics] = useState<StatisticData[]>([]);
  const [userGrowthData, setUserGrowthData] = useState<ChartData[]>([]);
  const [taskStatusData, setTaskStatusData] = useState<ChartData[]>([]);
  const [loading, setLoading] = useState(false);

  // 模拟获取数据
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));

      // 模拟用户数据
      const mockUsers: UserData[] = [
        {
          id: 1,
          name: '张三',
          email: 'zhangsan@example.com',
          role: 'admin',
          status: 'active',
          createdAt: '2023-01-15',
        },
        {
          id: 2,
          name: '李四',
          email: 'lisi@example.com',
          role: 'user',
          status: 'active',
          createdAt: '2023-02-20',
        },
        {
          id: 3,
          name: '王五',
          email: 'wangwu@example.com',
          role: 'user',
          status: 'inactive',
          createdAt: '2023-03-10',
        },
      ];

      // 模拟任务数据
      const mockTasks: TaskData[] = [
        {
          id: 1,
          title: '开发用户管理功能',
          status: 'done',
          priority: 'high',
          assignee: '张三',
          createdAt: '2023-01-15',
          dueDate: '2023-01-20',
        },
        {
          id: 2,
          title: '设计权限系统',
          status: 'in-progress',
          priority: 'high',
          assignee: '李四',
          createdAt: '2023-02-20',
          dueDate: '2023-02-25',
        },
        {
          id: 3,
          title: '优化系统性能',
          status: 'todo',
          priority: 'medium',
          assignee: '王五',
          createdAt: '2023-03-10',
        },
      ];

      // 模拟统计数据
      const mockStatistics: StatisticData[] = [
        {
          title: '总用户数',
          value: 128,
          icon: <UserOutlined />,
          color: '#1890ff',
        },
        {
          id: 2,
          title: '总角色数',
          value: 5,
          icon: <TeamOutlined />,
          color: '#52c41a',
        },
        {
          id: 3,
          title: '总任务数',
          value: 42,
          icon: <FileDoneOutlined />,
          color: '#faad14',
        },
        {
          id: 4,
          title: '在线用户',
          value: 24,
          icon: <BarChartOutlined />,
          color: '#722ed1',
        },
      ];

      // 模拟用户增长数据
      const mockUserGrowthData: ChartData[] = [
        { name: 'Jan', value: 40 },
        { name: 'Feb', value: 30 },
        { name: 'Mar', value: 20 },
        { name: 'Apr', value: 27 },
        { name: 'May', value: 18 },
        { name: 'Jun', value: 23 },
        { name: 'Jul', value: 34 },
      ];

      // 模拟任务状态数据
      const mockTaskStatusData: ChartData[] = [
        { name: '待办', value: 12 },
        { name: '进行中', value: 8 },
        { name: '已完成', value: 22 },
        { name: '已取消', value: 0 },
      ];

      setUsers(mockUsers);
      setTasks(mockTasks);
      setStatistics(mockStatistics);
      setUserGrowthData(mockUserGrowthData);
      setTaskStatusData(mockTaskStatusData);
    } catch (error) {
      message.error('获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'todo':
        return <Tag color="default">待办</Tag>;
      case 'in-progress':
        return <Tag color="processing">进行中</Tag>;
      case 'done':
        return <Tag color="success">已完成</Tag>;
      case 'cancelled':
        return <Tag color="error">已取消</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const getPriorityTag = (priority: string) => {
    switch (priority) {
      case 'low':
        return <Tag color="default">低</Tag>;
      case 'medium':
        return <Tag color="warning">中</Tag>;
      case 'high':
        return <Tag color="error">高</Tag>;
      default:
        return <Tag>{priority}</Tag>;
    }
  };

  const userColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '姓名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <Tag color={role === 'admin' ? 'red' : 'blue'}>
          {role === 'admin' ? '管理员' : '普通用户'}
        </Tag>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'active' | 'inactive') => (
        <Tag color={status === 'active' ? 'green' : 'gray'}>
          {status === 'active' ? '活跃' : '非活跃'}
        </Tag>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  const taskColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '任务名称',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => getPriorityTag(priority),
    },
    {
      title: '负责人',
      dataIndex: 'assignee',
      key: 'assignee',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];

  const COLORS = ['#1890ff', '#52c41a', '#faad14', '#722ed1'];

  return (
    <div className={styles.container}>
      <Helmet>
        <title>仪表盘</title>
      </Helmet>
      <Typography.Title level={3} style={{ marginBottom: 24 }}>
        Dashboard
      </Typography.Title>

      {/* 统计数据 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        {statistics.map((stat, index) => (
          <Col span={6} key={index}>
            <Card>
              <Statistic
                title={stat.title}
                value={stat.value}
                prefix={stat.icon}
                valueStyle={{ color: stat.color }}
              />
            </Card>
          </Col>
        ))}
      </Row>

      {/* 图表区域 */}
      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={12}>
          <Card>
            <Typography.Title level={5}>用户增长趋势</Typography.Title>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#1890ff"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Typography.Title level={5}>任务状态分布</Typography.Title>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={taskStatusData}
                  cx="50%"
                  cy="50%"
                  labelLine={true}
                  label={({
                    name,
                    percent,
                  }: {
                    name: string;
                    percent: number;
                  }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {taskStatusData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      <Row gutter={16} style={{ marginBottom: 24 }}>
        <Col span={24}>
          <Card>
            <Typography.Title level={5}>任务完成情况</Typography.Title>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={taskStatusData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#1890ff" />
              </BarChart>
            </ResponsiveContainer>
          </Card>
        </Col>
      </Row>

      {/* 数据表格 */}
      <Row gutter={16}>
        <Col span={12}>
          <Card>
            <Typography.Title level={5}>最新用户</Typography.Title>
            <Table
              dataSource={users}
              columns={userColumns}
              loading={loading}
              rowKey="id"
              pagination={false}
              scroll={{ y: 300 }}
            />
          </Card>
        </Col>
        <Col span={12}>
          <Card>
            <Typography.Title level={5}>最新任务</Typography.Title>
            <Table
              dataSource={tasks}
              columns={taskColumns}
              loading={loading}
              rowKey="id"
              pagination={false}
              scroll={{ y: 300 }}
            />
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Dashboard;
