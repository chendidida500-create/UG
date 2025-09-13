import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  message,
  Card,
  Typography,
  DatePicker,
  InputNumber,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  CheckCircleOutlined,
} from '@ant-design/icons';
import styles from './TaskManagement.module.css';

const { Title } = Typography;
const { Option } = Select;
const { RangePicker } = DatePicker;

// 任务状态类型
type TaskStatus = 'todo' | 'in-progress' | 'done' | 'cancelled';

// 任务优先级类型
type TaskPriority = 'low' | 'medium' | 'high';

// 任务接口
interface Task {
  id: number;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  assignee: string;
  createdAt: string;
  dueDate?: string;
  estimatedHours?: number;
}

const TaskManagement: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [form] = Form.useForm();

  // 模拟获取任务数据
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));

      // 模拟数据
      const mockTasks: Task[] = [
        {
          id: 1,
          title: '修复前端类型错误',
          description: '解决UMI项目中的TypeScript类型错误问题',
          status: 'done',
          priority: 'high',
          assignee: '开发者A',
          createdAt: '2023-01-15',
          dueDate: '2023-01-20',
          estimatedHours: 8,
        },
        {
          id: 2,
          title: '优化数据库查询',
          description: '优化用户管理模块的数据库查询性能',
          status: 'in-progress',
          priority: 'medium',
          assignee: '开发者B',
          createdAt: '2023-02-20',
          dueDate: '2023-03-10',
          estimatedHours: 12,
        },
        {
          id: 3,
          title: '实现用户权限管理',
          description: '开发用户角色和权限管理系统',
          status: 'todo',
          priority: 'high',
          assignee: '开发者A',
          createdAt: '2023-03-10',
          dueDate: '2023-04-15',
          estimatedHours: 20,
        },
        {
          id: 4,
          title: '更新文档',
          description: '更新项目文档和README文件',
          status: 'todo',
          priority: 'low',
          assignee: '开发者C',
          createdAt: '2023-03-15',
          dueDate: '2023-03-25',
          estimatedHours: 5,
        },
      ];

      setTasks(mockTasks);
    } catch (error) {
      message.error('获取任务数据失败');
    } finally {
      setLoading(false);
    }
  };

  const handleAddTask = () => {
    setEditingTask(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditTask = (task: Task) => {
    setEditingTask(task);
    form.setFieldsValue({
      ...task,
      dueDate: task.dueDate ? new Date(task.dueDate) : null,
    });
    setModalVisible(true);
  };

  const handleDeleteTask = (taskId: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个任务吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          // 模拟API调用
          await new Promise(resolve => setTimeout(resolve, 300));
          setTasks(tasks.filter((task: Task) => task.id !== taskId));
          message.success('任务删除成功');
        } catch (error) {
          message.error('删除任务失败');
        }
      },
    });
  };

  const handleCompleteTask = (taskId: number) => {
    setTasks(
      tasks.map((task: Task) =>
        task.id === taskId ? { ...task, status: 'done' } : task
      )
    );
    message.success('任务已完成');
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      // 处理日期格式
      const taskData = {
        ...values,
        dueDate: values.dueDate
          ? values.dueDate.format('YYYY-MM-DD')
          : undefined,
      };

      if (editingTask) {
        // 更新任务
        const updatedTasks = tasks.map((task: Task) =>
          task.id === editingTask.id ? { ...task, ...taskData } : task
        );
        setTasks(updatedTasks);
        message.success('任务更新成功');
      } else {
        // 添加新任务
        const newTask = {
          id: tasks.length + 1,
          ...taskData,
          status: 'todo',
          createdAt: new Date().toISOString().split('T')[0],
        };
        setTasks([...tasks, newTask]);
        message.success('任务添加成功');
      }

      setModalVisible(false);
      form.resetFields();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const getStatusTag = (status: TaskStatus) => {
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
        return <Tag color="default">未知</Tag>;
    }
  };

  const getPriorityTag = (priority: TaskPriority) => {
    switch (priority) {
      case 'low':
        return <Tag color="default">低</Tag>;
      case 'medium':
        return <Tag color="warning">中</Tag>;
      case 'high':
        return <Tag color="error">高</Tag>;
      default:
        return <Tag color="default">未知</Tag>;
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
      title: '任务名称',
      dataIndex: 'title',
      key: 'title',
      render: (text: string, record: Task) => (
        <div>
          <div>{text}</div>
          <div className={styles.description}>{record.description}</div>
        </div>
      ),
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: TaskStatus) => getStatusTag(status),
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      key: 'priority',
      render: (priority: TaskPriority) => getPriorityTag(priority),
    },
    {
      title: '负责人',
      dataIndex: 'assignee',
      key: 'assignee',
    },
    {
      title: '预计工时',
      dataIndex: 'estimatedHours',
      key: 'estimatedHours',
      render: (hours: number) => (hours ? `${hours}小时` : '-'),
    },
    {
      title: '截止日期',
      dataIndex: 'dueDate',
      key: 'dueDate',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Task) => (
        <Space size="middle">
          {record.status !== 'done' && (
            <Button
              type="link"
              icon={<CheckCircleOutlined />}
              onClick={() => handleCompleteTask(record.id)}
            >
              完成
            </Button>
          )}
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditTask(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteTask(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.header}>
          <Typography.Title level={3}>任务管理</Typography.Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddTask}
          >
            添加任务
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={tasks}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
          }}
        />
      </Card>

      <Modal
        title={editingTask ? '编辑任务' : '添加任务'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="确认"
        cancelText="取消"
        width={600}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="title"
            label="任务名称"
            rules={[{ required: true, message: '请输入任务名称!' }]}
          >
            <Input placeholder="请输入任务名称" />
          </Form.Item>

          <Form.Item name="description" label="任务描述">
            <Input.TextArea placeholder="请输入任务描述" rows={3} />
          </Form.Item>

          <Form.Item
            name="priority"
            label="优先级"
            rules={[{ required: true, message: '请选择优先级!' }]}
          >
            <Select placeholder="请选择优先级">
              <Option value="low">低</Option>
              <Option value="medium">中</Option>
              <Option value="high">高</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="assignee"
            label="负责人"
            rules={[{ required: true, message: '请输入负责人!' }]}
          >
            <Input placeholder="请输入负责人" />
          </Form.Item>

          <Form.Item name="estimatedHours" label="预计工时（小时）">
            <InputNumber
              min={0}
              placeholder="请输入预计工时"
              style={{ width: '100%' }}
            />
          </Form.Item>

          <Form.Item name="dueDate" label="截止日期">
            <DatePicker
              style={{ width: '100%' }}
              placeholder="请选择截止日期"
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default TaskManagement;
