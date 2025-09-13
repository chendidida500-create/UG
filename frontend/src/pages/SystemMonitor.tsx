import React, { useState, useEffect } from 'react';
import { Card, Typography, Progress, Tag, message } from 'antd';
import {
  DesktopOutlined,
  UserOutlined,
  DatabaseOutlined,
  CloudOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import styles from './SystemMonitor.module.css';

const { Title } = Typography;

// 系统状态数据类型
interface SystemStatus {
  cpuUsage: number;
  memoryUsage: number;
  diskUsage: number;
  networkUsage: number;
  uptime: string;
}

// 日志数据类型
interface LogEntry {
  id: number;
  level: 'info' | 'warn' | 'error';
  message: string;
  timestamp: string;
  source: string;
}

// 性能数据类型
interface PerformanceData {
  id: number;
  endpoint: string;
  responseTime: number;
  status: 'success' | 'warning' | 'error';
  timestamp: string;
}

const SystemMonitor: React.FC = () => {
  const [systemStatus, setSystemStatus] = useState<SystemStatus>({
    cpuUsage: 0,
    memoryUsage: 0,
    diskUsage: 0,
    networkUsage: 0,
    uptime: '0天0小时0分钟',
  });
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [performanceData, setPerformanceData] = useState<PerformanceData[]>([]);
  const [loading, setLoading] = useState(false);

  // 模拟获取系统状态数据
  useEffect(() => {
    fetchSystemStatus();
    fetchLogs();
    fetchPerformanceData();

    // 设置定时器定期更新数据
    const interval = setInterval(() => {
      fetchSystemStatus();
      fetchLogs();
      fetchPerformanceData();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const fetchSystemStatus = async () => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));

      // 模拟数据
      const mockStatus: SystemStatus = {
        cpuUsage: Math.floor(Math.random() * 100),
        memoryUsage: Math.floor(Math.random() * 100),
        diskUsage: Math.floor(Math.random() * 100),
        networkUsage: Math.floor(Math.random() * 100),
        uptime: `${Math.floor(Math.random() * 30)}天${Math.floor(Math.random() * 24)}小时${Math.floor(Math.random() * 60)}分钟`,
      };

      setSystemStatus(mockStatus);
    } catch (error) {
      message.error('获取系统状态失败');
    }
  };

  const fetchLogs = async () => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));

      // 模拟数据
      const mockLogs: LogEntry[] = [
        {
          id: 1,
          level: 'info',
          message: '用户登录成功',
          timestamp: new Date().toISOString(),
          source: 'auth-service',
        },
        {
          id: 2,
          level: 'warn',
          message: 'CPU使用率超过80%',
          timestamp: new Date(Date.now() - 60000).toISOString(),
          source: 'system-monitor',
        },
        {
          id: 3,
          level: 'error',
          message: '数据库连接失败',
          timestamp: new Date(Date.now() - 120000).toISOString(),
          source: 'database',
        },
        {
          id: 4,
          level: 'info',
          message: '定时任务执行完成',
          timestamp: new Date(Date.now() - 180000).toISOString(),
          source: 'scheduler',
        },
      ];

      setLogs(mockLogs);
    } catch (error) {
      message.error('获取日志数据失败');
    }
  };

  const fetchPerformanceData = async () => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));

      // 模拟数据
      const mockPerformance: PerformanceData[] = [
        {
          id: 1,
          endpoint: '/api/users',
          responseTime: Math.floor(Math.random() * 200),
          status: 'success',
          timestamp: new Date().toISOString(),
        },
        {
          id: 2,
          endpoint: '/api/roles',
          responseTime: Math.floor(Math.random() * 300),
          status: Math.random() > 0.8 ? 'error' : 'success',
          timestamp: new Date().toISOString(),
        },
        {
          id: 3,
          endpoint: '/api/permissions',
          responseTime: Math.floor(Math.random() * 150),
          status: 'success',
          timestamp: new Date().toISOString(),
        },
        {
          id: 4,
          endpoint: '/api/login',
          responseTime: Math.floor(Math.random() * 100),
          status: 'success',
          timestamp: new Date().toISOString(),
        },
      ];

      setPerformanceData(mockPerformance);
    } catch (error) {
      message.error('获取性能数据失败');
    }
  };

  const getLevelTag = (level: string) => {
    switch (level) {
      case 'info':
        return <Tag color="blue">信息</Tag>;
      case 'warn':
        return <Tag color="orange">警告</Tag>;
      case 'error':
        return <Tag color="red">错误</Tag>;
      default:
        return <Tag>{level}</Tag>;
    }
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'success':
        return <Tag color="green">成功</Tag>;
      case 'warning':
        return <Tag color="orange">警告</Tag>;
      case 'error':
        return <Tag color="red">错误</Tag>;
      default:
        return <Tag>{status}</Tag>;
    }
  };

  const logColumns = [
    {
      title: '级别',
      dataIndex: 'level',
      key: 'level',
      render: (level: string) => getLevelTag(level),
      width: 80,
    },
    {
      title: '消息',
      dataIndex: 'message',
      key: 'message',
    },
    {
      title: '来源',
      dataIndex: 'source',
      key: 'source',
      width: 120,
    },
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => new Date(timestamp).toLocaleString(),
      width: 180,
    },
  ];

  const performanceColumns = [
    {
      title: '接口',
      dataIndex: 'endpoint',
      key: 'endpoint',
    },
    {
      title: '响应时间(ms)',
      dataIndex: 'responseTime',
      key: 'responseTime',
      render: (time: number) => (
        <span
          style={{
            color: time > 200 ? 'red' : time > 100 ? 'orange' : 'green',
          }}
        >
          {time}
        </span>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
      width: 80,
    },
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
      render: (timestamp: string) => new Date(timestamp).toLocaleString(),
      width: 180,
    },
  ];

  return (
    <div className={styles.container}>
      <Typography.Title level={3} style={{ marginBottom: 24 }}>
        系统监控
      </Typography.Title>

      {/* 系统状态概览 */}
      <div style={{ marginBottom: 24 }}>
        <Card>
          <Typography.Title level={5} style={{ marginBottom: 16 }}>
            系统状态概览
          </Typography.Title>
          <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <Card>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{ fontSize: 24, marginRight: 16, color: '#1890ff' }}
                  >
                    <DesktopOutlined />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.45)' }}>
                      CPU使用率
                    </div>
                    <div style={{ fontSize: 24, color: '#1890ff' }}>
                      {systemStatus.cpuUsage}%
                    </div>
                  </div>
                </div>
                <Progress percent={systemStatus.cpuUsage} status="active" />
              </Card>
            </div>
            <div style={{ flex: 1 }}>
              <Card>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{ fontSize: 24, marginRight: 16, color: '#1890ff' }}
                  >
                    <UserOutlined />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.45)' }}>
                      内存使用率
                    </div>
                    <div style={{ fontSize: 24, color: '#1890ff' }}>
                      {systemStatus.memoryUsage}%
                    </div>
                  </div>
                </div>
                <Progress percent={systemStatus.memoryUsage} status="active" />
              </Card>
            </div>
            <div style={{ flex: 1 }}>
              <Card>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{ fontSize: 24, marginRight: 16, color: '#1890ff' }}
                  >
                    <DatabaseOutlined />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.45)' }}>
                      磁盘使用率
                    </div>
                    <div style={{ fontSize: 24, color: '#1890ff' }}>
                      {systemStatus.diskUsage}%
                    </div>
                  </div>
                </div>
                <Progress percent={systemStatus.diskUsage} status="active" />
              </Card>
            </div>
            <div style={{ flex: 1 }}>
              <Card>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <div
                    style={{ fontSize: 24, marginRight: 16, color: '#1890ff' }}
                  >
                    <CloudOutlined />
                  </div>
                  <div>
                    <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.45)' }}>
                      网络使用率
                    </div>
                    <div style={{ fontSize: 24, color: '#1890ff' }}>
                      {systemStatus.networkUsage}%
                    </div>
                  </div>
                </div>
                <Progress percent={systemStatus.networkUsage} status="active" />
              </Card>
            </div>
          </div>
          <div>
            <Card>
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <div
                  style={{ fontSize: 24, marginRight: 16, color: '#52c41a' }}
                >
                  <CheckCircleOutlined />
                </div>
                <div>
                  <div style={{ fontSize: 14, color: 'rgba(0, 0, 0, 0.45)' }}>
                    系统运行时间
                  </div>
                  <div style={{ fontSize: 24, color: '#52c41a' }}>
                    {systemStatus.uptime}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </Card>
      </div>

      {/* 日志和性能数据 */}
      <div style={{ display: 'flex', gap: 16 }}>
        <div style={{ flex: 1 }}>
          <Card>
            <Typography.Title level={5} style={{ marginBottom: 16 }}>
              系统日志
            </Typography.Title>
            <div style={{ height: 400, overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {logColumns.map(column => (
                      <th
                        key={column.key}
                        style={{
                          padding: '16px 8px',
                          textAlign: 'left',
                          borderBottom: '1px solid #f0f0f0',
                        }}
                      >
                        {column.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {logs.map(log => (
                    <tr key={log.id}>
                      {logColumns.map(column => (
                        <td
                          key={column.key}
                          style={{
                            padding: '16px 8px',
                            borderBottom: '1px solid #f0f0f0',
                          }}
                        >
                          {column.render
                            ? column.render(
                                log[column.dataIndex as keyof LogEntry],
                                log
                              )
                            : log[column.dataIndex as keyof LogEntry]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <div style={{ flex: 1 }}>
          <Card>
            <Typography.Title level={5} style={{ marginBottom: 16 }}>
              接口性能
            </Typography.Title>
            <div style={{ height: 400, overflow: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    {performanceColumns.map(column => (
                      <th
                        key={column.key}
                        style={{
                          padding: '16px 8px',
                          textAlign: 'left',
                          borderBottom: '1px solid #f0f0f0',
                        }}
                      >
                        {column.title}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {performanceData.map(data => (
                    <tr key={data.id}>
                      {performanceColumns.map(column => (
                        <td
                          key={column.key}
                          style={{
                            padding: '16px 8px',
                            borderBottom: '1px solid #f0f0f0',
                          }}
                        >
                          {column.render
                            ? column.render(
                                data[column.dataIndex as keyof PerformanceData],
                                data
                              )
                            : data[column.dataIndex as keyof PerformanceData]}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SystemMonitor;
