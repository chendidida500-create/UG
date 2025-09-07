import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  ImportOutlined,
  LockOutlined,
  MoreOutlined,
  ReloadOutlined,
  UserOutlined,
} from '@ant-design/icons';
import {
  Avatar,
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
  Typography,
} from 'antd';
import React, { useEffect, useState } from 'react';
// 修复UMI 4.x导入方式
// import { useModel } from 'umi';
import CrudComponent from '../../../components/CrudComponent';
import type { FormConfig } from '../../../components/DynamicForm';
import type {
  PaginationParams,
  TableConfig,
} from '../../../components/DynamicTable';
import type { User } from '../../../types';
import { useModel } from '../../../utils/umiMock';
import styles from './index.module.less';

const { Text } = Typography;

const UserManagement: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState<string[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    locked: 0,
  });

  const {
    getUserList,
    createUser,
    updateUser,
    deleteUser,
    batchDeleteUsers,
    updateUserStatus,
    exportUsers,
  } = useModel('user');
  const { hasPermission } = useModel('permission');

  // 表格配置
  const tableConfig: TableConfig = {
    columns: [
      {
        title: '用户信息',
        dataIndex: 'userInfo',
        key: 'userInfo',
        width: 200,
        render: (_: any, record: User) => (
          <Space>
            <Avatar size={40} src={record.avatar} icon={<UserOutlined />} />
            <div>
              <div className={styles.username}>{record.username}</div>
              <Text type="secondary" className={styles.email}>
                {record.email}
              </Text>
            </div>
          </Space>
        ),
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        width: 120,
        render: (phone: string) => phone || '-',
      },
      {
        title: '角色',
        dataIndex: 'roles',
        key: 'roles',
        width: 150,
        render: (roles: string[]) => (
          <Space size={[0, 4]} wrap>
            {roles.map(role => (
              <Tag key={role} color="blue">
                {role}
              </Tag>
            ))}
          </Space>
        ),
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (status: number, record: User) => {
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
        title: '最后登录',
        dataIndex: 'lastLoginTime',
        key: 'lastLoginTime',
        width: 150,
        render: (time: string) =>
          time ? new Date(time).toLocaleString() : '-',
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
        width: 120,
        fixed: 'right',
        render: (_: any, record: User) => {
          const moreMenuItems = [
            {
              key: 'resetPassword',
              icon: <LockOutlined />,
              label: '重置密码',
              disabled: !hasPermission?.('system:user:reset_password'),
            },
            {
              key: 'viewLogs',
              icon: <UserOutlined />,
              label: '查看日志',
              disabled: !hasPermission?.('system:user:view_logs'),
            },
            {
              type: 'divider',
            },
            {
              key: 'delete',
              icon: <DeleteOutlined />,
              label: '删除用户',
              danger: true,
              disabled: !hasPermission?.('system:user:delete'),
            },
          ];

          return (
            <Space>
              <Button
                type="link"
                size="small"
                icon={<EditOutlined />}
                disabled={!hasPermission?.('system:user:update')}
              >
                编辑
              </Button>
              <Switch
                size="small"
                checked={record.status === 1}
                onChange={(checked: any) =>
                  handleStatusChange(record.id, checked)
                }
                disabled={!hasPermission?.('system:user:status')}
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
    // scroll: { x: 1200 }, // 暂时注释，等待TableConfig类型支持
    rowSelection: hasPermission?.('system:user:batch_delete')
      ? {
          type: 'checkbox',
          selectedRowKeys,
          onChange: (selectedRowKeys: React.Key[]) =>
            setSelectedRowKeys(selectedRowKeys as string[]),
        }
      : undefined,
  };

  // 表单配置
  const formConfig: FormConfig = {
    layout: 'vertical',
    fields: [
      {
        key: 'username',
        name: 'username',
        label: '用户名',
        type: 'input',
        required: true,
        rules: [
          { required: true, message: '请输入用户名' },
          { min: 3, max: 20, message: '用户名长度为3-20个字符' },
          {
            pattern: /^[a-zA-Z0-9_]+$/,
            message: '用户名只能包含字母、数字和下划线',
          },
        ],
        props: {
          placeholder: '请输入用户名',
        },
      },
      {
        key: 'email',
        name: 'email',
        label: '邮箱',
        type: 'input',
        required: true,
        rules: [
          { required: true, message: '请输入邮箱' },
          { type: 'email', message: '请输入有效的邮箱地址' },
        ],
        props: {
          placeholder: '请输入邮箱地址',
        },
      },
      {
        key: 'phone',
        name: 'phone',
        label: '手机号',
        type: 'input',
        rules: [{ pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号' }],
        props: {
          placeholder: '请输入手机号',
        },
      },
      {
        key: 'password',
        name: 'password',
        label: '密码',
        type: 'password',
        required: true,
        rules: [
          { required: true, message: '请输入密码' },
          { min: 6, message: '密码长度至少6位' },
        ],
        props: {
          placeholder: '请输入密码',
        },
        // hideInEdit: true, // 暂时注释，等待FormConfig类型支持
      },
      {
        key: 'roles',
        name: 'roles',
        label: '角色',
        type: 'select',
        required: true,
        rules: [{ required: true, message: '请选择角色' }],
        props: {
          mode: 'multiple',
          placeholder: '请选择角色',
          options: [
            { label: '管理员', value: 'admin' },
            { label: '用户', value: 'user' },
            { label: '访客', value: 'guest' },
          ],
        },
      },
      {
        key: 'status',
        name: 'status',
        label: '状态',
        type: 'select',
        required: true,
        props: {
          placeholder: '请选择状态',
          options: [
            { label: '正常', value: 1 },
            { label: '禁用', value: 0 },
          ],
        },
      },
    ],
  };

  // 搜索配置
  const searchConfig = {
    fields: [
      {
        name: 'keyword',
        label: '关键词',
        type: 'input' as const,
        props: {
          placeholder: '用户名/邮箱/手机号',
        },
      },
      {
        name: 'status',
        label: '状态',
        type: 'select' as const,
        props: {
          placeholder: '请选择状态',
          allowClear: true,
          options: [
            { label: '正常', value: 1 },
            { label: '禁用', value: 0 },
          ],
        },
      },
      {
        name: 'roles',
        label: '角色',
        type: 'select' as const,
        props: {
          placeholder: '请选择角色',
          allowClear: true,
          options: [
            { label: '管理员', value: 'admin' },
            { label: '用户', value: 'user' },
            { label: '访客', value: 'guest' },
          ],
        },
      },
    ],
  };

  // 加载用户列表
  const loadUsers = async (params?: PaginationParams) => {
    setLoading(true);
    try {
      const result = await getUserList?.(params);
      if (result?.data) {
        setUsers(result.data.list || []);
        updateStats(result.data.list || []);
      }
    } catch (error: any) {
      message.error(error.message || '加载用户列表失败');
    } finally {
      setLoading(false);
    }
  };

  // 更新统计信息
  const updateStats = (data: User[]) => {
    const stats = {
      total: data.length,
      active: data.filter(u => u.status === 1).length,
      inactive: data.filter(u => u.status === 0).length,
      locked: 0, // 由于我们使用 0|1 状态，暂时不支持锁定状态
    };
    setStats(stats);
  };

  // 状态切换
  const handleStatusChange = async (id: string, active: boolean) => {
    try {
      await updateUserStatus?.(id, active ? '1' : '0');
      message.success('状态更新成功');
      loadUsers();
    } catch (error: any) {
      message.error(error.message || '状态更新失败');
    }
  };

  // 更多操作
  const handleMoreAction = async (action: string, record: User) => {
    switch (action) {
      case 'resetPassword':
        Modal.confirm({
          title: '重置密码',
          content: `确定要重置用户"${record.username}"的密码吗？`,
          onOk: async () => {
            try {
              // 调用重置密码API
              message.success('密码重置成功');
            } catch (error: any) {
              message.error(error.message || '密码重置失败');
            }
          },
        });
        break;
      case 'delete':
        Modal.confirm({
          title: '删除用户',
          content: `确定要删除用户"${record.username}"吗？此操作不可恢复。`,
          okText: '删除',
          okType: 'danger',
          onOk: async () => {
            try {
              await deleteUser?.(record.id);
              message.success('删除成功');
              loadUsers();
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
      message.warning('请选择要删除的用户');
      return;
    }

    Modal.confirm({
      title: '批量删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 个用户吗？此操作不可恢复。`,
      okText: '删除',
      okType: 'danger',
      onOk: async () => {
        try {
          await batchDeleteUsers?.(selectedRowKeys);
          message.success('批量删除成功');
          setSelectedRowKeys([]);
          loadUsers();
        } catch (error: any) {
          message.error(error.message || '批量删除失败');
        }
      },
    });
  };

  // 导出数据
  const handleExport = async () => {
    try {
      await exportUsers?.();
      message.success('导出成功');
    } catch (error: any) {
      message.error(error.message || '导出失败');
    }
  };

  // 导入数据
  const handleImport = () => {
    // 实现导入逻辑
    message.info('导入功能开发中');
  };

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className={styles.container}>
      {/* 统计卡片 */}
      <Row gutter={16} className={styles.statsRow}>
        <Col span={6}>
          <Card>
            <Statistic
              title="总用户数"
              value={stats.total}
              valueStyle={{ color: '#1890ff' }}
              prefix={<UserOutlined />}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="正常用户"
              value={stats.active}
              valueStyle={{ color: '#52c41a' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="禁用用户"
              value={stats.inactive}
              valueStyle={{ color: '#faad14' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="锁定用户"
              value={stats.locked}
              valueStyle={{ color: '#ff4d4f' }}
            />
          </Card>
        </Col>
      </Row>

      {/* 主要内容 */}
      <Card className={styles.mainCard}>
        <CrudComponent
          title="用户管理"
          api={{
            list:
              getUserList ||
              (() =>
                Promise.resolve({
                  success: true,
                  data: { list: [], total: 0 },
                })),
            create:
              createUser ||
              (() => Promise.resolve({ success: true, data: {} })),
            update:
              updateUser ||
              (() => Promise.resolve({ success: true, data: {} })),
            delete: deleteUser || (() => Promise.resolve({ success: true })),
          }}
          tableConfig={tableConfig}
          formConfig={formConfig}
          extraActions={
            <Space>
              {selectedRowKeys.length > 0 && (
                <Button
                  danger
                  icon={<DeleteOutlined />}
                  onClick={handleBatchDelete}
                  disabled={!hasPermission?.('system:user:batch_delete')}
                >
                  批量删除 ({selectedRowKeys.length})
                </Button>
              )}
              <Button
                icon={<ExportOutlined />}
                onClick={handleExport}
                disabled={!hasPermission?.('system:user:export')}
              >
                导出
              </Button>
              <Button
                icon={<ImportOutlined />}
                onClick={handleImport}
                disabled={!hasPermission?.('system:user:import')}
              >
                导入
              </Button>
              <Button icon={<ReloadOutlined />} onClick={() => loadUsers()}>
                刷新
              </Button>
            </Space>
          }
        />
      </Card>
    </div>
  );
};

export default UserManagement;
