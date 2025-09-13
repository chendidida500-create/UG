import React, { useState, useEffect } from 'react';
import {
  Card,
  Button,
  Typography,
  message,
  DatePicker,
  Select,
  Space,
} from 'antd';
import {
  DownloadOutlined,
  FileExcelOutlined,
  FilePdfOutlined,
  FileWordOutlined,
} from '@ant-design/icons';
import styles from './Report.module.css';

const { RangePicker } = DatePicker;
const { Option } = Select;

// 报表数据类型
interface ReportData {
  id: number;
  name: string;
  type: string;
  generatedAt: string;
  status: 'generated' | 'pending' | 'failed';
  size: string;
}

// 报表项数据类型
interface ReportItem {
  id: number;
  userId: number;
  userName: string;
  action: string;
  timestamp: string;
  ip: string;
  userAgent: string;
}

const Report: React.FC = () => {
  const [reports, setReports] = useState<ReportData[]>([]);
  const [reportItems, setReportItems] = useState<ReportItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedReport, setSelectedReport] = useState<ReportData | null>(null);

  // 模拟获取报表数据
  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));

      // 模拟报表数据
      const mockReports: ReportData[] = [
        {
          id: 1,
          name: '用户活动报表',
          type: 'xlsx',
          generatedAt: '2023-01-15 10:30:00',
          status: 'generated',
          size: '2.3MB',
        },
        {
          id: 2,
          name: '系统性能报表',
          type: 'pdf',
          generatedAt: '2023-01-14 15:45:00',
          status: 'generated',
          size: '1.8MB',
        },
        {
          id: 3,
          name: '权限变更报表',
          type: 'docx',
          generatedAt: '2023-01-13 09:15:00',
          status: 'generated',
          size: '0.9MB',
        },
      ];

      setReports(mockReports);
    } catch (error) {
      message.error('获取报表数据失败');
    } finally {
      setLoading(false);
    }
  };

  const fetchReportItems = async (reportId: number) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));

      // 模拟报表项数据
      const mockReportItems: ReportItem[] = [
        {
          id: 1,
          userId: 1,
          userName: '张三',
          action: '登录系统',
          timestamp: '2023-01-15 10:30:00',
          ip: '192.168.1.100',
          userAgent: 'Chrome 98.0.4758.102',
        },
        {
          id: 2,
          userId: 2,
          userName: '李四',
          action: '创建用户',
          timestamp: '2023-01-15 10:35:00',
          ip: '192.168.1.101',
          userAgent: 'Firefox 96.0.1',
        },
        {
          id: 3,
          userId: 1,
          userName: '张三',
          action: '修改角色权限',
          timestamp: '2023-01-15 11:00:00',
          ip: '192.168.1.100',
          userAgent: 'Chrome 98.0.4758.102',
        },
      ];

      setReportItems(mockReportItems);
      setSelectedReport(reports.find(report => report.id === reportId) || null);
    } catch (error) {
      message.error('获取报表详情失败');
    } finally {
      setLoading(false);
    }
  };

  const generateReport = async (type: string) => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 1000));

      message.success(`报表生成成功: ${type}`);
      fetchReports();
    } catch (error) {
      message.error('报表生成失败');
    } finally {
      setLoading(false);
    }
  };

  const downloadReport = async (reportId: number, type: string) => {
    try {
      // 模拟下载
      message.success(`开始下载报表: ${type}`);
    } catch (error) {
      message.error('下载失败');
    }
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'generated':
        return <span style={{ color: 'green' }}>已生成</span>;
      case 'pending':
        return <span style={{ color: 'orange' }}>生成中</span>;
      case 'failed':
        return <span style={{ color: 'red' }}>生成失败</span>;
      default:
        return <span>{status}</span>;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'xlsx':
        return <FileExcelOutlined style={{ color: '#217346' }} />;
      case 'pdf':
        return <FilePdfOutlined style={{ color: '#DC2626' }} />;
      case 'docx':
        return <FileWordOutlined style={{ color: '#1E447F' }} />;
      default:
        return null;
    }
  };

  const reportColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '报表名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => (
        <span>
          {getTypeIcon(type)} {type.toUpperCase()}
        </span>
      ),
    },
    {
      title: '生成时间',
      dataIndex: 'generatedAt',
      key: 'generatedAt',
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: ReportData) => (
        <Space size="middle">
          <Button type="link" onClick={() => fetchReportItems(record.id)}>
            查看详情
          </Button>
          <Button
            type="link"
            icon={<DownloadOutlined />}
            onClick={() => downloadReport(record.id, record.type)}
          >
            下载
          </Button>
        </Space>
      ),
    },
  ];

  const reportItemColumns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '用户ID',
      dataIndex: 'userId',
      key: 'userId',
      width: 80,
    },
    {
      title: '用户名',
      dataIndex: 'userName',
      key: 'userName',
    },
    {
      title: '操作',
      dataIndex: 'action',
      key: 'action',
    },
    {
      title: '时间',
      dataIndex: 'timestamp',
      key: 'timestamp',
    },
    {
      title: 'IP地址',
      dataIndex: 'ip',
      key: 'ip',
    },
    {
      title: 'User Agent',
      dataIndex: 'userAgent',
      key: 'userAgent',
    },
  ];

  return (
    <div className={styles.container}>
      <Typography.Title level={3} style={{ marginBottom: 24 }}>
        报表管理
      </Typography.Title>

      {/* 报表生成区域 */}
      <Card>
        <Typography.Title level={5} style={{ marginBottom: 16 }}>
          生成报表
        </Typography.Title>
        <div style={{ display: 'flex', gap: 16, marginBottom: 16 }}>
          <div style={{ flex: 1 }}>
            <RangePicker style={{ width: '100%' }} />
          </div>
          <div style={{ flex: 1 }}>
            <Select defaultValue="user-activity" style={{ width: '100%' }}>
              <Option value="user-activity">用户活动报表</Option>
              <Option value="system-performance">系统性能报表</Option>
              <Option value="permission-changes">权限变更报表</Option>
              <Option value="audit-logs">审计日志报表</Option>
            </Select>
          </div>
          <div style={{ flex: 1 }}>
            <Space>
              <Button
                type="primary"
                loading={loading}
                icon={<FileExcelOutlined />}
                onClick={() => generateReport('Excel')}
              >
                生成Excel报表
              </Button>
              <Button
                loading={loading}
                icon={<FilePdfOutlined />}
                onClick={() => generateReport('PDF')}
              >
                生成PDF报表
              </Button>
              <Button
                loading={loading}
                icon={<FileWordOutlined />}
                onClick={() => generateReport('Word')}
              >
                生成Word报表
              </Button>
            </Space>
          </div>
        </div>
      </Card>

      {/* 报表列表 */}
      <Card>
        <Typography.Title level={5} style={{ marginBottom: 16 }}>
          报表列表
        </Typography.Title>
        <div style={{ height: 300, overflow: 'auto' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                {reportColumns.map(column => (
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
              {reports.map(report => (
                <tr key={report.id}>
                  {reportColumns.map(column => (
                    <td
                      key={column.key}
                      style={{
                        padding: '16px 8px',
                        borderBottom: '1px solid #f0f0f0',
                      }}
                    >
                      {column.render
                        ? column.render(
                            report[column.dataIndex as keyof ReportData],
                            report
                          )
                        : report[column.dataIndex as keyof ReportData]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      {/* 报表明细 */}
      {selectedReport && (
        <Card>
          <Typography.Title level={5} style={{ marginBottom: 16 }}>
            报表详情 - {selectedReport.name}
          </Typography.Title>
          <div style={{ height: 300, overflow: 'auto' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  {reportItemColumns.map(column => (
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
                {reportItems.map(item => (
                  <tr key={item.id}>
                    {reportItemColumns.map(column => (
                      <td
                        key={column.key}
                        style={{
                          padding: '16px 8px',
                          borderBottom: '1px solid #f0f0f0',
                        }}
                      >
                        {column.render
                          ? column.render(
                              item[column.dataIndex as keyof ReportItem],
                              item
                            )
                          : item[column.dataIndex as keyof ReportItem]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
      )}
    </div>
  );
};

export default Report;
