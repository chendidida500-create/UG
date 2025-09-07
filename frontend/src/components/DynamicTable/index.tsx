import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
  EyeOutlined,
  ImportOutlined,
  MoreOutlined,
  PlusOutlined,
  ReloadOutlined,
  SearchOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import {
  Button,
  Card,
  Col,
  DatePicker,
  Dropdown,
  Input,
  Menu,
  Popconfirm,
  Row,
  Select,
  Space,
  Table,
  Tooltip,
} from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { useEffect, useRef, useState } from 'react';
import type { PaginationParams, TableConfig } from '../../types';

// 导出类型供其他组件使用
export type { PaginationParams, TableConfig } from '../../types';

const { RangePicker } = DatePicker;
const { Option } = Select;

interface DynamicTableProps {
  // 表格配置
  config: TableConfig;

  // 数据源
  dataSource?: any[];
  loading?: boolean;

  // 分页配置
  pagination?: {
    current: number;
    pageSize: number;
    total: number;
    showSizeChanger?: boolean;
    showQuickJumper?: boolean;
    showTotal?: (total: number, range: [number, number]) => string;
  };

  // 搜索配置
  searchConfig?: {
    keyword?: {
      placeholder?: string;
      allowClear?: boolean;
    };
    filters?: Array<{
      key: string;
      label: string;
      type: 'select' | 'date' | 'dateRange';
      options?: Array<{ label: string; value: any }>;
      placeholder?: string;
    }>;
  } | undefined;

  // 操作配置
  actionConfig?: {
    create?: {
      show: boolean;
      text?: string;
      permission?: string;
    };
    export?: {
      show: boolean;
      text?: string;
      permission?: string;
    };
    import?: {
      show: boolean;
      text?: string;
      permission?: string;
    };
    refresh?: {
      show: boolean;
      text?: string;
    };
    setting?: {
      show: boolean;
      text?: string;
    };
  };

  // 额外操作按钮
  extraActions?: React.ReactNode;

  // 事件回调
  onSearch?: (params: PaginationParams) => void;
  onPageChange?: (current: number, pageSize: number) => void;
  onRefresh?: () => void;
  onCreate?: () => void;
  onView?: (record: any) => void;
  onEdit?: (record: any) => void;
  onDelete?: (record: any) => void;
  onExport?: () => void;
  onImport?: () => void;
  onCustomAction?: (action: string, record: any) => void;

