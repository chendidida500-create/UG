import type { TableConfig } from '@/components/DynamicTable';
import DynamicTable from '@/components/DynamicTable';
import type { FormConfig } from '@/types';
import { useModel } from '@/utils/umiMock';
import {
  ApiOutlined,
  ControlOutlined,
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  FileOutlined,
  FolderOutlined,
  MenuOutlined,
  MoreOutlined,
  PlusOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Dropdown,
  Input,
  message,
  Modal,
  Row,
  Space,
  Statistic,
  Switch,
  Tag,
  Tree,
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.less';

const { Text } = Typography;
const { Search } = Input;

interface Permission {
  id: string;
  name: string;
  code: string;
  type: 'menu' | 'button' | 'api';
  parentId?: string;
  path?: string;
  component?: string;
  icon?: string;
  sort: number;
  status: 'active' | 'inactive';
  description?: string;
  children?: Permission[];
  createdAt: string;
  updatedAt: string;
}

const PermissionManagement: React.FC = () => {
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [treeData, setTreeData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [currentView, setCurrentView] = useState<'tree' | 'table'>('tree');
  const [stats, setStats] = useState({
    total: 0,
    menu: 0,
    button: 0,
    api: 0,
  });

  const permissionModel = useModel('permission');
  const {
    getPermissionList,
    createPermission,
    updatePermission,
    deletePermission,
    batchDeletePermissions,
    updatePermissionStatus,
  } = permissionModel || {};
  const accessModel = useModel('access');
  const { hasPermission } = accessModel || {};

  // 表格配置
  const tableConfig: TableConfig = {
    columns: [
      {
        title: '权限信息',
        dataIndex: 'permissionInfo',
        key: 'permissionInfo',
        width: 250,
        render: (_: any, record: Permission) => (
          <Space>
            {getPermissionIcon(record.type)}
            <div>
              <div className={styles.permissionName}>{record.name}</div>
              <Text type="secondary" className={styles.permissionCode}>
                {record.code}
              </Text>
            </div>
          </Space>
        ),
      },
      {
        title: '类型',
        dataIndex: 'type',
        key: 'type',
        width: 100,
        render: (type: string) => {
          const typeConfig = {
            menu: { color: 'blue', text: '菜单', icon: <MenuOutlined /> },
            button: { color: 'green', text: '按钮', icon: <ControlOutlined /> },
            api: { color: 'orange', text: 'API', icon: <ApiOutlined /> },
          };
          const config = typeConfig[type as keyof typeof typeConfig];

          return (
            <Tag color={config.color} icon={config.icon}>
              {config.text}
            </Tag>
          );
        },
      },
      {
        title: '路径/组件',
        dataIndex: 'path',
        key: 'path',
        width: 200,
        ellipsis: true,
        render: (path: string, record: Permission) => {
          if (record.type === 'menu') {
            return (
              <div>
                <div>路径: {path || '-'}</div>
                <Text type="secondary" style={{ fontSize: '12px' }}>
                  组件: {record.component || '-'}
                </Text>
              </div>
            );
          }
          return path || '-';
        },
      },
      {
        title: '排序',
        dataIndex: 'sort',
        key: 'sort',
        width: 80,
        sorter: (a: Permission, b: Permission) => a.sort - b.sort,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (status: string) => {
          const statusConfig = {
            active: { color: 'success', text: '启用' },
            inactive: { color: 'default', text: '禁用' },
          };
          const config = statusConfig[status as keyof typeof statusConfig];

          return <Tag color={config.color}>{config.text}</Tag>;
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 150,
        render: (time: string) => new Date(time).toLocaleString(),
      },
      {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
        width: 150,
        fixed: 'right',
        render: (_: any, record: Permission) => {
          const moreMenuItems = [
            {
              key: 'addChild',
              icon: <PlusOutlined />,
              label: '添加子权限',
              disabled:
                !hasPermission?.('system:permission:create') ||
                record.type !== 'menu',
            },
            {
              key: 'copy',
              icon: <SafetyCertificateOutlined />,
              label: '复制权限',
              disabled: !hasPermission?.('system:permission:create'),
            },
            {
              type: 'divider',
            },
            {
              key: 'delete',
              icon: <DeleteOutlined />,
              label: '删除权限',
              danger: true,
              disabled:
                !hasPermission?.('system:permission:delete') ||
                (record.children && record.children.length > 0),
            },
          ];

          return (
            <Space>
              <Button
                type="link"
                size="small"
                icon={<EditOutlined />}
                disabled={!hasPermission?.('system:permission:update')}
              >
                编辑
              </Button>
              <Switch
                size="small"
                checked={record.status === 'active'}
                onChange={(checked: boolean) =>
                  handleStatusChange(record.id, checked)
                }
                disabled={!hasPermission?.('system:permission:status')}
              />
              <Dropdown
                menu={{
                  items: moreMenuItems,
                  onClick: ({ key }: { key: string }) =>
                    handleMoreAction(key, record),
                }}
              >
                <Button type="text" size="small" icon={<MoreOutlined />} />
              </Dropdown>
            </Space>
          );
        },
      },
    ],
    rowKey: 'id',
    size: 'middle',
    bordered: true,
    scroll: { x: 1200 },
    pagination: {
      pageSize: 10,
      showSizeChanger: true,
      showQuickJumper: true,
    },
    rowSelection:
      hasPermission && hasPermission('system:permission:batch_delete')
        ? {
            selectedRowKeys,
            onChange: (selectedKeys: React.Key[]) =>
              setSelectedRowKeys(selectedKeys as string[]),
            getCheckboxProps: (record: Permission) => ({
              disabled: record.children && record.children.length > 0, // 有子权限的不能删除
            }),
          }
        : undefined,
  };

  // 表单配置
  const formConfig: FormConfig = {
    layout: 'vertical',
    fields: [
      {
        key: 'parentId',
        name: 'parentId',
        label: '父级权限',
        type: 'tree-select',
        props: {
          placeholder: '请选择父级权限（可选）',
          allowClear: true,
          treeData: buildTreeSelectData(permissions),
        },
      },
      {
        key: 'name', // 添加key属性
        name: 'name',
        label: '权限名称',
        type: 'input',
        required: true,
        rules: [
          { required: true, message: '请输入权限名称' },
          { min: 2, max: 20, message: '权限名称长度为2-20个字符' },
        ],
        props: {
          placeholder: '请输入权限名称',
        },
      },
      {
        key: 'code', // 添加key属性
        name: 'code',
        label: '权限编码',
        type: 'input',
        required: true,
        rules: [
          { required: true, message: '请输入权限编码' },
          {
            pattern: /^[a-z:_]+$/,
            message: '权限编码只能包含小写字母、冒号和下划线',
          },
        ],
        props: {
          placeholder: '请输入权限编码，如：system:user:view',
        },
      },
      {
        key: 'type', // 添加key属性
        name: 'type',
        label: '权限类型',
        type: 'select',
        required: true,
        rules: [{ required: true, message: '请选择权限类型' }],
        props: {
          placeholder: '请选择权限类型',
          options: [
            { label: '菜单', value: 'menu' },
            { label: '按钮', value: 'button' },
            { label: 'API', value: 'api' },
          ],
        },
      },
      {
        key: 'path', // 添加key属性
        name: 'path',
        label: '路径',
        type: 'input',
        props: {
          placeholder: '请输入路径，如：/system/users',
        },
        dependencies: ['type'],
        visible: (values: any) =>
          values.type === 'menu' || values.type === 'api',
      },
      {
        key: 'component', // 添加key属性
        name: 'component',
        label: '组件',
        type: 'input',
        props: {
          placeholder: '请输入组件路径，如：@/pages/System/User',
        },
        dependencies: ['type'],
        visible: (values: any) => values.type === 'menu',
      },
      {
        key: 'icon', // 添加key属性
        name: 'icon',
        label: '图标',
        type: 'input',
        props: {
          placeholder: '请输入图标名称，如：UserOutlined',
        },
        dependencies: ['type'],
        visible: (values: any) => values.type === 'menu',
      },
      {
        key: 'sort', // 添加key属性
        name: 'sort',
        label: '排序',
        type: 'number',
        props: {
          placeholder: '请输入排序值',
          min: 0,
        },
      },
      {
        key: 'status', // 添加key属性
        name: 'status',
        label: '状态',
        type: 'select',
        required: true,
        props: {
          placeholder: '请选择状态',
          options: [
            { label: '启用', value: 'active' },
            { label: '禁用', value: 'inactive' },
          ],
        },
      },
      {
        key: 'description', // 添加key属性
        name: 'description',
        label: '描述',
        type: 'textarea',
        props: {
          placeholder: '请输入权限描述',
          rows: 3,
        },
      },
    ],
  };

  // 获取权限类型图标
  function getPermissionIcon(type: string) {
    const iconMap = {
      menu: <FolderOutlined style={{ color: '#1890ff' }} />,
      button: <ControlOutlined style={{ color: '#52c41a' }} />,
      api: <ApiOutlined style={{ color: '#fa8c16' }} />,
    };
    return iconMap[type as keyof typeof iconMap] || <FileOutlined />;
  }

  // 构建树形选择器数据
  function buildTreeSelectData(permissions: Permission[]): any[] {
    return permissions
      .filter(p => p.type === 'menu') // 只有菜单类型可以作为父级
      .map(permission => ({
        title: permission.name,
        value: permission.id,
        children: permission.children
          ? buildTreeSelectData(permission.children)
          : undefined,
      }));
  }

  // 构建树形数据
  const buildTreeData = (
    permissions: Permission[],
    searchValue?: string
  ): any[] => {
    const filterBySearch = (items: Permission[]): Permission[] => {
      if (!searchValue) return items;

      return items.filter(item => {
        const matchesCurrent =
          item.name.toLowerCase().includes(searchValue.toLowerCase()) ||
          item.code.toLowerCase().includes(searchValue.toLowerCase());

        const hasMatchingChildren =
          item.children && filterBySearch(item.children).length > 0;

        return matchesCurrent || hasMatchingChildren;
      });
    };

    const filteredPermissions = filterBySearch(permissions);

    return filteredPermissions.map(permission => ({
      title: (
        <div className={styles.treeNodeTitle}>
          <Space>
            {getPermissionIcon(permission.type)}
            <span className={styles.permissionName}>{permission.name}</span>
            <Tag size="small">{permission.code}</Tag>
            <Switch
              size="small"
              checked={permission.status === 'active'}
              onChange={(checked: any) =>
                handleStatusChange(permission.id, checked)
              }
            />
          </Space>
        </div>
      ),
      key: permission.id,
      children: permission.children
        ? buildTreeData(permission.children, searchValue)
        : undefined,
    }));
  };

  // 加载权限列表
  const loadPermissions = async () => {
    setLoading(true);
    try {
      const result = await getPermissionList?.();
      if (result?.data) {
        // 确保数据是正确的格式
        const permissionData = Array.isArray(result.data)
          ? result.data
          : result.data.list || [];
        setPermissions(permissionData);
        setTreeData(buildTreeData(permissionData, searchValue));
        updateStats(permissionData);

        // 默认展开所有节点
        const allKeys = getAllKeys(permissionData);
        setExpandedKeys(allKeys);
      }
    } catch (error: any) {
      message.error(error.message || '加载权限列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 获取所有节点的key
  const getAllKeys = (permissions: Permission[]): string[] => {
    const keys: string[] = [];
    permissions.forEach(permission => {
      keys.push(permission.id);
      if (permission.children) {
        keys.push(...getAllKeys(permission.children));
      }
    });
    return keys;
  };

  // 更新统计信息
  const updateStats = (data: Permission[]) => {
    const flatData = flattenPermissions(data);
    const stats = {
      total: flatData.length,
      menu: flatData.filter(p => p.type === 'menu').length,
      button: flatData.filter(p => p.type === 'button').length,
      api: flatData.filter(p => p.type === 'api').length,
    };
    setStats(stats);
  };

  // 扁平化权限数据
  const flattenPermissions = (permissions: Permission[]): Permission[] => {
    const result: Permission[] = [];
    permissions.forEach(permission => {
      result.push(permission);
      if (permission.children) {
        result.push(...flattenPermissions(permission.children));
      }
    });
    return result;
  };

  // 状态切换
  const handleStatusChange = async (id: string, active: boolean) => {
    try {
      // 检查函数是否存在再调用
      if (updatePermissionStatus) {
        await updatePermissionStatus(id, active ? 'active' : 'inactive');
      }
      message.success('状态更新成功');
      loadPermissions();
    } catch (error: any) {
      message.error(error.message || '状态更新失败');
    }
  };

  // 更多操作
  const handleMoreAction = async (action: string, record: Permission) => {
    switch (action) {
      case 'addChild':
        // 实现添加子权限逻辑
        message.info('添加子权限功能开发中');
        break;
      case 'copy':
        // 实现复制权限逻辑
        message.info('复制权限功能开发中');
        break;
      case 'delete':
        Modal.confirm({
          title: '删除权限',
          content: `确定要删除权限"${record.name}"吗？此操作不可恢复。`,
          okText: '删除',
          okType: 'danger',
          onOk: async () => {
            try {
              // 检查函数是否存在再调用
              if (deletePermission) {
                await deletePermission(record.id);
              }
              message.success('删除成功');
              loadPermissions();
            } catch (error: any) {
              message.error(error.message || '删除失败');
            }
          },
        });
        break;
    }
  };

  // 搜索处理
  const handleSearch = (value: string) => {
    setSearchValue(value);
    setTreeData(buildTreeData(permissions, value));
  };

  useEffect(() => {
    loadPermissions();
  }, []);

  return (
    <div className={styles.container}>
      {/* 统计卡片 */}
      <Row gutter={16} className={styles.statsRow}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总权限数"
              value={stats.total}
              valueStyle={{ color: '#1890ff' }}
              prefix={<SafetyCertificateOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="菜单权限"
              value={stats.menu}
              valueStyle={{ color: '#52c41a' }}
              prefix={<MenuOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="按钮权限"
              value={stats.button}
              valueStyle={{ color: '#faad14' }}
              prefix={<ControlOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="API权限"
              value={stats.api}
              valueStyle={{ color: '#722ed1' }}
              prefix={<ApiOutlined />}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card className={styles.mainCard}>
        <div className={styles.toolbar}>
          <Space className={styles.toolbarLeft}>
            <Button.Group>
              <Button
                type={currentView === 'tree' ? 'primary' : 'default'}
                onClick={() => setCurrentView('tree')}
              >
                树形视图
              </Button>
              <Button
                type={currentView === 'table' ? 'primary' : 'default'}
                onClick={() => setCurrentView('table')}
              >
                表格视图
              </Button>
            </Button.Group>
            <Search
              placeholder="搜索权限名称或编码"
              allowClear
              style={{ width: 300 }}
              onSearch={handleSearch}
            />
          </Space>
          <Space>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              disabled={!hasPermission?.('system:permission:create')}
            >
              新增权限
            </Button>
            <Button
              icon={<ExportOutlined />}
              disabled={!hasPermission?.('system:permission:export')}
            >
              导出
            </Button>
            <Button icon={<ReloadOutlined />} onClick={() => loadPermissions()}>
              刷新
            </Button>
          </Space>
        </div>

        {currentView === 'tree' ? (
          <div className={styles.treeContainer}>
            <Tree
              showLine
              blockNode
              treeData={treeData}
              expandedKeys={expandedKeys}
              onExpand={setExpandedKeys}
              height={600}
            />
          </div>
        ) : (
          <DynamicTable
            config={tableConfig}
            dataSource={flattenPermissions(permissions)}
            loading={loading}
          />
        )}
      </Card>
    </div>
  );
};

export default PermissionManagement;
