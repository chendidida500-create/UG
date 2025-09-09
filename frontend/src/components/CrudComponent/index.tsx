import { Modal, message } from 'antd';
import { useEffect, useRef, useState } from 'react';
import type {
  FormConfig,
  PaginationParams,
  TableConfig,
} from '../../types/index.js';
import DynamicForm, { type DynamicFormRef } from '../DynamicForm/index.js';
import DynamicTable from '../DynamicTable/index.js';

// 定义通用API响应格式
interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  data: T;
}

// 定义分页数据格式
interface PaginationData<T> {
  list: T[];
  pagination: {
    current: number;
    pageSize: number;
    total: number;
  };
}

// 定义搜索字段选项
interface SearchFieldOption {
  label: string;
  value: string | number;
}

// 定义搜索字段
interface SearchField {
  name: string;
  label: string;
  type: 'input' | 'select' | 'date' | 'dateRange';
  props?: {
    placeholder?: string;
    allowClear?: boolean;
    options?: SearchFieldOption[];
  };
}

// 定义baseFilter类型来替换any
interface BaseFilter {
  key: string;
  label: string;
  type: 'select' | 'date' | 'dateRange';
  options?: SearchFieldOption[];
  placeholder?: string;
}

// 定义API接口
interface CrudApi<T> {
  list: (params: PaginationParams) => Promise<ApiResponse<PaginationData<T>>>;
  create: (data: Partial<T>) => Promise<ApiResponse<T>>;
  update: (id: string, data: Partial<T>) => Promise<ApiResponse<T>>;
  delete: (id: string) => Promise<ApiResponse<void>>;
  detail?: (id: string) => Promise<ApiResponse<T>>;
}

// 定义权限配置
interface PermissionsConfig {
  view?: string;
  create?: string;
  update?: string;
  delete?: string;
}

// 定义自定义操作处理函数
type CustomActionHandler<T> = (action: string, record: T) => void;

// 定义数据预处理函数
type DataPreprocessor<T> = (
  values: Partial<T>,
  mode: 'create' | 'edit'
) => Partial<T>;
type DataPostprocessor<T> = (
  values: Partial<T>,
  mode: 'create' | 'edit'
) => void;

// 导出类型供其他组件使用，便于类型检查和复用
export type {
  FormConfig,
  PaginationParams,
  TableConfig,
} from '../../types/index.js';

interface CrudComponentProps<
  T extends Record<string, unknown> = Record<string, unknown>,
> {
  // 标题
  title: string;

  // 表格配置
  tableConfig: TableConfig;

  // 表单配置
  formConfig: FormConfig;

  // 搜索配置
  searchConfig?: {
    fields: SearchField[];
  };

  // API接口
  api: CrudApi<T>;

  // 权限配置
  permissions?: PermissionsConfig;

  // 权限检查函数
  hasPermission?: (permission: string) => boolean;

  // 自定义处理
  onCustomAction?: CustomActionHandler<T>;

  // 数据预处理
  beforeSubmit?: DataPreprocessor<T>;
  afterSubmit?: DataPostprocessor<T>;

  // 额外操作按钮
  extraActions?: React.ReactNode;
}

// 定义具有ID的记录类型
type RecordWithId<T> = T & { id: string };

const CrudComponent = <T extends Record<string, unknown>>(
  props: CrudComponentProps<T>
) => {
  const {
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
  } = props;

  const [dataSource, setDataSource] = useState<T[]>([]);
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
  const [modalMode, setModalMode] = useState<'create' | 'edit' | 'view'>(
    'create'
  );
  const [currentRecord, setCurrentRecord] = useState<T | null>(null);

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
    } catch (error: unknown) {
      const apiError = error as Error;
      message.error(apiError.message || '获取数据失败');
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
  const handleView = async (record: RecordWithId<T>) => {
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
  const handleEdit = async (record: RecordWithId<T>) => {
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
  const handleDelete = async (record: RecordWithId<T>) => {
    try {
      const response = await api.delete(record.id);
      if (response.success) {
        message.success('删除成功');
        handleRefresh();
      } else {
        message.error(response.message || '删除失败');
      }
    } catch (error: unknown) {
      const apiError = error as Error;
      message.error(apiError.message || '删除失败');
    }
  };

  // 自定义操作
  const handleCustomAction = (action: string, record: T) => {
    if (onCustomAction) {
      onCustomAction(action, record);
    }
  };

  // 表单提交
  const handleSubmit = async (values: Record<string, unknown>) => {
    try {
      // 数据预处理
      const processedValues =
        beforeSubmit && modalMode !== 'view'
          ? beforeSubmit(values as Partial<T>, modalMode)
          : (values as Partial<T>);

      let response: ApiResponse<T> | undefined;
      if (modalMode === 'create') {
        response = await api.create(processedValues);
      } else if (modalMode === 'edit' && currentRecord) {
        response = await api.update(
          (currentRecord as RecordWithId<T>).id,
          processedValues
        );
      }

      if (response && response.success) {
        setModalVisible(false);
        handleRefresh();

        // 后续处理
        if (afterSubmit && modalMode !== 'view') {
          afterSubmit(values as Partial<T>, modalMode);
        }
      } else {
        throw new Error(response?.message || '操作失败');
      }
    } catch (error: unknown) {
      const apiError = error as Error;
      throw apiError; // 让DynamicForm处理错误显示
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
        searchConfig={
          searchConfig
            ? {
                keyword: {
                  placeholder: `搜索${title}`,
                  allowClear: true,
                },
                filters: searchConfig.fields.map(field => {
                  // 创建一个符合 DynamicTable 期望类型的对象
                  const baseFilter: BaseFilter = {
                    key: field.name,
                    label: field.label,
                    type: field.type as 'select' | 'date' | 'dateRange',
                  };

                  // 根据是否有 options 和 placeholder 添加可选属性
                  if (field.props?.options) {
                    baseFilter.options = field.props.options;
                  }

                  if (field.props?.placeholder) {
                    baseFilter.placeholder = field.props.placeholder;
                  }

                  return baseFilter;
                }),
              }
            : undefined
        }
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
          initialValues={
            currentRecord
              ? (currentRecord as Record<string, unknown>)
              : ({} as Record<string, unknown>)
          }
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
