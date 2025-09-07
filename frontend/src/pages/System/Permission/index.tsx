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
      if (item.parentId && map[item.parentId]) {
        map[item.parentId].children?.push(node);
      } else {
        roots.push(node);
      }
    });

    return roots;
  };

  // 渲染权限树节点
  const renderTreeNodes = (data: DataNode[]) => {
    return data.map(item => {
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
        result = await updatePermission?.({
          id: currentRecord.id,
          ...values,
        });
      }

      if (result?.success) {
        message.success(modalMode === 'create' ? '创建成功' : '更新成功');
        setModalVisible(false);
        form.resetFields();
        loadPermissions();
      } else {
        message.error(result?.message || (modalMode === 'create' ? '创建失败' : '更新失败'));
      }
    } catch (error: any) {
      message.error(error.message || (modalMode === 'create' ? '创建失败' : '更新失败'));
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
        const typeInfo = typeMap[type] || { text: type, color: 'default' };
        return <Tag color={typeInfo.color}>{typeInfo.text}</Tag>;
      },
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      render: (status: 'active' | 'inactive') => (
        <Switch
          checked={status === 'active'}
          checkedChildren="启用"
          unCheckedChildren="禁用"
          disabled
        />
      ),
    },
    {
      title: '排序',
      dataIndex: 'sort',
      key: 'sort',
    },
    {
      title: '操作',
      key: 'action',
      width: 200,
      render: (_text: any, record: Permission) => (
        <Space size="middle">
          <Button
            type="link"
            icon={<EyeOutlined />}
            onClick={() => handleView(record)}
          >
            查看
          </Button>
          <Button
            type="link"
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
            <Button type="link" icon={<DeleteOutlined />} danger>
              删除
            </Button>
          </Popconfirm>
        </Space>
      ),
    },
  ];

  const permissionTree = buildPermissionTree(permissions);

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
          <Tree
            className={styles.tree}
            showLine
            showIcon
            expandedKeys={expandedKeys}
            selectedKeys={selectedKeys}
            onExpand={onExpand}
            onSelect={onSelect}
            autoExpandParent={autoExpandParent}
            treeData={permissionTree}
          >
            {renderTreeNodes(permissionTree)}
          </Tree>

          <Table
            className={styles.table}
            columns={columns}
            dataSource={permissions}
            rowKey="id"
            loading={loading}
            pagination={false}
          />
        </div>
      </Card>

      <Modal
        title={modalMode === 'create' ? '新建权限' : modalMode === 'edit' ? '编辑权限' : '查看权限'}
        open={modalVisible}
        onCancel={() => {
          setModalVisible(false);
          form.resetFields();
        }}
        onOk={() => form.submit()}
        okText={modalMode === 'view' ? '关闭' : '确定'}
        cancelText="取消"
        okButtonProps={modalMode === 'view' ? { style: { display: 'none' } } : {}}
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

          <Form.Item
            name="parentId"
            label="上级权限"
          >
            <Select
              placeholder="请选择上级权限"
              allowClear
            >
              {permissions
                .filter(item => item.type === 'menu')
                .map(item => (
                  <Select.Option key={item.id} value={item.id}>
                    {item.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <Form.Item
            name="path"
            label="路由路径"
          >
            <Input placeholder="请输入路由路径" />
          </Form.Item>

          <Form.Item
            name="component"
            label="组件路径"
          >
            <Input placeholder="请输入组件路径" />
          </Form.Item>

          <Form.Item
            name="icon"
            label="图标"
          >
            <Input placeholder="请输入图标名称" />
          </Form.Item>

          <Form.Item
            name="sort"
            label="排序"
            initialValue={0}
          >
            <Input type="number" placeholder="请输入排序值" />
          </Form.Item>

          <Form.Item
            name="status"
            label="状态"
            initialValue="active"
            valuePropName="checked"
          >
            <Switch checkedChildren="启用" unCheckedChildren="禁用" />
          </Form.Item>

          <Form.Item
            name="description"
            label="描述"
          >
            <Input.TextArea placeholder="请输入描述" rows={3} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default PermissionManagement;