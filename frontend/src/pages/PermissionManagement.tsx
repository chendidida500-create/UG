import React, { useState, useEffect } from 'react';
import {
  Table,
  Button,
  Space,
  Tag,
  Modal,
  Form,
  Input,
  message,
  Card,
  Typography,
  Popconfirm,
  Tree,
  Select,
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ApartmentOutlined,
} from '@ant-design/icons';
import styles from './PermissionManagement.module.css';

const { Title } = Typography;
const { Option } = Select;

// 权限数据类型
interface Permission {
  id: number;
  name: string;
  code: string;
  description: string;
  type: 'menu' | 'button' | 'api';
  parentId: number | null;
  createdAt: string;
  updatedAt: string;
}

const PermissionManagement: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [editingPermission, setEditingPermission] = useState<Permission | null>(
    null
  );
  const [form] = Form.useForm();
  const [treeData, setTreeData] = useState<any[]>([]);

  // 模拟获取权限数据
  useEffect(() => {
    fetchPermissions();
  }, []);

  const fetchPermissions = async () => {
    setLoading(true);
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 500));

      // 模拟数据
      const mockPermissions: Permission[] = [
        {
          id: 1,
          name: '系统管理',
          code: 'system',
          description: '系统管理模块',
          type: 'menu',
          parentId: null,
          createdAt: '2023-01-15',
          updatedAt: '2023-01-15',
        },
        {
          id: 2,
          name: '用户管理',
          code: 'system:user',
          description: '用户管理功能',
          type: 'menu',
          parentId: 1,
          createdAt: '2023-01-15',
          updatedAt: '2023-01-15',
        },
        {
          id: 3,
          name: '添加用户',
          code: 'system:user:add',
          description: '添加用户按钮',
          type: 'button',
          parentId: 2,
          createdAt: '2023-01-15',
          updatedAt: '2023-01-15',
        },
        {
          id: 4,
          name: '编辑用户',
          code: 'system:user:edit',
          description: '编辑用户按钮',
          type: 'button',
          parentId: 2,
          createdAt: '2023-01-15',
          updatedAt: '2023-01-15',
        },
        {
          id: 5,
          name: '角色管理',
          code: 'system:role',
          description: '角色管理功能',
          type: 'menu',
          parentId: 1,
          createdAt: '2023-01-15',
          updatedAt: '2023-01-15',
        },
        {
          id: 6,
          name: '权限管理',
          code: 'system:permission',
          description: '权限管理功能',
          type: 'menu',
          parentId: 1,
          createdAt: '2023-01-15',
          updatedAt: '2023-01-15',
        },
      ];

      setPermissions(mockPermissions);
      generateTreeData(mockPermissions);
    } catch (error) {
      message.error('获取权限数据失败');
    } finally {
      setLoading(false);
    }
  };

  const generateTreeData = (perms: Permission[]) => {
    // 将权限数据转换为树形结构
    const rootPermissions = perms.filter(p => p.parentId === null);
    const tree = rootPermissions.map(permission =>
      buildTree(permission, perms)
    );
    setTreeData(tree);
  };

  const buildTree = (permission: Permission, allPermissions: Permission[]) => {
    const children = allPermissions.filter(p => p.parentId === permission.id);
    const node: any = {
      title: permission.name,
      key: permission.id,
      ...permission,
    };

    if (children.length > 0) {
      node.children = children.map(child => buildTree(child, allPermissions));
    }

    return node;
  };

  const handleAddPermission = () => {
    setEditingPermission(null);
    form.resetFields();
    setModalVisible(true);
  };

  const handleEditPermission = (permission: Permission) => {
    setEditingPermission(permission);
    form.setFieldsValue(permission);
    setModalVisible(true);
  };

  const handleDeletePermission = async (permissionId: number) => {
    try {
      // 模拟API调用
      await new Promise(resolve => setTimeout(resolve, 300));
      const updatedPermissions = permissions.filter((p: Permission) => p.id !== permissionId);
      setPermissions(updatedPermissions);
      generateTreeData(updatedPermissions);
      message.success('权限删除成功');
    } catch (error) {
      message.error('删除权限失败');
    }
  };

  const handleModalOk = async () => {
    try {
      const values = await form.validateFields();

      if (editingPermission) {
        // 更新权限
        const updatedPermissions = permissions.map((permission: Permission) =>
          permission.id === editingPermission.id
            ? {
                ...permission,
                ...values,
                updatedAt: new Date().toISOString().split('T')[0],
              }
            : permission
        );
        setPermissions(updatedPermissions);
        generateTreeData(updatedPermissions);
        message.success('权限更新成功');
      } else {
        // 添加新权限
        const newPermission = {
          id:
            permissions.length > 0
              ? Math.max(...permissions.map((p: Permission) => p.id)) + 1
              : 1,
          ...values,
          createdAt: new Date().toISOString().split('T')[0],
          updatedAt: new Date().toISOString().split('T')[0],
        };
        const updatedPermissions = [...permissions, newPermission];
        setPermissions(updatedPermissions);
        generateTreeData(updatedPermissions);
        message.success('权限添加成功');
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

  const getTypeTag = (type: string) => {
    switch (type) {
      case 'menu':
        return <Tag color="blue">菜单</Tag>;
      case 'button':
        return <Tag color="green">按钮</Tag>;
      case 'api':
        return <Tag color="orange">接口</Tag>;
      default:
        return <Tag>{type}</Tag>;
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
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '权限代码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '描述',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => getTypeTag(type),
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
      render: (_: any, record: Permission) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EditOutlined />}
            onClick={() => handleEditPermission(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确认删除"
            description="确定要删除这个权限吗？"
            onConfirm={() => handleDeletePermission(record.id)}
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
      <Card>
        <div className={styles.header}>
          <Typography.Title level={3}>权限管理</Typography.Title>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={handleAddPermission}
          >
            添加权限
          </Button>
        </div>

        <div style={{ margin: '16px 0' }}>
          <Typography.Title level={5}>权限树形结构</Typography.Title>
        </div>
        <div className={styles.treeContainer}>
          <Tree
            treeData={treeData}
            defaultExpandAll
            fieldNames={{ title: 'name', key: 'id' }}
          />
        </div>

        <div style={{ margin: '16px 0' }}>
          <Typography.Title level={5}>权限列表</Typography.Title>
        </div>
        <Table
          columns={columns}
          dataSource={permissions}
          loading={loading}
          rowKey="id"
          pagination={{
            pageSize: 10,
          }}
        />
      </Card>

      <Modal
        title={editingPermission ? '编辑权限' : '添加权限'}
        open={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="确认"
        cancelText="取消"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="权限名称"
            rules={[{ required: true, message: '请输入权限名称!' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="code"
            label="权限代码"
            rules={[{ required: true, message: '请输入权限代码!' }]}
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

          <Form.Item
            name="type"
            label="类型"
            rules={[{ required: true, message: '请选择类型!' }]}
          >
            <Select>
              <Option value="menu">菜单</Option>
              <Option value="button">按钮</Option>
              <Option value="api">接口</Option>
            </Select>
          </Form.Item>

          <Form.Item name="parentId" label="父级权限">
            <Select allowClear>
              {permissions.map((permission: Permission) => (
                <Option key={permission.id} value={permission.id}>
                  {permission.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PermissionManagement;
