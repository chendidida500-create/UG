import type { FormConfig, TableConfig } from '../types/index.ts';

// 用户管理表格配置示例
export const userTableConfig: TableConfig = {
  columns: [
    {
      key: 'username',
      title: '用户名',
      dataIndex: 'username',
      width: 150,
      sorter: true,
    },
    {
      key: 'email',
      title: '邮箱',
      dataIndex: 'email',
      width: 200,
    },
    {
      key: 'nickname',
      title: '昵称',
      dataIndex: 'nickname',
      width: 150,
    },
    {
      key: 'phone',
      title: '手机号',
      dataIndex: 'phone',
      width: 150,
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: 'status',
      filters: [
        { text: '启用', value: 1 },
        { text: '禁用', value: 0 },
      ],
    },
    {
      key: 'created_at',
      title: '创建时间',
      dataIndex: 'created_at',
      width: 180,
      render: 'date',
      sorter: true,
    },
  ],
  pagination: {
    pageSize: 20,
    showSizeChanger: true,
    showQuickJumper: true,
  },
  rowSelection: {
    type: 'checkbox',
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
        permission: 'system:user:update',
      },
    ],
  },
};

// 用户表单配置示例
export const userFormConfig: FormConfig = {
  layout: 'vertical',
  fieldGroups: [
    {
      title: '基本信息',
      fields: ['username', 'email', 'nickname', 'phone'],
    },
    {
      title: '角色权限',
      fields: ['roleIds', 'status'],
    },
  ],
  fields: [
    {
      key: 'username',
      label: '用户名',
      type: 'input',
      required: true,
      span: 12,
      rules: [
        { min: 3, max: 50, message: '用户名长度为3-50个字符' },
        {
          pattern: /^[a-zA-Z0-9_]+$/,
          message: '用户名只能包含字母、数字和下划线',
        },
      ],
    },
    {
      key: 'email',
      label: '邮箱',
      type: 'input',
      required: true,
      span: 12,
      rules: [{ type: 'email', message: '请输入有效的邮箱地址' }],
    },
    {
      key: 'nickname',
      label: '昵称',
      type: 'input',
      span: 12,
      props: {
        maxLength: 50,
      },
    },
    {
      key: 'phone',
      label: '手机号',
      type: 'input',
      span: 12,
      rules: [{ pattern: /^1[3-9]\d{9}$/, message: '请输入有效的手机号码' }],
    },
    {
      key: 'roleIds',
      label: '分配角色',
      type: 'select',
      span: 12,
      props: {
        mode: 'multiple',
        allowClear: true,
      },
      options: [], // 动态加载角色选项
    },
    {
      key: 'status',
      label: '账户状态',
      type: 'radio',
      span: 12,
      options: [
        { label: '启用', value: 1 },
        { label: '禁用', value: 0 },
      ],
    },
  ],
};

// 角色管理表格配置
export const roleTableConfig: TableConfig = {
  columns: [
    {
      key: 'name',
      title: '角色名称',
      dataIndex: 'name',
      width: 150,
    },
    {
      key: 'code',
      title: '角色编码',
      dataIndex: 'code',
      width: 150,
    },
    {
      key: 'description',
      title: '描述',
      dataIndex: 'description',
      width: 200,
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: 'status',
    },
    {
      key: 'created_at',
      title: '创建时间',
      dataIndex: 'created_at',
      width: 180,
      render: 'date',
    },
  ],
  actions: {
    view: true,
    edit: true,
    delete: true,
    custom: [
      {
        key: 'permissions',
        title: '权限配置',
        icon: 'edit',
        permission: 'system:role:update',
      },
    ],
  },
};

