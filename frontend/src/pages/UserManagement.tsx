import React, { useState, useEffect } from 'react';
import {
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  Select,
  message,
  Typography,
  Table,
  Switch,
} from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { Helmet } from 'umi';
import styles from './UserManagement.module.css';
import {
  getUserList,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  assignRolesToUser,
} from '@/services/user';
import { User, UserFormData } from '@/types/user';

const { Option } = Select;

export const UserManagementPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [form] = Form.useForm();
  const [pagination, setPagination] = useState({
    page: 1,
    pageSize: 10,
    total: 0,
  });

  // 获取用户数据
  useEffect(() => {
    fetchUsers();
  }, [pagination.page, pagination.pageSize]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const response = await getUserList({
        page: pagination.page,
        pageSize: pagination.pageSize,
      });
      
      if (response.success) {
        setUsers(response.data);
        setPagination(prev => ({
          ...prev,
          total: response.pagination.total,
        }));
      } else {
        message.error(response.message || '获取用户数据失败');
      }
    } catch (error) {
      message.error('获取用户数据失败');
    } finally {
      setLoading(false);
    }
  };

  const handleAddUser = () => {
    setEditingUser(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditUser = async (user: User) => {
    setLoading(true);
    try {
      const response = await getUserById(user.id);
      if (response.success) {
        setEditingUser(response.data);
        form.setFieldsValue({
          ...response.data,
          roleIds: response.data.roles.map(role => role.id),
        });
        setModalVisible(true);
      } else {
        message.error(response.message || '获取用户详情失败');
      }
    } catch (error) {
      message.error('获取用户详情失败');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteUser = (userId: number) => {
    Modal.confirm({
      title: '确认删除',
      content: '确定要删除这个用户吗？',
      okText: '确认',
      cancelText: '取消',
      onOk: async () => {
        try {
          // 模拟API调用
          await new Promise(resolve => setTimeout(resolve, 300));
          setUsers(users.filter((user: User) => user.id !== userId));
          message.success('用户删除成功');
        } catch (error) {
          message.error('删除用户失败');
        }
      },
    });
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();
      
      // 处理密码确认
      if (values.password && values.password !== values.confirm) {
        message.error('两次输入的密码不一致');
        return;
      }
      
      // 移除确认密码字段
      const { confirm, ...submitValues } = values;
      
      // 如果没有输入新密码，则不提交密码字段
      if (!values.password) {
        delete submitValues.password;
      }

      if (editingUser) {
        // 更新用户
        const response = await updateUser(editingUser.id, submitValues);
        if (response.success) {
          message.success('用户更新成功');
          // 分配角色
          if (values.roleIds) {
            await assignRolesToUser(editingUser.id, { roleIds: values.roleIds });
          }
        } else {
          message.error(response.message || '用户更新失败');
          return;
        }
      } else {
        // 创建用户
        const response = await createUser(submitValues);
        if (response.success) {
          message.success('用户创建成功');
          // 分配角色
          if (values.roleIds && response.data?.id) {
            await assignRolesToUser(response.data.id, { roleIds: values.roleIds });
          }
        } else {
          message.error(response.message || '用户创建失败');
          return;
        }
      }
      
      setModalVisible(false);
      form.resetFields();
      fetchUsers();
    } catch (error) {
      console.error('表单验证失败:', error);
    }
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    form.resetFields();
  };

  const columns = [
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: '角色',
      dataIndex: 'roles',
      key: 'roles',
      render: (roles: { id: number; name: string }[]) => (
        <>
          {roles.map(role => (
            <Tag key={role.id} color="blue">
              {role.name}
            </Tag>
          ))}
        </>
      ),
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
  ];
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: User) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditUser(record)}
          >
            编辑
          </Button>
          <Button
            type="link"
            danger
            icon={<DeleteOutlined />}
            onClick={() => handleDeleteUser(record.id)}
          >
            删除
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Helmet>
        <title>用户管理</title>
      </Helmet>
      <div className={styles.header}>
        <Typography.Title level={4}>用户管理</Typography.Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddUser}>
          新增用户
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={users}
        loading={loading}
        rowKey="id"
        pagination={{
          current: pagination.page,
          pageSize: pagination.pageSize,
          total: pagination.total,
          onChange: handleTableChange,
        }}
      />

      <Modal
        title={editingUser ? '编辑用户' : '添加用户'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 18 }}
          layout="horizontal"
        >
          <Form.Item
            name="username"
            label="用户名"
            rules={[{ required: true, message: '请输入用户名' }]}
          >
            <Input placeholder="请输入用户名" />
          </Form.Item>

          <Form.Item
            name="email"
            label="邮箱"
            rules={[
              { required: true, message: '请输入邮箱' },
              { type: 'email', message: '请输入正确的邮箱格式' },
            ]}
          >
            <Input placeholder="请输入邮箱" />
          </Form.Item>

          {!editingUser && (
            <Form.Item
              name="password"
              label="密码"
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input.Password placeholder="请输入密码" />
            </Form.Item>
          )}

          {editingUser && (
            <Form.Item
              name="password"
              label="新密码"
              rules={[
                {
                  validator: (_, value) => {
                    if (!value) {
                      return Promise.resolve();
                    }
                    if (value.length < 6) {
                      return Promise.reject('密码长度至少6位');
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password placeholder="不修改请留空" />
            </Form.Item>
          )}

          <Form.Item
            name="confirm"
            label="确认密码"
            dependencies={['password']}
            rules={[
              {
                validator: (_, value) => {
                  if (!editingUser && !value) {
                    return Promise.reject('请确认密码');
                  }
                  if (value && value !== form.getFieldValue('password')) {
                    return Promise.reject('两次输入的密码不一致');
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <Input.Password placeholder="请确认密码" />
          </Form.Item>

          <Form.Item name="roleIds" label="角色">
            <Select mode="multiple" placeholder="请选择角色">
              <Option value={1}>管理员</Option>
              <Option value={2}>普通用户</Option>
              <Option value={3}>访客</Option>
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

// 保持默认导出以兼容现有路由
export default UserManagementPage;