  // 权限检查函数
  hasPermission?: (permission: string) => boolean;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  config,
  dataSource = [],
  loading = false,
  pagination,
  searchConfig,
  actionConfig,
  extraActions, // 添加extraActions
  onSearch,
  onPageChange,
  onRefresh,
  onCreate,
  onView,
  onEdit,
  onDelete,
  onExport,
  onImport,
  onCustomAction,
  hasPermission = () => true,
}) => {
  const [searchParams, setSearchParams] = useState<Record<string, any>>({});
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [columnSettings, setColumnSettings] = useState<Record<string, boolean>>(
    {}
  );
  const searchFormRef = useRef<any>();

  // 初始化列设置
  useEffect(() => {
    if (config.columns) {
      const settings: Record<string, boolean> = {};
      config.columns.forEach(col => {
        settings[col.key] = true;
      });
      setColumnSettings(settings);
    }
  }, [config.columns]);

  // 构建表格列
  const buildColumns = (): ColumnsType<any> => {
    const columns: ColumnsType<any> = [];

    // 基础列
    config.columns?.forEach(col => {
      if (!columnSettings[col.key]) return;

      const column: any = {
        title: col.title,
        dataIndex: col.dataIndex,
        key: col.key,
        width: col.width,
        fixed: col.fixed,
        sorter: col.sorter,
        filters: col.filters,
        render: col.render
          ? typeof col.render === 'string'
            ? getRenderFunction(col.render)
            : col.render
          : undefined,
      };

      columns.push(column);
    });

    // 操作列
    if (config.actions) {
      const actionColumn: any = {
        title: '操作',
        key: 'action',
        fixed: 'right',
        width: 200,
        render: (_: any, record: any) => {
          const actions: React.ReactNode[] = [];

          // 查看操作
          if (config.actions?.view && hasPermission('view')) {
            actions.push(
              <Tooltip title="查看" key="view">
                <Button
                  type="text"
                  size="small"
                  icon={<EyeOutlined />}
                  onClick={() => onView?.(record)}
                />
              </Tooltip>
            );
          }

          // 编辑操作
          if (config.actions?.edit && hasPermission('edit')) {
            actions.push(
              <Tooltip title="编辑" key="edit">
                <Button
                  type="text"
                  size="small"
                  icon={<EditOutlined />}
                  onClick={() => onEdit?.(record)}
                />
              </Tooltip>
            );
          }

          // 删除操作
          if (config.actions?.delete && hasPermission('delete')) {
            actions.push(
              <Popconfirm
                key="delete"
                title="确定要删除这条记录吗？"
                onConfirm={() => onDelete?.(record)}
                okText="确定"
                cancelText="取消"
              >
                <Tooltip title="删除">
                  <Button
                    type="text"
                    size="small"
                    danger
                    icon={<DeleteOutlined />}
                  />
                </Tooltip>
              </Popconfirm>
            );
          }

          // 自定义操作
          if (config.actions?.custom && config.actions.custom.length > 0) {
            const customActions = config.actions.custom.filter(
              action => !action.permission || hasPermission(action.permission)
            );

            if (customActions.length > 0) {
              const menu = (
                <Menu>
                  {customActions.map(action => (
                    <Menu.Item
                      key={action.key}
                      icon={action.icon ? getIcon(action.icon) : undefined}
                      onClick={() => onCustomAction?.(action.key, record)}
                    >
                      {action.title}
                    </Menu.Item>
                  ))}
                </Menu>
              );

              actions.push(
                <Dropdown overlay={menu} key="more">
                  <Button type="text" size="small" icon={<MoreOutlined />} />
                </Dropdown>
              );
            }
          }

          return <Space size="small">{actions}</Space>;
        },
      };

      columns.push(actionColumn);
    }

    return columns;
  };

  // 获取渲染函数
  const getRenderFunction = (renderName: string) => {
    const renderFunctions: Record<string, any> = {
      status: (status: number) => (
        <span className={status === 1 ? 'text-green-500' : 'text-red-500'}>
          {status === 1 ? '启用' : '禁用'}
        </span>
      ),
      date: (date: string) => (date ? new Date(date).toLocaleString() : '-'),
      // 可以根据需要添加更多渲染函数
    };

    return renderFunctions[renderName];
  };

  // 获取图标组件
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      edit: <EditOutlined />,
      delete: <DeleteOutlined />,
      view: <EyeOutlined />,
    };

    return icons[iconName];
  };

  // 处理搜索
  const handleSearch = () => {
    onSearch?.({
      current: 1,
      pageSize: pagination?.pageSize || 20,
      ...searchParams,
    });
  };

  // 重置搜索
  const handleReset = () => {
    setSearchParams({});
    searchFormRef.current?.resetFields();
    onSearch?.({
      current: 1,
      pageSize: pagination?.pageSize || 20,
    });
  };

  // 处理分页变化
  const handleTableChange: TableProps<any>['onChange'] = (
    paginationConfig,
    filters,
    sorter
  ) => {
    const current = paginationConfig?.current || 1;
    const pageSize = paginationConfig?.pageSize || 20;

    onPageChange?.(current, pageSize);
  };

  // 行选择配置
  const rowSelection = config.rowSelection
    ? {
      type: config.rowSelection.type as 'checkbox' | 'radio',
      selectedRowKeys,
      onChange: (keys: React.Key[], selectedRows: any[]) => {
        setSelectedRowKeys(keys);
        config.rowSelection?.onChange?.(keys, selectedRows);
      },
      getCheckboxProps: config.rowSelection.getCheckboxProps,
      onSelect: config.rowSelection.onSelect,
      onSelectAll: config.rowSelection.onSelectAll,
      onSelectInvert: config.rowSelection.onSelectInvert,
      onSelectNone: config.rowSelection.onSelectNone,
      selections: config.rowSelection.selections,
      hideSelectAll: config.rowSelection.hideSelectAll,
      preserveSelectedRowKeys: config.rowSelection.preserveSelectedRowKeys,
      columnWidth: config.rowSelection.columnWidth,
      columnTitle: config.rowSelection.columnTitle,
      fixed: config.rowSelection.fixed,
      renderCell: config.rowSelection.renderCell,
    }
    : undefined;

  // 渲染搜索表单
  const renderSearchForm = () => {
    if (!searchConfig) return null;

    return (
      <Card className="mb-4">
        <Row gutter={[16, 16]} ref={searchFormRef}>
          {/* 关键词搜索 */}
          {searchConfig.keyword && (
            <Col span={6}>
              <Input
                placeholder={searchConfig.keyword.placeholder || '请输入关键词'}
                allowClear={searchConfig.keyword.allowClear}
                prefix={<SearchOutlined />}
                value={searchParams.keyword}
                onChange={(e: any) =>
                  setSearchParams(prev => ({
                    ...prev,
                    keyword: e.target.value,
                  }))
                }
                onPressEnter={handleSearch}
              />
            </Col>
          )}

          {/* 自定义过滤器 */}
          {searchConfig.filters?.map(filter => (
            <Col span={6} key={filter.key}>
              {filter.type === 'select' && (
                <Select
                  placeholder={filter.placeholder || `请选择${filter.label}`}
                  allowClear
                  style={{ width: '100%' }}
                  value={searchParams[filter.key]}
                  onChange={(value: any) =>
                    setSearchParams(prev => ({ ...prev, [filter.key]: value }))
                  }
                >
                  {filter.options?.map(option => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              )}

              {filter.type === 'dateRange' && (
                <RangePicker
                  style={{ width: '100%' }}
                  value={searchParams[filter.key]}
                  onChange={(dates: any) =>
                    setSearchParams(prev => ({
                      ...prev,
                      [filter.key]: dates,
                    }))
                  }
                />
              )}
            </Col>
          ))}

          {/* 搜索按钮 */}
          <Col span={6}>
            <Space>
              <Button
                type="primary"
                icon={<SearchOutlined />}
                onClick={handleSearch}
              >
                搜索
              </Button>
              <Button onClick={handleReset}>重置</Button>
            </Space>
          </Col>
        </Row>
      </Card>
    );
  };

  // 渲染工具栏
  const renderToolbar = () => {
    const actions: React.ReactNode[] = [];

    // 新建按钮
    if (
      actionConfig?.create?.show &&
      hasPermission(actionConfig.create.permission || 'create')
    ) {
      actions.push(
        <Button
          key="create"
          type="primary"
          icon={<PlusOutlined />}
          onClick={onCreate}
        >
          {actionConfig.create.text || '新建'}
        </Button>
      );
    }

    // 导出按钮
    if (
      actionConfig?.export?.show &&
      hasPermission(actionConfig.export.permission || 'export')
    ) {
      actions.push(
        <Button key="export" icon={<ExportOutlined />} onClick={onExport}>
          {actionConfig.export.text || '导出'}
        </Button>
      );
    }

    // 导入按钮
    if (
      actionConfig?.import?.show &&
      hasPermission(actionConfig.import.permission || 'import')
    ) {
      actions.push(
        <Button key="import" icon={<ImportOutlined />} onClick={onImport}>
          {actionConfig.import.text || '导入'}
        </Button>
      );
    }

    // 刷新按钮
    if (actionConfig?.refresh?.show !== false) {
      actions.push(
        <Button key="refresh" icon={<ReloadOutlined />} onClick={onRefresh}>
          {actionConfig?.refresh?.text || '刷新'}
        </Button>
      );
    }

    // 设置按钮
    if (actionConfig?.setting?.show) {
      actions.push(
        <Button key="setting" icon={<SettingOutlined />}>
          {actionConfig?.setting?.text || '设置'}
        </Button>
      );
    }

    // 添加额外操作按钮
    if (extraActions) {
      actions.push(extraActions);
    }

    if (actions.length === 0) return null;

    return (
      <div className="mb-4 flex justify-between items-center">
        <Space>{actions}</Space>
        {selectedRowKeys.length > 0 && (
          <div className="text-gray-500">
            已选择 {selectedRowKeys.length} 项
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="dynamic-table">
      {renderSearchForm()}
      {renderToolbar()}

      <Table
        columns={buildColumns()}
        dataSource={dataSource}
        loading={loading}
        pagination={pagination}
        rowSelection={rowSelection}
        onChange={handleTableChange}
        scroll={{ x: 'max-content' }}
        size="middle"
        bordered
        {...config.pagination}
      />
    </div>
  );
};

export default DynamicTable;
