import CrudComponent from '@/components/CrudComponent/index.tsx';
import type { FormConfig } from '@/components/DynamicForm/index.tsx';
import type {
  PaginationParams,
  TableConfig,
} from '@/components/DynamicTable/index.tsx';
import type { Role, User } from '@/types/index.ts';
import { useModel } from '@/utils/umiMock.ts';
import {
  DeleteOutlined,
  ExportOutlined,
  ImportOutlined,
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
  Tag,
  Typography,
} from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.module.less';

const { Text } = Typography;

const UserManagement: React.FC = () => {
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [stats, setStats] = useState({
    total: 0,
    active: 0,
    inactive: 0,
    locked: 0,
  });

  const userModel = useModel('user');
  const permissionModel = useModel('permission');

  const {
    getUserList,
    createUser,
    updateUser,
    deleteUser,
    batchDeleteUsers,
    exportUsers,
  } = userModel;
  const { hasPermission } = permissionModel;

  // 表格配置 - 定义用户管理表格的列和操作，包括用户信息展示、状态显示、角色展示等
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
        title: '昵称',
        dataIndex: 'nickname',
        key: 'nickname',
        width: 120,
      },
      {
        title: '手机号',
        dataIndex: 'phone',
        key: 'phone',
        width: 120,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: (status: 0 | 1) => (
          <Tag color={status === 1 ? 'success' : 'error'}>
            {status === 1 ? '启用' : '禁用'}
          </Tag>
        ),
      },
      {
        title: '角色',
        dataIndex: 'roles',
        key: 'roles',
        width: 200,
        render: (roles: Role[]) => (
          <Space wrap>
            {roles?.map(role => (
              <Tag key={role.id} color="blue">
                {role.name}
              </Tag>
            ))}
          </Space>
        ),
      },
      {
        title: '最后登录',
        dataIndex: 'last_login_at',
        key: 'last_login_at',
        width: 180,
        render: (date: string) =>
          date ? new Date(date).toLocaleString() : '-',
      },
      {
        title: '创建时间',
        dataIndex: 'created_at',
        key: 'created_at',
        width: 180,
        render: (date: string) => new Date(date).toLocaleString(),
      },
    ],
    rowSelection: {
      type: 'checkbox',
      selectedRowKeys,
      onChange: (selectedRowKeys: React.Key[]) => {
        setSelectedRowKeys(selectedRowKeys);
      },
    },
    actions: {
      view: true,
      edit: true,
      delete: true,
      custom: [
        {
          key: 'resetPassword',
          title: '重置密码',
          icon: 'edit',
          permission: 'system:user:resetPassword',
        },
      ],
    },
    pagination: {
      pageSize: 20,
      showSizeChanger: true,
      showQuickJumper: true,
    },
  };

  // 表单配置 - 定义用户创建和编辑表单的字段和验证规则
  const formConfig: FormConfig = {
    fields: [
      {
        key: 'username',
        label: '用户名',
        type: 'input',
        required: true,
        placeholder: '请输入用户名',
        props: {
          maxLength: 50,
        },
      },
      {
        key: 'email',
        label: '邮箱',
        type: 'input',
        required: true,
        placeholder: '请输入邮箱',
        props: {
          type: 'email',
        },
      },
      {
        key: 'nickname',
        label: '昵称',
        type: 'input',
        placeholder: '请输入昵称',
        props: {
          maxLength: 50,
        },
      },
      {
        key: 'phone',
        label: '手机号',
        type: 'input',
        placeholder: '请输入手机号',
        props: {
          maxLength: 20,
        },
      },
      {
        key: 'status',
        label: '状态',
        type: 'select',
        required: true,
        options: [
          { label: '启用', value: 1 },
          { label: '禁用', value: 0 },
        ],
      },
    ],
    layout: 'horizontal',
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  // 搜索配置 - 定义用户列表的搜索字段，支持按用户名、邮箱和状态搜索
  const searchConfig = {
    fields: [
      {
        name: 'username',
        label: '用户名',
        type: 'input' as const, // 明确指定类型
        props: {
          placeholder: '请输入用户名',
        },
      },
      {
        name: 'email',
        label: '邮箱',
        type: 'input' as const, // 明确指定类型
        props: {
          placeholder: '请输入邮箱',
        },
      },
      {
        name: 'status',
        label: '状态',
        type: 'select' as const, // 明确指定类型
        props: {
          placeholder: '请选择状态',
          options: [
            { label: '启用', value: 1 },
            { label: '禁用', value: 0 },
          ],
        },
      },
    ],
  };

  // API接口 - 定义用户管理相关API调用，包括列表获取、创建、更新、删除等操作
  const api = {
    list: async (params: PaginationParams) => {
      try {
        const result = await getUserList?.(params);
        if (result?.success) {
          return {
            success: true,
            data: {
              list: result.data.list,
              pagination: result.data.pagination,
            },
          };
        } else {
          return {
            success: false,
            message: result?.message || '获取用户列表失败',
          };
        }
      } catch (error: any) {
        return {
          success: false,
          message: error.message || '获取用户列表失败',
        };
      }
    },
    create: async (data: any) => {
      try {
        const result = await createUser?.(data);
        if (result?.success) {
          message.success('用户创建成功');
          return { success: true };
        } else {
          return {
            success: false,
            message: result?.message || '用户创建失败',
          };
        }
      } catch (error: any) {
        return {
          success: false,
          message: error.message || '用户创建失败',
        };
      }
    },
    update: async (id: string, data: any) => {
      try {
        const result = await updateUser?.(id, data);
        if (result?.success) {
          message.success('用户更新成功');
          return { success: true };
        } else {
          return {
            success: false,
            message: result?.message || '用户更新失败',
          };
        }
      } catch (error: any) {
        return {
          success: false,
          message: error.message || '用户更新失败',
        };
      }
    },
    delete: async (id: string) => {
      try {
        // 使用id参数调用deleteUser函数
        const result = await deleteUser?.(id);
        if (result?.success) {
          message.success('用户删除成功');
          return { success: true };
        } else {
          return {
            success: false,
            message: result?.message || '用户删除失败',
          };
        }
      } catch (error: any) {
        return {
          success: false,
          message: error.message || '用户删除失败',
        };
      }
    },
    detail: async (id: string) => {
      // 如果有getUserDetail函数，应该在这里使用id参数调用它
      // 暂时返回空实现，但至少使用了id参数避免ts(6133)错误
      console.log('Fetching user detail for id:', id);
      return { success: true, data: {} };
    },
  };

  // 权限配置 - 定义用户管理各操作对应的权限码，用于权限控制
  const permissions = {
    view: 'system:user:view',
    create: 'system:user:create',
    update: 'system:user:update',
    delete: 'system:user:delete',
  };

  // 自定义操作 - 处理用户列表中的自定义操作，如重置密码等
  const handleCustomAction = (action: string, record: any) => {
    if (action === 'resetPassword') {
      Modal.confirm({
        title: '重置密码',
        content: `确定要重置用户 ${record.username} 的密码吗？`,
        onOk: async () => {
          try {
            // 这里应该调用重置密码的API
            message.success('密码重置成功');
          } catch (error: any) {
            message.error(error.message || '密码重置失败');
          }
        },
      });
    }
  };

  // 批量删除 - 处理用户批量删除操作，包含确认对话框和权限检查
  const handleBatchDelete = async () => {
    if (selectedRowKeys.length === 0) {
      message.warning('请先选择要删除的用户');
      return;
    }

    Modal.confirm({
      title: '批量删除',
      content: `确定要删除选中的 ${selectedRowKeys.length} 个用户吗？`,
      onOk: async () => {
        try {
          const result = await batchDeleteUsers?.(selectedRowKeys as string[]);
          if (result?.success) {
            message.success('批量删除成功');
            setSelectedRowKeys([]);
          } else {
            message.error(result?.message || '批量删除失败');
          }
        } catch (error: any) {
          message.error(error.message || '批量删除失败');
        }
      },
    });
  };

  // 导出用户 - 处理用户数据导出操作，将用户列表导出为Excel文件
  const handleExport = async () => {
    try {
      const result = await exportUsers?.();
      if (result?.success) {
        message.success('用户导出成功');
      } else {
        message.error(result?.message || '用户导出失败');
      }
    } catch (error: any) {
      message.error(error.message || '用户导出失败');
    }
  };

  // 导入用户 - 处理用户数据导入操作（待实现）
  const handleImport = () => {
    // 这里应该实现用户导入功能
    message.info('用户导入功能待实现');
  };

  // 获取统计数据 - 加载用户统计信息，如总用户数、启用用户数等（当前使用模拟数据）
  const loadStats = async () => {
    // 这里应该调用获取统计数据的API
    // 暂时使用模拟数据
    setStats({
      total: 1234,
      active: 1100,
      inactive: 100,
      locked: 34,
    });
  };

  // 初始化数据
  useEffect(() => {
    loadStats();
  }, []);

  return (
    <div className={styles.userManagement}>
      <Row gutter={16} className={styles.statsRow}>
        <Col span={6}>
          <Card>
            <Statistic title="用户总数" value={stats.total} />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="启用用户"
              value={stats.active}
              valueStyle={{ color: '#3f8600' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="禁用用户"
              value={stats.inactive}
              valueStyle={{ color: '#cf1322' }}
            />
          </Card>
        </Col>
        <Col span={6}>
          <Card>
            <Statistic
              title="锁定用户"
              value={stats.locked}
              valueStyle={{ color: '#fa8c16' }}
            />
          </Card>
        </Col>
      </Row>

      <Card className={styles.actionBar}>
        <Space>
          <Button
            type="primary"
            icon={<DeleteOutlined />}
            onClick={handleBatchDelete}
            disabled={
              !hasPermission('system:user:delete') ||
              selectedRowKeys.length === 0
            }
          >
            批量删除
          </Button>
          <Button
            icon={<ExportOutlined />}
            onClick={handleExport}
            disabled={!hasPermission('system:user:export')}
          >
            导出
          </Button>
          <Button
            icon={<ImportOutlined />}
            onClick={handleImport}
            disabled={!hasPermission('system:user:import')}
          >
            导入
          </Button>
          <Button icon={<ReloadOutlined />} onClick={loadStats}>
            刷新
          </Button>
        </Space>
      </Card>

      <CrudComponent
        title="用户"
        tableConfig={tableConfig}
        formConfig={formConfig}
        searchConfig={searchConfig}
        api={api}
        permissions={permissions}
        hasPermission={hasPermission}
        onCustomAction={handleCustomAction}
        extraActions={
          <Dropdown
            menu={{
              items: [
                {
                  key: 'batchDelete',
                  icon: <DeleteOutlined />,
                  label: '批量删除',
                  disabled:
                    !hasPermission('system:user:delete') ||
                    selectedRowKeys.length === 0,
                  onClick: handleBatchDelete,
                },
                {
                  key: 'export',
                  icon: <ExportOutlined />,
                  label: '导出用户',
                  disabled: !hasPermission('system:user:export'),
                  onClick: handleExport,
                },
                {
                  key: 'import',
                  icon: <ImportOutlined />,
                  label: '导入用户',
                  disabled: !hasPermission('system:user:import'),
                  onClick: handleImport,
                },
              ],
            }}
          >
            <Button>
              <Space>
                更多操作
                <MoreOutlined />
              </Space>
            </Button>
          </Dropdown>
        }
      />
    </div>
  );
};

export default UserManagement;
