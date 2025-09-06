import CrudComponent from '@/components/CrudComponent';
import type { FormConfig } from '@/components/DynamicForm';
import type { PaginationParams, TableConfig } from '@/components/DynamicTable';
import { useModel } from '@/utils/umiMock';
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  MoreOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  Dropdown,
  message,
  Modal,
  Row,
  Space,
  Statistic,
  Switch,
  Tag,
  Tree,
  Typography
} from 'antd';
import React, { useEffect, useState } from 'react';
import styles from './index.module.less';

const { Text } = Typography;

interface Role {
  id: string;
  name: string;
  code: string;
  description?: string;
  status: 'active' | 'inactive';
  userCount: number;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

interface Permission {
  id: string;
  name: string;
  code: string;
  type: 'menu' | 'button' | 'api';
  parentId?: string;
  children?: Permission[];
}

const RoleManagement: React.FC = () => {
  const [roles, setRoles] = useState<Role[]>([]);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [permissionModalVisible, setPermissionModalVisible] = useState(false);
  const [currentRole, setCurrentRole] = useState<Role | null>(null);
  const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    avgPermissions: 0,
  });

  const {
    getRoleList,
    createRole,
    updateRole,
    deleteRole,
    batchDeleteRoles,
    updateRoleStatus,
    getRolePermissions,
    updateRolePermissions,
    getAllPermissions,
  } = useModel('role');
  const { hasPermission } = useModel('permission');

  // 表格配置
  const tableConfig: TableConfig = {
    columns: [
      {
        title: '角色信息',
        dataIndex: 'roleInfo',
        key: 'roleInfo',
        width: 200,
        render: (_: any, record: Role) => (
          <div>
            <div className={styles.roleName}>{record.name}</div>
            <Text type="secondary" className={styles.roleCode}>
              {record.code}
            </Text>
          </div>
        ),
      },
      {
        title: '描述',
        dataIndex: 'description',
        key: 'description',
        width: 200,
        ellipsis: true,
        render: (description: string) => description || '-',
      },
      {
        title: '用户数量',
        dataIndex: 'userCount',
        key: 'userCount',
        width: 100,
        sorter: (a: Role, b: Role) => a.userCount - b.userCount,
        render: (count: number) => (
          <Space>
            <UserOutlined />
            <span>{count}</span>
          </Space>
        ),
      },
      {
        title: '权限数量',
        dataIndex: 'permissions',
        key: 'permissions',
        width: 100,
        sorter: (a: Role, b: Role) => a.permissions.length - b.permissions.length,
        render: (permissions: string[]) => (
          <Space>
            <SafetyCertificateOutlined />
            <span>{permissions.length}</span>
          </Space>
        ),
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

          return (
            <Tag color={config.color}>
              {config.text}
            </Tag>
          );
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
        render: (_: any, record: Role) => {
          const moreMenuItems = [
            {
              key: 'permissions',
              icon: <SettingOutlined />,
              label: '权限设置',
              disabled: !hasPermission?.('system:role:permissions'),
            },
            {
              key: 'copy',
              icon: <TeamOutlined />,
              label: '复制角色',
              disabled: !hasPermission?.('system:role:create'),
            },
            {
              type: 'divider',
            },
            {
              key: 'delete',
              icon: <DeleteOutlined />,
              label: '删除角色',
              danger: true,
              disabled: !hasPermission?.('system:role:delete') || record.userCount > 0,
            },
          ];

          return (
            <Space>
              <Button
                type="link"
                size="small"
                icon={<EditOutlined />}
                disabled={!hasPermission?.('system:role:update')}
              >
                编辑
              </Button>
              <Switch
                size="small"
                checked={record.status === 'active'}
                onChange={(checked: any) => handleStatusChange(record.id, checked)}
                disabled={!hasPermission?.('system:role:status')}
              />
              <Dropdown
                menu={{
                  items: moreMenuItems,
                  onClick: ({ key }: any) => handleMoreAction(key, record),
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
    scroll: { x: 1000 },
    rowSelection: hasPermission?.('system:role:batch_delete') ? {
      selectedRowKeys,
      onChange: (selectedKeys: React.Key[]) => setSelectedRowKeys(selectedKeys as string[]),
      getCheckboxProps: (record: Role) => ({
        disabled: record.userCount > 0, // 有用户的角色不能删除
      }),
    } : undefined,
  };

  // 表单配置
  const formConfig: FormConfig = {
    layout: 'vertical',
    fields: [
      {
        key: 'name',
        name: 'name',
        label: '角色名称',
        type: 'input',
        required: true,
        rules: [
          { required: true, message: '请输入角色名称' },
          { min: 2, max: 20, message: '角色名称长度为2-20个字符' },
        ],
        props: {
          placeholder: '请输入角色名称',
        },
      },
      {
        key: 'code', // 添加key属性
        name: 'code',
        label: '角色编码',
        type: 'input',
        required: true,
        rules: [
          { required: true, message: '请输入角色编码' },
          { pattern: /^[A-Z_]+$/, message: '角色编码只能包含大写字母和下划线' },
        ],
        props: {
          placeholder: '请输入角色编码，如：ADMIN_USER',
        },
      },
      {
        key: 'description', // 添加key属性
        name: 'description',
        label: '角色描述',
        type: 'textarea',
        props: {
          placeholder: '请输入角色描述',
          rows: 3,
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
    ],
  };

  // 搜索配置
  const searchConfig = {
    fields: [
      {
        key: 'keyword', // 添加key属性
        name: 'keyword',
        label: '关键词',
        type: 'input' as const,
        props: {
          placeholder: '角色名称/编码',
        },
      },
      {
        key: 'status', // 添加key属性
        name: 'status',
        label: '状态',
        type: 'select' as const,
        props: {
          placeholder: '请选择状态',
          allowClear: true,
          options: [
            { label: '启用', value: 'active' },
            { label: '禁用', value: 'inactive' },
          ],
        },
      },
    ],
  };

  // 加载角色列表
  const loadRoles = async (params?: PaginationParams) => {
    setLoading(true);
    try {
      const result = await getRoleList?.(params);
      if (result?.data) {
        setRoles(result.data.list || []);
        updateStats(result.data.list || []);
      }
    } catch (error: any) {
      message.error(error.message || '加载角色列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 加载权限列表
  const loadPermissions = async () => {
    try {
      const result = await getAllPermissions?.();
      if (result?.data) {
        setPermissions(result.data);
      }
    } catch (error: any) {
      message.error(error.message || '加载权限列表失败');
    }
  };

  // 更新统计信息
  const updateStats = (data: Role[]) => {
    const stats = {
      total: data.length,
      active: data.filter(r => r.status === 'active').length,
      inactive: data.filter(r => r.status === 'inactive').length,
      avgPermissions: data.length > 0 ? Math.round(
        data.reduce((sum, r) => sum + r.permissions.length, 0) / data.length
      ) : 0,
    };
    setStats(stats);
  };

  // 状态切换
  const handleStatusChange = async (id: string, active: boolean) => {
    try {
      await updateRoleStatus?.(id, active ? 'active' : 'inactive');
      message.success('状态更新成功');
      loadRoles();
    } catch (error: any) {
      message.error(error.message || '状态更新失败');
    }
  };

  // 更多操作
  const handleMoreAction = async (action: string, record: Role) => {
    switch (action) {
      case 'permissions':
        try {
          const rolePermissions = await getRolePermissions?.(record.id);
          if (rolePermissions?.data) {
            setCurrentRole(record);
            setSelectedPermissions(rolePermissions.data);
            setPermissionModalVisible(true);
          }
        } catch (error: any) {
          message.error(error.message || '加载角色权限失败');
        }
        break;
      case 'copy':
        // 实现复制角色逻辑
        message.info('复制角色功能开发中');
        break;
      case 'delete':
        Modal.confirm({
          title: '删除角色',
          content: `确定要删除角色"${record.name}"吗？此操作不可恢复。`,
          okText: '删除',
          okType: 'danger',
          onOk: async () => {
            try {
              await deleteRole?.(record.id);
              message.success('删除成功');
              loadRoles();
            } catch (error: any) {
              message.error(error.message || '删除失败');
            }
          },
        });
        break;
    }
  };

  // 批量删除
  const handleBatchDelete = () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请选择要删除的角色');
      return;
    }

    Modal.confirm({
      title: '批量删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 个角色吗？此操作不可恢复。`,
      okText: '删除',
      okType: 'danger',
      onOk: async () => {
        try {
          await batchDeleteRoles?.(selectedRowKeys);
          message.success('批量删除成功');
          setSelectedRowKeys([]);
          loadRoles();
        } catch (error: any) {
          message.error(error.message || '批量删除失败');
        }
      },
    });
  };

  // 权限设置保存
  const handlePermissionSave = async () => {
    if (!currentRole) return;

    try {
      await updateRolePermissions?.(currentRole.id, selectedPermissions);
      message.success('权限设置成功');
      setPermissionModalVisible(false);
      setCurrentRole(null);
      loadRoles();
    } catch (error: any) {
      message.error(error.message || '权限设置失败');
    }
  };

  // 转换权限树数据
  const convertToTreeData = (permissions: Permission[]): any => {
    return permissions.map((permission: any) => ({
      title: permission.name,
      key: permission.id,
      children: permission.children ? convertToTreeData(permission.children) : undefined,
    }));
  };

  useEffect(() => {
    loadRoles();
    loadPermissions();
  }, []);

  return (
    <div className={styles.container}>
      {/* 统计卡片 */}
      <Row gutter={16} className={styles.statsRow}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总角色数"
              value={stats.total}
              valueStyle={{ color: '#1890ff' }}
              prefix={<TeamOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="启用角色"
              value={stats.active}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="禁用角色"
              value={stats.inactive}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="平均权限数"
              value={stats.avgPermissions}
              valueStyle={{ color: '#722ed1' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card className={styles.mainCard}>
        <CrudComponent
          title="角色管理"
          tableConfig={tableConfig}
          formConfig={formConfig}
          searchConfig={searchConfig}
          api={{
            list: getRoleList || (async () => ({ success: true, data: { list: [], total: 0 } })),
            create: createRole || (async () => ({ success: true, data: {} })),
            update: updateRole || (async () => ({ success: true, data: {} })),
            delete: deleteRole || (async () => ({ success: true })),
            detail: undefined,
          }}
          permissions={{
            create: 'system:role:create',
            update: 'system:role:update',
            delete: 'system:role:delete',
            view: 'system:role:view',
          }}
          hasPermission={hasPermission}
          extraActions={
            <Space>
              {selectedRowKeys.length > 0 && (
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleBatchDelete}
                  disabled={!hasPermission?.('system:role:batch_delete')}
                >
                  批量删除 ({selectedRowKeys.length})
                </Button>
              )}
              <Button
                icon={<ExportOutlined />}
                disabled={!hasPermission?.('system:role:export')}
              >
                导出
              </Button>
              <Button
                icon={<ReloadOutlined />}
                onClick={() => loadRoles()}
              >
                刷新
              </Button>
            </Space>
          }
        />
      </Card>

      {/* 权限设置模态框 */}
      <Modal
        title={`权限设置 - ${currentRole?.name}`}
        open={permissionModalVisible}
        onOk={handlePermissionSave}
        onCancel={() => {
          setPermissionModalVisible(false);
          setCurrentRole(null);
        }}
        width={600}
        destroyOnClose
      >
        <Tree
          checkable
          checkedKeys={selectedPermissions}
          onCheck={(checkedKeys: any) => {
            setSelectedPermissions(checkedKeys as string[]);
          }}
          treeData={convertToTreeData(permissions)}
          height={400}
        />
      </Modal>
    </div>
  );
};

export default RoleManagement;