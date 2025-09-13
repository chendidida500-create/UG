import React, { useState, useEffect } from 'react';
import {
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  message,
  Card,
  Typography,
  Select,
  Popconfirm,
  Row,
  Col,
  DatePicker,
  Table,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
} from '@ant-design/icons';
import styles from './Notice.module.css';

const { Option } = Select;
const { TextArea } = Input;

// 通知公告数据类型
interface Notice {
  id: number;
  title: string;
  content: string;
  type: 'notice' | 'announcement' | 'alert';
  status: 'draft' | 'published' | 'archived';
  priority: 'low' | 'medium' | 'high';
  publishTime?: string;
  expireTime?: string;
  creator: string;
  createdAt: string;
  updatedAt: string;
}

const Notice: React.FC = () => {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [editingNotice, setEditingNotice] = useState<Notice | null>(null);
  const [viewingNotice, setViewingNotice] = useState<Notice | null>(null);
  const [form] = Form.useForm();

  // 模拟获取通知公告数据
  useEffect(() => {
    fetchNotices();
  }, []);

  const fetchNotices = async () => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));

      // 模拟数据
      const mockNotices: Notice[] = [
        {
          id: 1,
          title: '系统维护通知',
          content:
            '系统将于今晚00:00-02:00进行维护，期间服务将暂时不可用，请提前做好准备。',
          type: 'notice',
          status: 'published',
          priority: 'high',
          publishTime: '2023-01-15 09:00:00',
          expireTime: '2023-01-20 00:00:00',
          creator: '系统管理员',
          createdAt: '2023-01-15 09:00:00',
          updatedAt: '2023-01-15 09:00:00',
        },
        {
          id: 2,
          title: '新功能上线公告',
          content: '我们很高兴地宣布，用户管理模块已正式上线，欢迎体验新功能。',
          type: 'announcement',
          status: 'published',
          priority: 'medium',
          publishTime: '2023-01-16 10:00:00',
          creator: '产品团队',
          createdAt: '2023-01-16 10:00:00',
          updatedAt: '2023-01-16 10:00:00',
        },
        {
          id: 3,
          title: '安全提醒',
          content: '请定期修改密码，确保账户安全。',
          type: 'alert',
          status: 'draft',
          priority: 'high',
          creator: '安全团队',
          createdAt: '2023-01-17 11:00:00',
          updatedAt: '2023-01-17 11:00:00',
        },
      ];

      setNotices(mockNotices);
    } catch (error) {
      message.error('获取通知公告数据失败');
    }
  };

  const handleAddNotice = () => {
    setEditingNotice(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditNotice = (notice: Notice) => {
    setEditingNotice(notice);
    form.setFieldsValue(notice);
    setModalVisible(true);
  };

  const handleViewNotice = (notice: Notice) => {
    setViewingNotice(notice);
    setDetailModalVisible(true);
  };

  const handleDeleteNotice = async (noticeId: number) => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));
      setNotices(notices.filter(notice => notice.id !== noticeId));
      message.success('通知公告删除成功');
    } catch (error) {
      message.error('删除通知公告失败');
    }
  };

  const handlePublishNotice = async (noticeId: number) => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));

      const updatedNotices = notices.map(notice =>
        notice.id === noticeId
          ? {
              ...notice,
              status: 'published',
              publishTime: new Date()
                .toISOString()
                .replace('T', ' ')
                .substring(0, 19),
            }
          : notice
      );

      setNotices(updatedNotices);
      message.success('通知公告发布成功');
    } catch (error) {
      message.error('发布通知公告失败');
    }
  };

  const handleArchiveNotice = async (noticeId: number) => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));

      const updatedNotices = notices.map(notice =>
        notice.id === noticeId ? { ...notice, status: 'archived' } : notice
      );

      setNotices(updatedNotices);
      message.success('通知公告归档成功');
    } catch (error) {
      message.error('归档通知公告失败');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingNotice) {
        // 更新通知公告
        const updatedNotices = notices.map(notice =>
          notice.id === editingNotice.id
            ? {
                ...notice,
                ...values,
                updatedAt: new Date()
                  .toISOString()
                  .replace('T', ' ')
                  .substring(0, 19),
              }
            : notice
        );
        setNotices(updatedNotices);
        message.success('通知公告更新成功');
      } else {
        // 添加新通知公告
        const newNotice = {
          id:
            notices.length > 0
              ? Math.max(...notices.map((n: Notice) => n.id)) + 1
              : 1,
          ...values,
          creator: '当前用户',
          createdAt: new Date()
            .toISOString()
            .replace('T', ' ')
            .substring(0, 19),
          updatedAt: new Date()
            .toISOString()
            .replace('T', ' ')
            .substring(0, 19),
        };
        setNotices([...notices, newNotice]);
        message.success('通知公告添加成功');
      }

      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('表单验证失败:', error);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const handleDetailModalCancel = () => {
    setDetailModalVisible(false);
    setViewingNotice(null);
  };

  const getTypeTag = (type: string) => {
    switch (type) {
      case 'notice':
        return <Tag color="blue">通知</Tag>;
      case 'announcement':
        return <Tag color="green">公告</Tag>;
      case 'alert':
        return <Tag color="red">警报</Tag>;
      default:
        return <Tag>{type}</Tag>;
    }
  };

  const getStatusTag = (status: string) => {
    switch (status) {
      case 'draft':
        return <Tag color="default">草稿</Tag>;
      case 'published':
        return <Tag color="success">已发布</Tag>;
      case 'archived':
        return <Tag color="warning">已归档</Tag>;
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

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => getTypeTag(type),
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: string) => getStatusTag(status),
      width: 100,
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: string) => getPriorityTag(priority),
      width: 100,
    },
    {
      title: '发布人',
      dataIndex: 'creator',
      key: 'creator',
      width: 120,
    },
    {
      title: '发布时间',
      dataIndex: 'publishTime',
      key: 'publishTime',
      width: 180,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 180,
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Notice) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleViewNotice(record)}
          >
            查看
          </Button>
          {record.status === 'draft' && (
            <Button type="link" onClick={() => handlePublishNotice(record.id)}>
              发布
            </Button>
          )}
          {record.status === 'published' && (
            <Button type="link" onClick={() => handleArchiveNotice(record.id)}>
              归档
            </Button>
          )}
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditNotice(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除"
            description="确定要删除这个通知公告吗？"
            onConfirm={() => handleDeleteNotice(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Typography.Title level={3} style={{ marginBottom: 24 }}>
        通知公告管理
      </Typography.Title>

      <Card
        title={
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}
          >
            <Typography.Title level={5} style={{ margin: 0 }}>
              通知公告列表
            </Typography.Title>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              onClick={handleAddNotice}
            >
              添加通知公告
            </Button>
          </div>
        }
      >
        <Table
          dataSource={notices}
          columns={columns}
          rowKey="id"
          pagination={{
            pageSize: 10,
          }}
        />
      </Card>

      {/* 通知公告编辑模态框 */}
      <Modal
        title={editingNotice ? '编辑通知公告' : '添加通知公告'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="确认"
        cancelText="取消"
        width={800}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="标题"
            rules={[{ required: true, message: '请输入标题!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型!' }]}
          >
            <Select>
              <Option value="notice">通知</Option>
              <Option value="announcement">公告</Option>
              <Option value="alert">警报</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="priority"
            label="优先级"
            rules={[{ required: true, message: '请选择优先级!' }]}
          >
            <Select>
              <Option value="low">低</Option>
              <Option value="medium">中</Option>
              <Option value="high">高</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="content"
            label="内容"
            rules={[{ required: true, message: '请输入内容!' }]}
          >
            <TextArea rows={6} />
          </Form.Item>

          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="publishTime" label="发布时间">
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="expireTime" label="过期时间">
                <DatePicker showTime style={{ width: '100%' }} />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>

      {/* 通知公告详情模态框 */}
      <Modal
        title="通知公告详情"
        open={detailModalVisible}
        onCancel={handleDetailModalCancel}
        footer={null}
        width={800}
      >
        {viewingNotice && (
          <div>
            <div style={{ marginBottom: 16 }}>
              <h2>{viewingNotice.title}</h2>
              <div style={{ marginTop: 8 }}>
                {getTypeTag(viewingNotice.type)}
                {getStatusTag(viewingNotice.status)}
                {getPriorityTag(viewingNotice.priority)}
              </div>
            </div>

            <div style={{ marginBottom: 16 }}>
              <p>{viewingNotice.content}</p>
            </div>

            <div>
              <p>
                <strong>发布人:</strong> {viewingNotice.creator}
              </p>
              <p>
                <strong>发布时间:</strong>{' '}
                {viewingNotice.publishTime || '未发布'}
              </p>
              <p>
                <strong>过期时间:</strong> {viewingNotice.expireTime || '无'}
              </p>
              <p>
                <strong>创建时间:</strong> {viewingNotice.createdAt}
              </p>
              <p>
                <strong>更新时间:</strong> {viewingNotice.updatedAt}
              </p>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Notice;
