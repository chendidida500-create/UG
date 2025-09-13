// 声明UMI相关模块
declare module 'umi' {
  export * from '@umijs/max';
}

declare module '@umijs/max' {
  // 导出UMI常用类型和函数
  export const history: {
    push: (to: string) => void;
    replace: (to: string) => void;
    goBack: () => void;
    location: {
      pathname: string;
      search: string;
      hash: string;
      state: unknown;
    };
  };

  export const request: {
    <T = unknown>(url: string, options?: unknown): Promise<T>;
    get: <T = unknown>(url: string, options?: unknown) => Promise<T>;
    post: <T = unknown>(url: string, options?: unknown) => Promise<T>;
    put: <T = unknown>(url: string, options?: unknown) => Promise<T>;
    delete: <T = unknown>(url: string, options?: unknown) => Promise<T>;
  };

  export function useNavigate(): (
    to: string,
    options?: { replace?: boolean; state?: unknown }
  ) => void;
  export function useLocation(): {
    pathname: string;
    search: string;
    hash: string;
    state: unknown;
    key: string;
  };
  export function useParams<
    T extends Record<string, string> = Record<string, string>,
  >(): T;
  export function useModel<T>(namespace: string): T;

  // 添加其他可能需要的导出
  export const Link: React.ComponentType<unknown>;
  export const Outlet: React.ComponentType;
  export function useAppData(): unknown;
  export function useRouteData(): unknown;
  export function useSearchParams(): [
    URLSearchParams,
    (params: Record<string, string>) => void,
  ];
  export function useSelectedRoutes(): unknown[];
  export const Helmet: React.ComponentType<any>;
}

// 声明CSS模块
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.sass' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.scss';
declare module '*.less';
declare module '*.sass';

// 声明图片模块
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.svg' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

// 声明Node.js类型
/// <reference types="node" />

// 声明环境变量
declare namespace NodeJS {
  interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'production' | 'test';
    readonly API_BASE_URL: string;
    readonly PORT: string;
  }
}

// 声明process对象
declare var process: NodeJS.Process;

// 为 Umi 内部模块添加声明
declare module '@@/core/pluginConfig' {
  export interface IConfigFromPlugins {
    // Umi 配置对象的类型定义
    [key: string]: any;
  }
}

declare module '@umijs/preset-umi' {
  export interface IConfig {
    // Umi 配置对象的类型定义
    [key: string]: any;
  }

  export interface Service {
    // Service 类型定义
    [key: string]: any;
  }
}

declare module '@umijs/bundler-webpack/compiled/express' {
  // Express 类型定义
  export interface RequestHandler {
    [key: string]: any;
  }

  // 模拟 Express 模块导出
  const express: any;
  export default express;
}

declare module '@umijs/core' {
  export interface IServicePluginAPI {
    // Service Plugin API 类型定义
    [key: string]: any;
  }

  export interface PluginAPI {
    // Plugin API 类型定义
    [key: string]: any;
  }

  export class Service {
    constructor(opts?: any);
    run2(opts: { name: string; args?: any }): Promise<void>;
  }
}

// 为 Ant Design 组件添加声明
declare module 'antd' {
  import * as React from 'react';

  // 导出所有需要的组件类型
  export const Table: React.ComponentType<any>;
  export const Button: React.ComponentType<any>;
  export const Space: React.ComponentType<any>;
  export const Tag: React.ComponentType<any>;
  export const Modal: React.ComponentType<any>;
  export const Form: React.ComponentType<any> & {
    useForm: () => [any, any];
    Item: React.ComponentType<any>;
  };
  export const Input: React.ComponentType<any> & {
    TextArea: React.ComponentType<any>;
  };
  export const message: {
    success: (content: string) => void;
    error: (content: string) => void;
    info: (content: string) => void;
    warning: (content: string) => void;
    loading: (content: string) => void;
  };
  export const Card: React.ComponentType<any>;
  export const Typography: {
    Title: React.ComponentType<any>;
    Paragraph: React.ComponentType<any>;
  };
  export const Select: React.ComponentType<any> & {
    Option: React.ComponentType<any>;
  };
  export const Popconfirm: React.ComponentType<any>;
  export const Row: React.ComponentType<any>;
  export const Col: React.ComponentType<any>;
  export const DatePicker: React.ComponentType<any>;
  export const Layout: React.ComponentType<any> & {
    Header: React.ComponentType<any>;
    Content: React.ComponentType<any>;
    Sider: React.ComponentType<any>;
    Footer: React.ComponentType<any>;
  };
  export const Menu: React.ComponentType<any>;
  export const Statistic: React.ComponentType<any>;
  export const Checkbox: React.ComponentType<any>;
  export const Tree: React.ComponentType<any>;
  export const Switch: React.ComponentType<any>;
  export const Progress: React.ComponentType<any>;
  export const InputNumber: React.ComponentType<any>;
}

declare module '@ant-design/icons' {
  import * as React from 'react';

  export const PlusOutlined: React.ComponentType<any>;
  export const EditOutlined: React.ComponentType<any>;
  export const DeleteOutlined: React.ComponentType<any>;
  export const UserSwitchOutlined: React.ComponentType<any>;
  export const EyeOutlined: React.ComponentType<any>;
  export const DashboardOutlined: React.ComponentType<any>;
  export const FileOutlined: React.ComponentType<any>;
  export const UserOutlined: React.ComponentType<any>;
  export const TeamOutlined: React.ComponentType<any>;
  export const SafetyCertificateOutlined: React.ComponentType<any>;
  export const MonitorOutlined: React.ComponentType<any>;
  export const BarChartOutlined: React.ComponentType<any>;
  export const SettingOutlined: React.ComponentType<any>;
  export const BookOutlined: React.ComponentType<any>;
  export const NotificationOutlined: React.ComponentType<any>;
  export const DownloadOutlined: React.ComponentType<any>;
  export const FileExcelOutlined: React.ComponentType<any>;
  export const FilePdfOutlined: React.ComponentType<any>;
  export const FileWordOutlined: React.ComponentType<any>;
  export const ApartmentOutlined: React.ComponentType<any>;
  export const SaveOutlined: React.ComponentType<any>;
  export const ReloadOutlined: React.ComponentType<any>;
  export const DesktopOutlined: React.ComponentType<any>;
  export const DatabaseOutlined: React.ComponentType<any>;
  export const CloudOutlined: React.ComponentType<any>;
  export const CheckCircleOutlined: React.ComponentType<any>;
  export const LockOutlined: React.ComponentType<any>;
}

// 修复React未定义错误 - 添加React命名空间声明
declare global {
  namespace React {
    interface ComponentType<P = {}> {
      (props: P): ReactElement<any, any> | null;
      new (props: P): Component<any, any>;
    }

    interface Component<P = {}, S = {}> {
      setState<K extends keyof S>(
        state:
          | ((
              prevState: Readonly<S>,
              props: Readonly<P>
            ) => Pick<S, K> | S | null)
          | (Pick<S, K> | S | null),
        callback?: () => void
      ): void;
    }

    interface ReactElement<
      P = any,
      T extends string | JSXElementConstructor<any> =
        | string
        | JSXElementConstructor<any>,
    > {
      type: T;
      props: P;
      key: Key | null;
    }

    type JSXElementConstructor<P> =
      | ((props: P) => ReactElement<any, any> | null)
      | (new (props: P) => Component<any, any>);

    type Key = string | number;
  }
}
