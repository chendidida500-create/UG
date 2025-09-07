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
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [currentRecord, setCurrentRecord] = useState<Permission | null>(null);
  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([]);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState(true);
  const [form] = Form.useForm();

  const permissionModel = useModel('permission');
  const { getPermissionList, createPermission, updatePermission, deletePermission } = permissionModel;

  // 加载权限列表
  const loadPermissions = async () => {
    setLoading(true);
    try {
      const result = await getPermissionList?.();
      if (result?.data) {
        setPermissions(result.data);
        // 默认展开所有节点
        setExpandedKeys(result.data.map(item => item.id));
      }
    } catch (error: any) {
      message.error(error.message || '加载权限列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 构建树形数据
  const buildTreeData = (data: Permission[]): DataNode[] => {
    const map: Record<string, DataNode & { children?: DataNode[] }> = {};
    const roots: DataNode[] = [];

    // 创建映射
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
      if (item.parent_id && map[item.parent_id]) {
        map[item.parent_id].children?.push(map[item.id]);
      } else {
        roots.push(map[item.id]);
      }
    });

    return roots;
  };

  // 表格列配置
  const columns: ColumnsType<Permission> = [
    {
      title: '权限名称',
      dataIndex: 'name',
      key: 'name',
      width: 200,
    },
    {
      title: '权限编码',
      dataIndex: 'code',
      key: 'code',
      width: 200,
    },
    {
      title: '权限类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
      render: (type: string) => {
        const typeConfig = {
          menu: { color: 'blue', text: '菜单' },
          button: { color: 'green', text: '按钮' },
          api: { color: 'purple', text: '接口' },
        };
        const config = typeConfig[type as keyof typeof typeConfig] || {
          color: 'default',
          text: '未知',
        };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: number) => {
        const statusConfig = {
          1: { color: 'success', text: '正常' },
          0: { color: 'default', text: '禁用' },
        };
        const config = statusConfig[status as keyof typeof statusConfig] || {
          color: 'default',
          text: '未知',
        };
        return <Tag color={config.color}>{config.text}</Tag>;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'created_at',
      key: 'created_at',
      width: 150,
      render: (time: string) => new Date(time).toLocaleString(),
    },
    {
      title: '操作',
      key: 'actions',
      width: 150,
      fixed: 'right',
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
            title="删除权限"
            description="确定要删除这个权限吗？"
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

  // 查看权限
  const handleView = (record: Permission) => {
    setCurrentRecord(record);
    setModalMode('view');
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  // 编辑权限
  const handleEdit = (record: Permission) => {
    setCurrentRecord(record);
    setModalMode('edit');
    setModalVisible(true);
    form.setFieldsValue(record);
  };

  // 新建权限
  const handleCreate = () => {
    setCurrentRecord(null);
    setModalMode('create');
    setModalVisible(true);
    form.resetFields();
  };

  // 删除权限
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

  // 提交表单
  const handleSubmit = async (values: any) => {
    try {
      let result;
      if (modalMode === 'create') {
        result = await createPermission?.(values);
      } else if (modalMode === 'edit' && currentRecord) {
        result = await updatePermission?.(currentRecord.id, values);
      }

      if (result?.success) {
        message.success(`${modalMode === 'create' ? '创建' : '更新'}成功`);
        setModalVisible(false);
        loadPermissions();
      } else {
        message.error(result?.message || `${modalMode === 'create' ? '创建' : '更新'}失败`);
      }
    } catch (error: any) {
      message.error(error.message || `${modalMode === 'create' ? '创建' : '更新'}失败`);
    }
  };

  // 树节点展开
  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  // 树节点选择
  const onSelect = (selectedKeysValue: React.Key[]) => {
    setSelectedKeys(selectedKeysValue);
  };

  useEffect(() => {
    loadPermissions();
  }, []);

  return (
    <div className={styles.container}>
      <Card className={styles.card}>
        <div className={styles.header}>
          <h2>权限管理</h2>
          <Button type="primary" icon={<PlusOutlined />} onClick={handleCreate}>
            新建权限
          </Button>
        </div>

        <div className={styles.content}>
          <div className={styles.treeSection}>
            <h3>权限树</h3>
            <Tree
              className={styles.tree}
              showLine
              switcherIcon={<div />}
              expandedKeys={expandedKeys}
              selectedKeys={selectedKeys}
              autoExpandParent={autoExpandParent}
              onExpand={onExpand}
              onSelect={onSelect}
              treeData={buildTreeData(permissions)}
            />
          </div>

          <div className={styles.tableSection}>
            <h3>权限列表</h3>
            <Table
              columns={columns}
              dataSource={permissions}
              loading={loading}
              rowKey="id"
              pagination={false}
              scroll={{ x: 1000 }}
            />
          </div>
        </div>
      </Card>

      <Modal
        title={`${modalMode === 'create' ? '新建' : modalMode === 'edit' ? '编辑' : '查看'}权限`}
        open={modalVisible}
        onCancel={() => setModalVisible(false)}
        footer={null}
        width={600}
      >
        <Form
          form={form}
          layout="vertical"
          onFinish={handleSubmit}
          disabled={modalMode === 'view'}
        >
          <Form.Item
            label="权限名称"
            name="name"
            rules={[{ required: true, message: '请输入权限名称' }]}
          >
            <Input placeholder="请输入权限名称" />
          </Form.Item>

          <Form.Item
            label="权限编码"
            name="code"
            rules={[{ required: true, message: '请输入权限编码' }]}
          >
            <Input placeholder="请输入权限编码" />
          </Form.Item>

          <Form.Item
            label="权限类型"
            name="type"
            rules={[{ required: true, message: '请选择权限类型' }]}
          >
            <Select placeholder="请选择权限类型">
              <Select.Option value="menu">菜单</Select.Option>
              <Select.Option value="button">按钮</Select.Option>
              <Select.Option value="api">接口</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="父级权限"
            name="parent_id"
          >
            <TreeSelect
              placeholder="请选择父级权限"
              treeData={buildTreeData(permissions)}
              treeDefaultExpandAll
              allowClear
            />
          </Form.Item>

          <Form.Item
            label="状态"
            name="status"
            initialValue={1}
          >
            <Switch
              checkedChildren="启用"
              unCheckedChildren="禁用"
              defaultChecked
            />
          </Form.Item>

          <Form.Item
            label="排序"
            name="sort"
            initialValue={0}
          >
            <InputNumber min={0} />
          </Form.Item>

          <Form.Item
            label="描述"
            name="description"
          >
            <TextArea placeholder="请输入描述" rows={3} />
          </Form.Item>

          {modalMode !== 'view' && (
            <Form.Item>
              <Space>
                <Button type="primary" htmlType="submit">
                  {modalMode === 'create' ? '创建' : '更新'}
                </Button>
                <Button htmlType="button" onClick={() => setModalVisible(false)}>
                  取消
                </Button>
              </Space>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default PermissionManagement;
