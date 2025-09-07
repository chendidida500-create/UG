// 全局类型声明文件

/// <reference types="@testing-library/jest-dom" />

// Testing Library React 类型声明
declare module '@testing-library/react' {
  export function render(component: React.ReactElement): any;
  export const screen: {
    getByText: (text: string) => any;
    getByPlaceholderText: (text: string) => any;
    getByRole: (role: string, options?: any) => any;
    getByTitle: (title: string) => any;
    getAllByRole: (role: string, options?: any) => any[];
    [key: string]: any;
  };
  export function fireEvent(element: any, eventProperties?: any): boolean;
  export namespace fireEvent {
    export function click(element: any): boolean;
    export function change(element: any, eventProperties?: any): boolean;
    export function submit(element: any): boolean;
  }
  export function waitFor(callback: () => void, options?: any): Promise<void>;
}

declare module 'antd' {
  // Form组件
  export interface FormInstance {
    validateFields: () => Promise<any>;
    setFieldsValue: (values: any) => void;
    getFieldsValue: () => any;
    resetFields: () => void;
    [key: string]: any;
  }

  // 导出所有antd组件
  export const Form: any;
  export const Input: any;
  export const Select: any;
  export const Button: any;
  export const Modal: any;
  export const Table: any;
  export const Card: any;
  export const Row: any;
  export const Col: any;
  export const Space: any;
  export const Dropdown: any;
  export const Menu: any;
  export const Popconfirm: any;
  export const Tooltip: any;
  export const DatePicker: any;
  export const Upload: any;
  export const InputNumber: any;
  export const Switch: any;
  export const Cascader: any;
  export const TreeSelect: any;
  export const TimePicker: any;
  export const Rate: any;
  export const Slider: any;
  export const Radio: any;
  export const Checkbox: any;
  export const Divider: any;
  export const Tag: any;
  export const Typography: any;
  export const Statistic: any;
  export const Tree: any;
  export const Spin: any;
  export const Badge: any;
  export const Breadcrumb: any;
  export const Drawer: any;
  export const Layout: any;
  export const Tabs: any;
  export const Menu: any;
  export const Avatar: any;
  export const message: any;
  export const Descriptions: any;
  export const List: any;
  export const Steps: any; // 添加Steps组件声明
  export const Progress: any; // 添加Progress组件声明
}

declare module '@ant-design/icons' {
  export const CalendarOutlined: any;
  export const CameraOutlined: any;
  export const HistoryOutlined: any;
  export const UploadOutlined: any;
  export const InboxOutlined: any;
  export const SearchOutlined: any;
  export const ReloadOutlined: any;
  export const PlusOutlined: any;
  export const EditOutlined: any;
  export const DeleteOutlined: any;
  export const EyeOutlined: any;
  export const MoreOutlined: any;
  export const ExportOutlined: any;
  export const ImportOutlined: any;
  export const SettingOutlined: any;
  export const ApiOutlined: any;
  export const ControlOutlined: any;
  export const FileOutlined: any;
  export const FolderOutlined: any;
  export const MenuOutlined: any;
  export const SafetyCertificateOutlined: any;
  export const LoadingOutlined: any;
  export const UserOutlined: any;
  export const LockOutlined: any;
  export const MailOutlined: any;
  export const PhoneOutlined: any;
  export const TeamOutlined: any;
  export const DashboardOutlined: any;
  export const ProfileOutlined: any;
  export const LogoutOutlined: any;
  export const HomeOutlined: any;
  export const BellOutlined: any;
  export const MenuFoldOutlined: any;
  export const MenuUnfoldOutlined: any;
  export const GlobalOutlined: any;
  export const CaretDownOutlined: any; // 添加缺失的图标声明
  export const CaretUpOutlined: any; // 添加缺失的图标声明
  export const CheckCircleOutlined: any; // 添加缺失的图标声明
  export const ClockCircleOutlined: any; // 添加缺失的图标声明
  export const ExclamationCircleOutlined: any; // 添加缺失的图标声明
  export const UnlockOutlined: any; // 添加缺失的图标声明
}

declare module 'antd/es/form' {
  export interface FormInstance {
    validateFields: () => Promise<any>;
    setFieldsValue: (values: any) => void;
    getFieldsValue: () => any;
    resetFields: () => void;
    [key: string]: any;
  }
  export interface FormProps {
    [key: string]: any;
  }
}

declare module 'antd/es/table' {
  export interface ColumnsType<T> extends Array<any> {}
  export interface TableProps<T> {
    onChange?: (pagination: any, filters: any, sorter: any) => void;
    [key: string]: any;
  }
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.less' {
  const content: any;
  export default content;
}

declare module '*.css' {
  const content: any;
  export default content;
}

// Jest DOM 扩展
declare global {
  namespace jest {
    interface Matchers<R> {
      toBeInTheDocument(): R;
      toHaveValue(value?: string | number | string[]): R;
      toBeVisible(): R;
      toHaveStyle(style: string | Record<string, any>): R;
    }
  }
}
