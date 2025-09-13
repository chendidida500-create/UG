import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Modal,
  Form,
  Input,
  message,
  Card,
  Typography,
  Popconfirm,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  UserSwitchOutlined,
} from '@ant-design/icons';
import styles from './RoleManagement.module.css';

const { Title } = Typography;

// 角色数据类型
interface Role {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

// 用户数据类型
interface User {
  id: number;
  name: string;
  email: string;
}

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingRole, setEditingRole] = useState<Role | null>(null);
  const [userModalVisible, setUserModalVisible] = useState(false);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [form] = Form.useForm();

  // 模拟获取角色数据
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));

      // 模拟数据
      const mockRoles: Role[] = [
        {
          id: 1,
          name: '管理员',
          description: '系统管理员，拥有所有权限',
          createdAt: '2023-01-15',
          updatedAt: '2023-01-15',
        },
        {
          id: 2,
          name: '普通用户',
          description: '普通用户，拥有基本权限',
          createdAt: '2023-02-20',
          updatedAt: '2023-02-20',
        },
        {
          id: 3,
          name: '访客',
          description: '访客用户，只读权限',
          createdAt: '2023-03-10',
          updatedAt: '2023-03-10',
        },
      ];

      setRoles(mockRoles);
    } catch (error) {
      message.error('获取角色数据失败');
    } finally {
      setLoading(false);
    }
  };

  const handleAddRole = () => {
    setEditingRole(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditRole = (role: Role) => {
    setEditingRole(role);
    form.setFieldsValue(role);
    setModalVisible(true);
  };

  const handleDeleteRole = async (roleId: number) => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));
      setRoles(roles.filter(role => role.id !== roleId));
      message.success('角色删除成功');
    } catch (error) {
      message.error('删除角色失败');
    }
  };

  const handleManageUsers = (role: Role) => {
    setSelectedRole(role);
    setUserModalVisible(true);
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingRole) {
        // 更新角色
        const updatedRoles = roles.map(role =>
          role.id === editingRole.id
            ? {
                ...role,
                ...values,
                updatedAt: new Date().toISOString().split('T')[0],
              }
            : role
        );
        setRoles(updatedRoles);
        message.success('角色更新成功');
      } else {
        // 添加新角色
        const newRole = {
          id: roles.length + 1,
          ...values,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
        };
        setRoles([...roles, newRole]);
        message.success('角色添加成功');
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

  const handleUserModalCancel = () => {
    setUserModalVisible(false);
    setSelectedRole(null);
  };

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
    },
    {
      title: '角色名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
    },
    {
      title: '更新时间',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
    },
    {
      title: '操作',
      key: 'action',
      render: (_: any, record: Role) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditRole(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除"
            description="确定要删除这个角色吗？"
            onConfirm={() => handleDeleteRole(record.id)}
            okText="确认"
            cancelText="取消"
          >
            <Button type="link" danger icon={<DeleteOutlined />}>
              删除
            </Button>
          </Popconfirm>
          <Button
            type="link"
            icon={<UserSwitchOutlined />}
            onClick={() => handleManageUsers(record)}
          >
            用户管理
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.container}>
      <Card>
        <div className={styles.header}>
          <Typography.Title level={3}>角色管理</Typography.Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddRole}
          >
            添加角色
          </Button>
        </div>

        <Table
          columns={columns}
          dataSource={roles}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
          }}
        />
      </Card>

      <Modal
        title={editingRole ? '编辑角色' : '添加角色'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="角色名称"
            rules={[{ required: true, message: '请输入角色名称!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
            rules={[{ required: true, message: '请输入描述!' }]}
          >
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </Modal>

      <Modal
        title={`用户管理 - ${selectedRole?.name}`}
        open={userModalVisible}
        onCancel={handleUserModalCancel}
        footer={null}
        width={800}
      >
        <RoleUserManagement
          roleId={selectedRole?.id}
          roleName={selectedRole?.name}
        />
      </Modal>
    </div>
  );
};

// 角色用户管理组件
interface RoleUserManagementProps {
  roleId?: number;
  roleName?: string;
}

const RoleUserManagement: React.FC<RoleUserManagementProps> = ({
  roleId,
  roleName,
}) => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [availableUsers, setAvailableUsers] = useState<User[]>([]);

  // 模拟获取角色用户数据
  useEffect(() => {
    if (roleId) {
      fetchRoleUsers();
      fetchAvailableUsers();
    }
  }, [roleId]);

  const fetchRoleUsers = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));

      // 模拟数据
      const mockUsers: User[] = [
        {
          id: 1,
          name: '张三',
          email: 'zhangsan@example.com',
        },
        {
          id: 2,
          name: '李四',
          email: 'lisi@example.com',
        },
      ];

      setUsers(mockUsers);
    } catch (error) {
      message.error('获取角色用户数据失败');
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableUsers = async () => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));

      // 模拟数据
      const mockUsers: User[] = [
        {
          id: 3,
          name: '王五',
          email: 'wangwu@example.com',
        },
        {
          id: 4,
          name: '赵六',
          email: 'zhaoliu@example.com',
        },
      ];

      setAvailableUsers(mockUsers);
    } catch (error) {
      message.error('获取可分配用户数据失败');
    }
  };

  const handleAddUserToRole = async (userId: number) => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));

      const userToAdd = availableUsers.find(user => user.id === userId);
      if (userToAdd) {
        setUsers([...users, userToAdd]);
        setAvailableUsers(availableUsers.filter(user => user.id !== userId));
        message.success('用户添加成功');
      }
    } catch (error) {
      message.error('添加用户失败');
    }
  };

  const handleRemoveUserFromRole = async (userId: number) => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));

      const userToRemove = users.find(user => user.id === userId);
      if (userToRemove) {
        setUsers(users.filter(user => user.id !== userId));
        setAvailableUsers([...availableUsers, userToRemove]);
        message.success('用户移除成功');
      }
    } catch (error) {
      message.error('移除用户失败');
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 16 }}>
        <Typography.Title level={5}>已分配用户</Typography.Title>
      </div>
      <Table
        dataSource={users}
        loading={loading}
        rowKey="id"
        pagination={false}
        columns={[
          {
            title: '用户ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
          },
          {
            title: '操作',
            key: 'action',
            render: (_: any, record: User) => (
              <Button
                type="link"
                danger
                onClick={() => handleRemoveUserFromRole(record.id)}
              >
                移除
              </Button>
            ),
          },
        ]}
      />

      <div style={{ margin: '16px 0' }}>
        <Typography.Title level={5}>可分配用户</Typography.Title>
      </div>
      <Table
        dataSource={availableUsers}
        loading={loading}
        rowKey="id"
        pagination={false}
        columns={[
          {
            title: '用户ID',
            dataIndex: 'id',
            key: 'id',
          },
          {
            title: '用户名',
            dataIndex: 'name',
            key: 'name',
          },
          {
            title: '邮箱',
            dataIndex: 'email',
            key: 'email',
          },
          {
            title: '操作',
            key: 'action',
            render: (_: any, record: User) => (
              <Button
                type="link"
                onClick={() => handleAddUserToRole(record.id)}
              >
                添加
              </Button>
            ),
          },
        ]}
      />
    </div>
  );
};

export default RoleManagement;