// 角色表单配置
export const roleFormConfig: FormConfig = {
  layout: 'vertical',
  fields: [
    {
      key: 'name',
      label: '角色名称',
      type: 'input',
      required: true,
      span: 12,
      rules: [{ min: 2, max: 50, message: '角色名称长度为2-50个字符' }],
    },
    {
      key: 'code',
      label: '角色编码',
      type: 'input',
      required: true,
      span: 12,
      tooltip: '角色编码用于权限判断，创建后不建议修改',
      rules: [
        { min: 2, max: 50, message: '角色编码长度为2-50个字符' },
        {
          pattern: /^[a-zA-Z0-9_]+$/,
          message: '角色编码只能包含字母、数字和下划线',
        },
      ],
    },
    {
      key: 'description',
      label: '角色描述',
      type: 'textarea',
      span: 24,
      props: {
        maxLength: 200,
      },
    },
    {
      key: 'permissionIds',
      label: '权限配置',
      type: 'tree-select',
      span: 24,
      props: {
        treeCheckable: true,
        showCheckedStrategy: 'SHOW_PARENT',
        placeholder: '请选择权限',
        treeDefaultExpandAll: true,
      },
      options: [], // 动态加载权限树
    },
  ],
};

// 权限管理表格配置
export const permissionTableConfig: TableConfig = {
  columns: [
    {
      key: 'name',
      title: '权限名称',
      dataIndex: 'name',
      width: 200,
    },
    {
      key: 'code',
      title: '权限编码',
      dataIndex: 'code',
      width: 200,
    },
    {
      key: 'type',
      title: '权限类型',
      dataIndex: 'type',
      width: 100,
      filters: [
        { text: '菜单', value: 'menu' },
        { text: '按钮', value: 'button' },
        { text: '接口', value: 'api' },
      ],
    },
    {
      key: 'path',
      title: '路由路径',
      dataIndex: 'path',
      width: 200,
    },
    {
      key: 'sort',
      title: '排序',
      dataIndex: 'sort',
      width: 80,
    },
    {
      key: 'status',
      title: '状态',
      dataIndex: 'status',
      width: 100,
      render: 'status',
    },
  ],
  actions: {
    view: true,
    edit: true,
    delete: true,
  },
};

// 权限表单配置
export const permissionFormConfig: FormConfig = {
  layout: 'vertical',
  fieldGroups: [
    {
      title: '基本信息',
      fields: ['name', 'code', 'type', 'parent_id'],
    },
    {
      title: '菜单配置',
      fields: ['path', 'component', 'icon', 'sort'],
    },
    {
      title: '其他设置',
      fields: ['description'],
    },
  ],
  fields: [
    {
      key: 'name',
      label: '权限名称',
      type: 'input',
      required: true,
      span: 12,
    },
    {
      key: 'code',
      label: '权限编码',
      type: 'input',
      required: true,
      span: 12,
      tooltip: '权限编码用于代码中的权限判断',
    },
    {
      key: 'type',
      label: '权限类型',
      type: 'select',
      required: true,
      span: 12,
      options: [
        { label: '菜单权限', value: 'menu' },
        { label: '按钮权限', value: 'button' },
        { label: '接口权限', value: 'api' },
      ],
    },
    {
      key: 'parent_id',
      label: '父权限',
      type: 'tree-select',
      span: 12,
      props: {
        placeholder: '请选择父权限',
        allowClear: true,
      },
      options: [], // 动态加载权限树
    },
    {
      key: 'path',
      label: '路由路径',
      type: 'input',
      span: 12,
      tooltip: '菜单权限的路由路径',
    },
    {
      key: 'component',
      label: '组件路径',
      type: 'input',
      span: 12,
      tooltip: '菜单权限对应的组件路径',
    },
    {
      key: 'icon',
      label: '图标',
      type: 'input',
      span: 12,
      tooltip: '菜单图标名称',
    },
    {
      key: 'sort',
      label: '排序',
      type: 'number',
      span: 12,
      props: {
        min: 0,
        max: 9999,
      },
    },
    {
      key: 'description',
      label: '权限描述',
      type: 'textarea',
      span: 24,
      props: {
        maxLength: 200,
      },
    },
  ],
};
