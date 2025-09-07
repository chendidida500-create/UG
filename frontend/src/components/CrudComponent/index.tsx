import { Modal, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import type { FormConfig, PaginationParams, TableConfig } from '../../types';
import DynamicForm, { type DynamicFormRef } from '../DynamicForm';
import DynamicTable from '../DynamicTable';

// 导出类型供其他组件使用
export type { FormConfig, PaginationParams, TableConfig } from '../../types';

interface CrudComponentProps {
  // 标题
  title: string;

  // 表格配置
  tableConfig: TableConfig;

  // 表单配置
  formConfig: FormConfig;

  // 搜索配置
  searchConfig?: {
    fields: Array<{
      name: string;
      label: string;
      type: 'input' | 'select' | 'date' | 'dateRange';
      props?: {
        placeholder?: string;
        allowClear?: boolean;
        options?: Array<{ label: string; value: any }>;
      };
    }>;
  };

  // API接口
  api: {
    list: (params: PaginationParams) => Promise<any>;
    create: (data: any) => Promise<any>;
    update: (id: string, data: any) => Promise<any>;
    delete: (id: string) => Promise<any>;
    detail?: (id: string) => Promise<any>;
  };

  // 权限配置
  permissions?: {
    view?: string;
    create?: string;
    update?: string;
    delete?: string;
  };

  // 权限检查函数
  hasPermission?: (permission: string) => boolean;

  // 自定义处理
  onCustomAction?: (action: string, record: any) => void;

  // 数据预处理
  beforeSubmit?: (values: any, mode: 'create' | 'edit') => any;
  afterSubmit?: (values: any, mode: 'create' | 'edit') => void;

  // 额外操作按钮
  extraActions?: React.ReactNode;
}

const CrudComponent = ({
  title,
  tableConfig,
  formConfig,
  searchConfig,
  api,
  permissions = {},
  hasPermission = () => true,
  onCustomAction,
  beforeSubmit,
  afterSubmit,
  extraActions,
}: CrudComponentProps) => {
  const [dataSource, setDataSource] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [pagination, setPagination] = useState<{
    current: number;
    pageSize: number;
    total: number;
  }>({
    current: 1,
    pageSize: 20,
    total: 0,
  });
  const [searchParams, setSearchParams] = useState<PaginationParams>({});

  // 弹窗状态
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>('create');
  const [currentRecord, setCurrentRecord] = useState<any>(null);

  const formRef = useRef<DynamicFormRef | null>(null);

  // 加载数据
  const loadData = async (params?: PaginationParams) => {
    setLoading(true);
    try {
      const queryParams = {
        current: pagination.current,
        pageSize: pagination.pageSize,
        ...searchParams,
        ...params,
      };

      const response = await api.list(queryParams);

      if (response.success) {
        setDataSource(response.data.list || []);
        setPagination({
          ...pagination,
          total: response.data.pagination?.total || 0,
          current: response.data.pagination?.current || 1,
          pageSize: response.data.pagination?.pageSize || 20,
        });
      } else {
        message.error(response.message || '获取数据失败');
      }
    } catch (error: any) {
      message.error(error.message || '获取数据失败');
    } finally {
      setLoading(false);
    }
  };

  // 初始化数据
  useEffect(() => {
    loadData();
  }, []);

  // 搜索
  const handleSearch = (params: PaginationParams) => {
    setSearchParams(params);
    setPagination({ ...pagination, current: 1 });
    loadData({ ...params, current: 1 });
  };

  // 分页变化
  const handlePageChange = (current: number, pageSize: number) => {
    setPagination({ ...pagination, current, pageSize });
    loadData({ ...searchParams, current, pageSize });
  };

  // 刷新
  const handleRefresh = () => {
    loadData({ ...searchParams, current: pagination.current });
  };

  // 新建
  const handleCreate = () => {
    setModalMode('create');
    setCurrentRecord(null);
    setModalVisible(true);
  };

  // 查看
  const handleView = async (record: any) => {
    if (api.detail) {
      try {
        const response = await api.detail(record.id);
        if (response.success) {
          setCurrentRecord(response.data);
        } else {
          setCurrentRecord(record);
        }
      } catch (error) {
        setCurrentRecord(record);
      }
    } else {
      setCurrentRecord(record);
    }

    setModalMode('view');
    setModalVisible(true);
  };

  // 编辑
  const handleEdit = async (record: any) => {
    if (api.detail) {
      try {
        const response = await api.detail(record.id);
        if (response.success) {
          setCurrentRecord(response.data);
        } else {
          setCurrentRecord(record);
        }
      } catch (error) {
        setCurrentRecord(record);
      }
    } else {
      setCurrentRecord(record);
    }

    setModalMode('edit');
    setModalVisible(true);
  };

  // 删除
  const handleDelete = async (record: any) => {
    try {
      const response = await api.delete(record.id);
      if (response.success) {
        message.success('删除成功');
        handleRefresh();
      } else {
        message.error(response.message || '删除失败');
      }
    } catch (error: any) {
      message.error(error.message || '删除失败');
    }
  };

  // 自定义操作
  const handleCustomAction = (action: string, record: any) => {
    if (onCustomAction) {
      onCustomAction(action, record);
    }
  };

  // 表单提交
  const handleSubmit = async (values: any) => {
    try {
      // 数据预处理
      const processedValues =
        beforeSubmit && modalMode !== 'view'
          ? beforeSubmit(values, modalMode)
          : values;

      let response;
      if (modalMode === 'create') {
        response = await api.create(processedValues);
      } else if (modalMode === 'edit') {
        response = await api.update(currentRecord.id, processedValues);
      }

      if (response && response.success) {
        setModalVisible(false);
        handleRefresh();

        // 后续处理
        if (afterSubmit && modalMode !== 'view') {
          afterSubmit(values, modalMode);
        }
      } else {
        throw new Error(response?.message || '操作失败');
      }
    } catch (error: any) {
      throw error; // 让DynamicForm处理错误显示
    }
  };

  // 取消弹窗
  const handleCancel = () => {
    setModalVisible(false);
    setCurrentRecord(null);
  };

  return (
    <div className="crud-component">
      <DynamicTable
        config={tableConfig}
        dataSource={dataSource}
        loading={loading}
        pagination={pagination}
        searchConfig={searchConfig ? {
          keyword: {
            placeholder: `搜索${title}`,
            allowClear: true,
          },
          filters: searchConfig.fields.map(field => ({
            key: field.name,
            label: field.label,
            type: field.type as 'select' | 'date' | 'dateRange',
            options: field.props?.options,
            placeholder: field.props?.placeholder,
          }))
        } : undefined}
        actionConfig={{
          create: {
            show: hasPermission(permissions.create || 'create'),
            text: `新建${title}`,
          },
          refresh: {
            show: true,
          },
        }}
        extraActions={extraActions}
        onSearch={handleSearch}
        onPageChange={handlePageChange}
        onRefresh={handleRefresh}
        onCreate={handleCreate}
        onView={handleView}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onCustomAction={handleCustomAction}
        hasPermission={hasPermission}
      />

      <Modal
        title={`${modalMode === 'create' ? '新建' : modalMode === 'edit' ? '编辑' : '查看'}${title}`}
        open={modalVisible}
        onCancel={handleCancel}
        footer={null}
        width={800}
        destroyOnClose
      >
        <DynamicForm
          ref={formRef}
          config={formConfig}
          initialValues={currentRecord}
          mode={modalMode}
          onSubmit={handleSubmit}
          onCancel={handleCancel}
          hasPermission={hasPermission}
        />
      </Modal>
    </div>
  );
};

export default CrudComponent;