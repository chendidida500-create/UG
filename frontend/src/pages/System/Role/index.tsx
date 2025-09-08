import CrudComponent from '@/components/CrudComponent';
import type { FormConfig } from '@/components/DynamicForm';
import type { PaginationParams, TableConfig } from '@/components/DynamicTable';
import { useModel } from '@/utils/umiMock';
import
{
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  MoreOutlined,
  ReloadOutlined,
  SafetyCertificateOutlined,
  SettingOutlined,
  TeamOutlined,
  UserOutlined,
} from '@ant-design/icons';
import
{
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
  Tree,
  Typography
} from 'antd';
import { useEffect, useState } from 'react';
import styles from './index.module.less';

const { Text } = Typography;

interface Role
{
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

interface Permission
{
  id: string;
  name: string;
  code: string;
  type: 'menu' | 'button' | 'api';
  parentId?: string;
  children?: Permission[];
}

const RoleManagement: React.FC = () =>
{
  const [ permissions, setPermissions ] = useState<Permission[]>( [] );
  const [ loading, setLoading ] = useState<boolean>( false );
  const [ selectedRowKeys, setSelectedRowKeys ] = useState<React.Key[]>( [] );
  const [ permissionModalVisible, setPermissionModalVisible ] = useState<boolean>( false );
  const [ currentRole, setCurrentRole ] = useState<Role | null>( null );
  const [ selectedPermissions, setSelectedPermissions ] = useState<string[]>( [] );
  const [ stats, setStats ] = useState( {
    total: 0,
    active: 0,
    inactive: 0,
    avgPermissions: 0,
  } );

  const roleModel = useModel( 'role' );
  const permissionModel = useModel( 'permission' );

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
  } = roleModel;
  const { hasPermission } = permissionModel;

