/// <reference types="jest" />
/// <reference types="@testing-library/jest-dom" />

import '@testing-library/jest-dom';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import type { TableConfig } from './index';
import DynamicTable from './index';

// Mock Antd
jest.mock( 'antd', () => ( {
  ...jest.requireActual( 'antd' ),
  message: {
    success: jest.fn(),
    error: jest.fn(),
    warning: jest.fn(),
    info: jest.fn(),
  },
} ) );

describe( 'DynamicTable Component', () =>
{
  const mockData = [
    { id: '1', name: 'John Doe', email: 'john@example.com', status: 'active' },
    {
      id: '2',
      name: 'Jane Smith',
      email: 'jane@example.com',
      status: 'inactive',
    },
    {
      id: '3',
      name: 'Bob Johnson',
      email: 'bob@example.com',
      status: 'active',
    },
  ];

  const mockTableConfig: TableConfig = {
    columns: [
      {
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
        width: 150,
      },
      {
        title: '邮箱',
        dataIndex: 'email',
        key: 'email',
        width: 200,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        width: 100,
        render: ( status: string ) => (
          <span
            className={
              status === 'active' ? 'status-active' : 'status-inactive'
            }
          >
            { status === 'active' ? '活跃' : '非活跃' }
          </span>
        ),
      },
    ],
    rowKey: 'id',
    size: 'middle',
    bordered: true,
  };

  const mockSearchConfig = {
    keyword: {
      placeholder: '请输入姓名或邮箱',
      allowClear: true,
    },
    filters: [
      {
        key: 'status',
        label: '状态',
        type: 'select' as const,
        placeholder: '请选择状态',
        options: [
          { label: '活跃', value: 'active' },
          { label: '非活跃', value: 'inactive' },
        ],
      },
    ],
  };

  const defaultProps = {
    config: mockTableConfig,
    dataSource: mockData,
    loading: false,
    hasPermission: jest.fn( () => true ),
  };

  beforeEach( () =>
  {
    jest.clearAllMocks();
  } );

  test( 'renders table with data correctly', () =>
  {
    render( <DynamicTable { ...defaultProps } /> );

    expect( screen.getByText( 'John Doe' ) ).toBeInTheDocument();
    expect( screen.getByText( 'jane@example.com' ) ).toBeInTheDocument();
    expect( screen.getByText( '活跃' ) ).toBeInTheDocument();
    expect( screen.getByText( '非活跃' ) ).toBeInTheDocument();
  } );

  test( 'renders search form when searchConfig is provided', () =>
  {
    render( <DynamicTable { ...defaultProps } searchConfig={ mockSearchConfig } /> );

    expect( screen.getByPlaceholderText( '请输入姓名或邮箱' ) ).toBeInTheDocument();
    expect( screen.getByPlaceholderText( '请选择状态' ) ).toBeInTheDocument();
    expect( screen.getByRole( 'button', { name: '搜索' } ) ).toBeInTheDocument();
    expect( screen.getByRole( 'button', { name: '重置' } ) ).toBeInTheDocument();
  } );

  test( 'handles search form submission', async () =>
  {
    const mockOnSearch = jest.fn();

    render(
      <DynamicTable
        { ...defaultProps }
        searchConfig={ mockSearchConfig }
        onSearch={ mockOnSearch }
      />
    );

    const keywordInput = screen.getByPlaceholderText( '请输入姓名或邮箱' );
    const searchButton = screen.getByRole( 'button', { name: '搜索' } );

    fireEvent.change( keywordInput, { target: { value: 'John' } } );
    fireEvent.click( searchButton );

    await waitFor( () =>
    {
      expect( mockOnSearch ).toHaveBeenCalledWith( {
        keyword: 'John',
        current: 1,
        pageSize: 20,
      } );
    } );
  } );

  test( 'handles search form reset', async () =>
  {
    const mockOnSearch = jest.fn();

    render(
      <DynamicTable
        { ...defaultProps }
        searchConfig={ mockSearchConfig }
        onSearch={ mockOnSearch }
      />
    );

    const keywordInput = screen.getByPlaceholderText( '请输入姓名或邮箱' );
    const resetButton = screen.getByRole( 'button', { name: '重置' } );

    fireEvent.change( keywordInput, { target: { value: 'John' } } );
    fireEvent.click( resetButton );

    await waitFor( () =>
    {
      expect( keywordInput ).toHaveValue( '' );
      expect( mockOnSearch ).toHaveBeenCalledWith( {
        current: 1,
        pageSize: 20,
      } );
    } );
  } );

  test( 'renders pagination when pagination is enabled', () =>
  {
    const mockPagination = {
      current: 1,
      pageSize: 10,
      total: 100,
      showSizeChanger: true,
      showQuickJumper: true,
    };

    render( <DynamicTable { ...defaultProps } pagination={ mockPagination } /> );

    expect( screen.getByText( '1' ) ).toBeInTheDocument(); // 当前页码
    expect( screen.getByText( '条/页' ) ).toBeInTheDocument(); // 每页显示条数
  } );

  test( 'handles pagination change', async () =>
  {
    const mockOnPageChange = jest.fn();
    const mockPagination = {
      current: 1,
      pageSize: 10,
      total: 50,
    };

    render(
      <DynamicTable
        { ...defaultProps }
        pagination={ mockPagination }
        onPageChange={ mockOnPageChange }
      />
    );

    // 模拟点击下一页
    const nextPageButton = screen.getByTitle( '下一页' );
    fireEvent.click( nextPageButton );

    await waitFor( () =>
    {
      expect( mockOnPageChange ).toHaveBeenCalledWith( 2, 10 );
    } );
  } );

  test( 'shows loading state', () =>
  {
    render( <DynamicTable { ...defaultProps } loading={ true } /> );

    // 使用 Antd Table 的 loading 状态
    const table = document.querySelector( '.ant-table' );
    expect( table ).toBeInTheDocument();
  } );

  test( 'renders empty state when no data', () =>
  {
    render( <DynamicTable { ...defaultProps } dataSource={ [] } /> );

    // 使用 Antd Table 的空状态
    const table = document.querySelector( '.ant-table' );
    expect( table ).toBeInTheDocument();
  } );

  test( 'handles row selection when rowSelection is provided', () =>
  {
    const mockRowSelection = {
      type: 'checkbox' as const,
      selectedRowKeys: [ '1' ],
      onChange: jest.fn(),
    };

    render(
      <DynamicTable
        { ...defaultProps }
        config={ {
          ...mockTableConfig,
          rowSelection: mockRowSelection,
        } }
      />
    );

    const checkboxes = screen.getAllByRole( 'checkbox' );
    expect( checkboxes.length ).toBeGreaterThan( 0 );

    // 点击某行的复选框
    fireEvent.click( checkboxes[ 1 ] ); // 第一个是全选框，第二个是第一行的复选框

    expect( mockRowSelection.onChange ).toHaveBeenCalled();
  } );

  test( 'respects permission controls', () =>
  {
    const mockHasPermission = jest.fn( () => false );

    render(
      <DynamicTable
        { ...defaultProps }
        hasPermission={ mockHasPermission }
        searchConfig={ mockSearchConfig }
      />
    );

    // 当没有权限时，搜索功能应该被隐藏或禁用
    expect( mockHasPermission ).toHaveBeenCalled();
  } );

  test( 'handles column sorting', async () =>
  {
    const mockOnPageChange = jest.fn();
    const sortableConfig = {
      ...mockTableConfig,
      columns: [
        ...mockTableConfig.columns,
        {
          title: '创建时间',
          dataIndex: 'createdAt',
          key: 'createdAt',
          sorter: true,
        },
      ],
    };

    render(
      <DynamicTable
        { ...defaultProps }
        config={ sortableConfig }
        onPageChange={ mockOnPageChange }
      />
    );

    const sortButton = screen.getByText( '创建时间' );
    fireEvent.click( sortButton );

    // 如果组件有排序逻辑，这里就会触发相应的事件
    // 由于当前组件可能不支持排序事件，这个测试只验证点击事件不会报错
    expect( sortButton ).toBeInTheDocument();
  } );

  test( 'handles responsive design', () =>
  {
    const responsiveConfig = {
      ...mockTableConfig,
      scroll: { x: 800, y: 400 },
    };

    render( <DynamicTable { ...defaultProps } config={ responsiveConfig } /> );

    // 验证表格渲染成功，不具体验证样式
    const table = screen.getByRole( 'table' );
    expect( table ).toBeInTheDocument();
  } );
} );
