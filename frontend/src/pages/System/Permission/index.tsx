import type { Permission } from '@/types';
import { useModel } from '@/utils/umiMock';
import {
  DeleteOutlined,
  EditOutlined,
  EyeOutlined,
  PlusOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Form,
  Input,
  message,
  Modal,
  Popconfirm,
  Select,
  Space,
  Switch,
  Table,
  Tag,
  Tree,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import type { DataNode } from 'antd/es/tree';
import { useEffect, useState } from 'react';
import styles from './index.module.less';

const { TreeNode } = Tree;

const PermissionManagement: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>(
    'create'
  );
  const [currentRecord, setCurrentRecord] = useState<Permission | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [form] = Form.useForm();

  const permissionModel = useModel('permission');
  const {
    getPermissionList,
    createPermission,
    updatePermission,
    deletePermission,
  } = permissionModel;

  // 加载权限列表，从权限模型获取数据
  const loadPermissions = async () => {
    setLoading(true);
    try {
      const result = await getPermissionList?.();
      if (result?.success) {
        setPermissions(result.data);
        // 展开所有节点
        setExpandedKeys(result.data.map((item: Permission) => item.id));
      }
    } catch (error: any) {
      message.error(error.message || '加载权限列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 构建权限树
  const buildPermissionTree = (data: Permission[]): DataNode[] => {
    const map: Record<string, DataNode> = {};
    const roots: DataNode[] = [];

    // 创建节点映射
    data.forEach(item => {
      map[item.id] = {
        key: item.id,
        title: item.name,
        ...item,
        children: [],
      };
    });

    // 构建树结构
    data.forEach(item => {
      const node = map[item.id];
      // 修复属性名称：parentId -> parent_id，并添加类型检查
      if (item.parent_id && map[item.parent_id]) {
        // 添加类型检查以避免undefined错误
        const parentNode = map[item.parent_id];
        if (parentNode && node) {
          parentNode.children = parentNode.children || [];
          parentNode.children.push(node);
        }
      } else {
        // 添加类型检查以避免undefined错误
        if (node) {
          roots.push(node);
        }
      }
    });

    return roots;
  };

  // 渲染权限树节点
  const renderTreeNodes = (data: DataNode[]) => {
    return data.map(item => {
      // 添加类型检查以避免undefined错误
      if (item.children && item.children.length > 0) {
        return (
          <TreeNode title={item.title} key={item.key} dataRef={item}>
            {renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.title} key={item.key} dataRef={item} />;
    });
  };

  // 处理表单提交
  const handleFinish = async (values: any) => {
    try {
      let result;
      if (modalMode === 'create') {
        result = await createPermission?.(values);
      } else if (modalMode === 'edit' && currentRecord) {
        // 修复参数传递，需要传递id和data两个参数
        result = await updatePermission?.(currentRecord.id, values);
      }

      if (result?.success) {
        message.success(modalMode === 'create' ? '创建成功' : '更新成功');
        setModalVisible(false);
        form.resetFields();
        loadPermissions();
      } else {
        message.error(
          result?.message || (modalMode === 'create' ? '创建失败' : '更新失败')
        );
      }
    } catch (error: any) {
      message.error(
        error.message || (modalMode === 'create' ? '创建失败' : '更新失败')
      );
    }
  };

  // 处理删除权限
  const handleDelete = async (id: string) => {
    try {
      const result = await deletePermission?.(id);
      if (result?.success) {
        message.success('删除成功');
        loadPermissions();
      } else {
        message.error(result?.message || '删除失败');
      }
    } catch (error: any) {
      message.error(error.message || '删除失败');
    }
  };

  // 处理查看权限
  const handleView = (record: Permission) => {
    setModalMode('view');
    setCurrentRecord(record);
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  // 处理编辑权限
  const handleEdit = (record: Permission) => {
    setModalMode('edit');
    setCurrentRecord(record);
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  // 处理创建权限
  const handleCreate = () => {
    setModalMode('create');
    setCurrentRecord(null);
    setModalVisible(true);
    form.resetFields();
  };

  // 处理树节点展开
  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  // 处理树节点选择
  const onSelect = (selectedKeysValue: React.Key[]) => {
    setSelectedKeys(selectedKeysValue);
  };

  useEffect(() => {
    loadPermissions();
  }, []);

  // 表格列配置
  const columns: ColumnsType<Permission> = [
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
      render: (text: string, record: Permission) => (
        <Space>
          {record.icon && <span className="anticon">{record.icon}</span>}
          <span>{text}</span>
        </Space>
      ),
    },
    {
      title: '权限代码',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: '权限类型',
      dataIndex: 'type',
      key: 'type',
      render: (type: string) => {
        const typeMap: Record<string, { text: string; color: string }> = {
          menu: { text: '菜单', color: 'blue' },
          button: { text: '按钮', color: 'green' },
          api: { text: '接口', color: 'orange' },
        };
        const config = typeMap[type] || { text: type, color: 'default' };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: number) => (
        <Tag color={status === 1 ? 'success' : 'error'}>
          {status === 1 ? '启用' : '禁用'}
        </Tag>
      ),
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
      sorter: (a: Permission, b: Permission) => a.sort - b.sort,
    },
    {
      title: '创建时间',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (time: string) => new Date(time).toLocaleString(),
    },
    {
      title: '操作',
      key: 'actions',
      fixed: 'right',
      width: 150,
      render: (_: any, record: Permission) => (
        <Space>
          <Button
            type="link"
            size="small"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            查看
          </Button>
          <Button
            type="link"
            size="small"
            icon={<EditOutlined />}
            onClick={() => handleEdit(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定要删除这个权限吗？"
            onConfirm={() => handleDelete(record.id)}
            okText="确定"
            cancelText="取消"
          >
            <Button type="link" size="small" icon={<DeleteOutlined />} danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div className={styles.permissionManagement}>
      <Card
        title="权限管理"
        extra={
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            新建权限
          </Button>
        }
      >
        <div className={styles.treeContainer}>
          <Tree
            className={styles.permissionTree}
            showLine
            switcherIcon={<div />}
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            autoExpandParent={autoExpandParent}
            onExpand={onExpand}
            onSelect={onSelect}
            treeData={buildPermissionTree(permissions)}
          />
        </div>

        <Table
          className={styles.permissionTable}
          columns={columns}
          dataSource={permissions}
          loading={loading}
          pagination={false}
          rowKey="id"
          scroll={{ x: 'max-content' }}
        />
      </Card>

      <Modal
        title={
          modalMode === 'create'
            ? '新建权限'
            : modalMode === 'edit'
              ? '编辑权限'
              : '查看权限'
        }
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText={
          modalMode === 'create'
            ? '创建'
            : modalMode === 'edit'
              ? '保存'
              : '关闭'
        }
        cancelText="取消"
        okButtonProps={{ disabled: modalMode === 'view' }}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleFinish}
          disabled={modalMode === 'view'}
        >
          <Form.Item
            name="name"
            label="权限名称"
            rules={[{ required: true, message: '请输入权限名称' }]}
          >
            <Input placeholder="请输入权限名称" />
          </Form.Item>

          <Form.Item
            name="code"
            label="权限代码"
            rules={[{ required: true, message: '请输入权限代码' }]}
          >
            <Input placeholder="请输入权限代码" />
          </Form.Item>

          <Form.Item
            name="type"
            label="权限类型"
            rules={[{ required: true, message: '请选择权限类型' }]}
          >
            <Select placeholder="请选择权限类型">
              <Select.Option value="menu">菜单</Select.Option>
              <Select.Option value="button">按钮</Select.Option>
              <Select.Option value="api">接口</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item name="parentId" label="父级权限">
            <Select placeholder="请选择父级权限" allowClear>
              {permissions.map(permission => (
                <Select.Option key={permission.id} value={permission.id}>
                  {permission.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item name="icon" label="图标">
            <Input placeholder="请输入图标代码" />
          </Form.Item>

          <Form.Item
            name="sort"
            label="排序"
            rules={[{ required: true, message: '请输入排序值' }]}
          >
            <Input type="number" placeholder="请输入排序值" />
          </Form.Item>

          <Form.Item name="status" label="状态" valuePropName="checked">
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>

          <Form.Item name="description" label="描述">
            <Input.TextArea placeholder="请输入描述" rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PermissionManagement;