  // 表格配置 - 角色管理表格，定义角色列表的列和操作
  const tableConfig: TableConfig = {
    columns: [
      {
        title: '角色信息',
        dataIndex: 'roleInfo',
        key: 'roleInfo',
        width: 200,
        render: ( _: any, record: Role ) => (
          <div>
            <div className={ styles.roleName }>{ record.name }</div>
            <Text type="secondary" className={ styles.roleCode }>
              { record.code }
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
        render: ( description: string ) => description || '-',
      },
      {
        title: '用户数量',
        dataIndex: 'userCount',
        key: 'userCount',
        width: 100,
        sorter: ( a: Role, b: Role ) => a.userCount - b.userCount,
        render: ( count: number ) => (
          <Space>
            <UserOutlined />
            <span>{ count }</span>
          </Space>
        ),
      },
      {
        title: '权限数量',
        dataIndex: 'permissions',
        key: 'permissions',
        width: 100,
        sorter: ( a: Role, b: Role ) =>
          a.permissions.length - b.permissions.length,
        render: ( permissions: string[] ) => (
          <Space>
            <SafetyCertificateOutlined />
            <span>{ permissions.length }</span>
          </Space>
        ),
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: ( status: string ) =>
        {
          const statusConfig = {
            active: { color: 'success', text: '启用' },
            inactive: { color: 'default', text: '禁用' },
          };
          const config = statusConfig[ status as keyof typeof statusConfig ];

          return <Tag color={ config.color }>{ config.text }</Tag>;
        },
      },
      {
        title: '创建时间',
        dataIndex: 'createdAt',
        key: 'createdAt',
        width: 150,
        render: ( time: string ) => new Date( time ).toLocaleString(),
      },
      {
        title: '操作',
        dataIndex: 'actions',
        key: 'actions',
        width: 150,
        fixed: 'right',
        render: ( _: any, record: Role ) =>
        {
          const moreMenuItems = [
            {
              key: 'permissions',
              icon: <SettingOutlined />,
              label: '权限设置',
              disabled: !hasPermission?.( 'system:role:permissions' ),
            },
            {
              key: 'copy',
              icon: <TeamOutlined />,
              label: '复制角色',
              disabled: !hasPermission?.( 'system:role:create' ),
            },
            {
              type: 'divider',
            },
            {
              key: 'delete',
              icon: <DeleteOutlined />,
              label: '删除角色',
              danger: true,
              disabled:
                !hasPermission?.( 'system:role:delete' ) || record.userCount > 0,
            },
          ];

          return (
            <Space>
              <Button
                type="link"
                size="small"
                icon={ <EditOutlined /> }
                onClick={ () => handleEdit( record ) }
                disabled={ !hasPermission?.( 'system:role:update' ) }
              >
                编辑
              </Button>
              <Dropdown
                menu={ {
                  items: moreMenuItems,
                  onClick: ( { key }: { key: string } ) => handleMoreAction( key, record ),
                } }
              >
                <Button type="link" size="small" icon={ <MoreOutlined /> }>
                  更多
                </Button>
              </Dropdown>
            </Space>
          );
        },
      },
    ],
    rowSelection: {
      type: 'checkbox',
      selectedRowKeys,
      onChange: ( selectedRowKeys: React.Key[] ) =>
      {
        setSelectedRowKeys( selectedRowKeys );
      },
    },
    actions: {
      view: false,
      edit: false,
      delete: false,
      custom: [],
    },
    pagination: {
      pageSize: 20,
      showSizeChanger: true,
      showQuickJumper: true,
    },
  };

  // 表单配置
  const formConfig: FormConfig = {
    fields: [
      {
        key: 'name',
        label: '角色名称',
        type: 'input',
        required: true,
        placeholder: '请输入角色名称',
        props: {
          maxLength: 50,
        },
      },
      {
        key: 'code',
        label: '角色编码',
        type: 'input',
        required: true,
        placeholder: '请输入角色编码',
        props: {
          maxLength: 50,
        },
      },
      {
        key: 'description',
        label: '描述',
        type: 'textarea',
        placeholder: '请输入角色描述',
        props: {
          maxLength: 200,
          rows: 4,
        },
      },
      {
        key: 'status',
        label: '状态',
        type: 'radio',
        required: true,
        options: [
          { label: '启用', value: 'active' },
          { label: '禁用', value: 'inactive' },
        ],
        props: {
          defaultValue: 'active',
        },
      },
    ],
    layout: 'horizontal',
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  };

  // 搜索配置
  const searchConfig = {
    fields: [
      {
        name: 'name',
        label: '角色名称',
        type: 'input' as const, // 明确指定类型
        props: {
          placeholder: '请输入角色名称',
        },
      },
      {
        name: 'code',
        label: '角色编码',
        type: 'input' as const, // 明确指定类型
        props: {
          placeholder: '请输入角色编码',
        },
      },
      {
        name: 'status',
        label: '状态',
        type: 'select' as const, // 明确指定类型
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

  // API接口
  const api = {
    list: async ( params: PaginationParams ) =>
    {
      try
      {
        const result = await getRoleList?.( params );
        if ( result?.success )
        {
          return {
            success: true,
            data: {
              list: result.data.list,
              pagination: result.data.pagination,
            },
          };
        } else
        {
          return {
            success: false,
            message: result?.message || '获取角色列表失败',
          };
        }
      } catch ( error: any )
      {
        return {
          success: false,
          message: error.message || '获取角色列表失败',
        };
      }
    },
    create: async ( data: any ) =>
    {
      try
      {
        const result = await createRole?.( data );
        if ( result?.success )
        {
          message.success( '角色创建成功' );
          return { success: true };
        } else
        {
          return {
            success: false,
            message: result?.message || '角色创建失败',
          };
        }
      } catch ( error: any )
      {
        return {
          success: false,
          message: error.message || '角色创建失败',
        };
      }
    },
    update: async ( id: string, data: any ) =>
    {
      try
      {
        const result = await updateRole?.( id, data );
        if ( result?.success )
        {
          message.success( '角色更新成功' );
          return { success: true };
        } else
        {
          return {
            success: false,
            message: result?.message || '角色更新失败',
          };
        }
      } catch ( error: any )
      {
        return {
          success: false,
          message: error.message || '角色更新失败',
        };
      }
    },
    delete: async ( id: string ) => // eslint-disable-line @typescript-eslint/no-unused-vars
    {
      try
      {
        const result = await deleteRole?.( id );
        if ( result?.success )
        {
          message.success( '角色删除成功' );
          return { success: true };
        } else
        {
          return {
            success: false,
            message: result?.message || '角色删除失败',
          };
        }
      } catch ( error: any )
      {
        return {
          success: false,
          message: error.message || '角色删除失败',
        };
      }
    },
    detail: async ( id: string ) => // eslint-disable-line @typescript-eslint/no-unused-vars
    {
      // 这里应该调用获取角色详情的API
      // 暂时返回空实现，但至少使用id参数避免ts(6133)错误
      console.log( 'Fetching role detail for id:', id );
      return { success: true, data: {} };
    },
  };

  // 权限配置
  const permissionsConfig = {
    view: 'system:role:view',
    create: 'system:role:create',
    update: 'system:role:update',
    delete: 'system:role:delete',
    permissions: 'system:role:permissions',
  };

  // 编辑角色
  const handleEdit = ( record: Role ) =>
  {
    setCurrentRole( record );
  };

  // 更多操作
  const handleMoreAction = ( action: string, record: Role ) =>
  {
    switch ( action )
    {
      case 'permissions':
        handlePermissionSetting( record );
        break;
      case 'copy':
        handleCopyRole( record );
        break;
      case 'delete':
        handleDeleteRole( record );
        break;
      default:
        break;
    }
  };

  // 权限设置
  const handlePermissionSetting = async ( record: Role ) =>
  {
    try
    {
      setLoading( true );
      // 获取角色权限
      const permissionResult = await getRolePermissions?.( record.id );
      // 获取所有权限
      const allPermissionResult = await getAllPermissions?.();

      if ( permissionResult?.success && allPermissionResult?.success )
      {
        setPermissions( allPermissionResult.data );
        setSelectedPermissions( permissionResult.data );
        setCurrentRole( record );
        setPermissionModalVisible( true );
      } else
      {
        message.error(
          permissionResult?.message || allPermissionResult?.message || '获取权限信息失败'
        );
      }
    } catch ( error: any )
    {
      message.error( error.message || '获取权限信息失败' );
    } finally
    {
      setLoading( false );
    }
  };

  // 复制角色
  const handleCopyRole = ( record: Role ) =>
  {
    Modal.confirm( {
      title: '复制角色',
      content: `确定要复制角色 ${ record.name } 吗？`,
      onOk: async () =>
      {
        try
        {
          // 这里应该调用复制角色的API
          message.success( '角色复制成功' );
        } catch ( error: any )
        {
          message.error( error.message || '角色复制失败' );
        }
      },
    } );
  };

  // 删除角色
  const handleDeleteRole = ( record: Role ) =>
  {
    if ( record.userCount > 0 )
    {
      message.warning( '该角色下有关联用户，无法删除' );
      return;
    }

    Modal.confirm( {
      title: '删除角色',
      content: `确定要删除角色 ${ record.name } 吗？`,
      onOk: async () =>
      {
        try
        {
          const result = await deleteRole?.( record.id );
          if ( result?.success )
          {
            message.success( '角色删除成功' );
          } else
          {
            message.error( result?.message || '角色删除失败' );
          }
        } catch ( error: any )
        {
          message.error( error.message || '角色删除失败' );
        }
      },
    } );
  };

  // 批量删除
  const handleBatchDelete = async () =>
  {
    if ( selectedRowKeys.length === 0 )
    {
      message.warning( '请先选择要删除的角色' );
      return;
    }

    Modal.confirm( {
      title: '批量删除',
      content: `确定要删除选中的 ${ selectedRowKeys.length } 个角色吗？`,
      onOk: async () =>
      {
        try
        {
          const result = await batchDeleteRoles?.( selectedRowKeys as string[] );
          if ( result?.success )
          {
            message.success( '批量删除成功' );
            setSelectedRowKeys( [] );
          } else
          {
            message.error( result?.message || '批量删除失败' );
          }
        } catch ( error: any )
        {
          message.error( error.message || '批量删除失败' );
        }
      },
    } );
  };

  // 导出角色
  const handleExport = async () =>
  {
    try
    {
      // 这里应该调用导出角色的API
      message.success( '角色导出成功' );
    } catch ( error: any )
    {
      message.error( error.message || '角色导出失败' );
    }
  };

  // 导入角色（暂未使用）
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleImport = () =>
  {
    // 这里应该实现角色导入功能
    message.info( '角色导入功能待实现' );
  };

  // 保存权限设置
  const handleSavePermissions = async () =>
  {
    if ( !currentRole ) return;

    try
    {
      setLoading( true );
      const result = await updateRolePermissions?.( currentRole.id, selectedPermissions );
      if ( result?.success )
      {
        message.success( '权限设置保存成功' );
        setPermissionModalVisible( false );
        setCurrentRole( null );
        setSelectedPermissions( [] );
      } else
      {
        message.error( result?.message || '权限设置保存失败' );
      }
    } catch ( error: any )
    {
      message.error( error.message || '权限设置保存失败' );
    } finally
    {
      setLoading( false );
    }
  };

  // 获取统计数据
  const loadStats = async () =>
  {
    // 这里应该调用获取统计数据的API
    // 暂时使用模拟数据
    setStats( {
      total: 12,
      active: 10,
      inactive: 2,
      avgPermissions: 15,
    } );
  };

  // 初始化数据
  useEffect( () =>
  {
    loadStats();
  }, [] );

  // 权限树选择处理
  const handlePermissionTreeCheck = ( checkedKeys: any ) =>
  {
    setSelectedPermissions( checkedKeys );
  };

  return (
    <div className={ styles.roleManagement }>
      <Row gutter={ 16 } className={ styles.statsRow }>
        <Col span={ 6 }>
          <Card>
            <Statistic title="角色总数" value={ stats.total } />
          </Card>
        </Col>
        <Col span={ 6 }>
          <Card>
            <Statistic title="启用角色" value={ stats.active } valueStyle={ { color: '#3f8600' } } />
          </Card>
        </Col>
        <Col span={ 6 }>
          <Card>
            <Statistic title="禁用角色" value={ stats.inactive } valueStyle={ { color: '#cf1322' } } />
          </Card>
        </Col>
        <Col span={ 6 }>
          <Card>
            <Statistic title="平均权限数" value={ stats.avgPermissions } />
          </Card>
        </Col>
      </Row>

      <Card className={ styles.actionBar }>
        <Space>
          <Button
            type="primary"
            icon={ <DeleteOutlined /> }
            onClick={ handleBatchDelete }
            disabled={ !hasPermission( 'system:role:delete' ) || selectedRowKeys.length === 0 }
          >
            批量删除
          </Button>
          <Button
            icon={ <ExportOutlined /> }
            onClick={ handleExport }
            disabled={ !hasPermission( 'system:role:export' ) }
          >
            导出
          </Button>
          <Button
            icon={ <ReloadOutlined /> }
            onClick={ loadStats }
          >
            刷新
          </Button>
        </Space>
      </Card>

      <CrudComponent
        title="角色"
        tableConfig={ tableConfig }
        formConfig={ formConfig }
        searchConfig={ searchConfig }
        api={ api }
        permissions={ permissionsConfig }
        hasPermission={ hasPermission }
        extraActions={
          <Dropdown
            menu={ {
              items: [
                {
                  key: 'batchDelete',
                  icon: <DeleteOutlined />,
                  label: '批量删除',
                  disabled: !hasPermission( 'system:role:delete' ) || selectedRowKeys.length === 0,
                  onClick: handleBatchDelete,
                },
                {
                  key: 'export',
                  icon: <ExportOutlined />,
                  label: '导出角色',
                  disabled: !hasPermission( 'system:role:export' ),
                  onClick: handleExport,
                },
              ],
            } }
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

      {/* 权限设置弹窗 */ }
      <Modal
        title={ `权限设置 - ${ currentRole?.name }` }
        open={ permissionModalVisible }
        onCancel={ () =>
        {
          setPermissionModalVisible( false );
          setCurrentRole( null );
          setSelectedPermissions( [] );
        } }
        onOk={ handleSavePermissions }
        confirmLoading={ loading }
        width={ 800 }
      >
        <Tree
          checkable
          checkedKeys={ selectedPermissions }
          onCheck={ handlePermissionTreeCheck }
          treeData={ permissions }
          fieldNames={ { title: 'name', key: 'id', children: 'children' } }
          defaultExpandAll
        />
      </Modal>
    </div>
  );
};

export default RoleManagement;