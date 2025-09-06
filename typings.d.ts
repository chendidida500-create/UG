// UMI 4.x 类型声明文件
declare module 'umi' {
  // React Router 相关
  export const Outlet: React.ComponentType<any>;
  export const Link: React.ComponentType<any>;
  export const NavLink: React.ComponentType<any>;

  // UMI History API
  export const history: {
    push: (path: string) => void;
    replace: (path: string) => void;
    go: (delta: number) => void;
    goBack: () => void;
    goForward: () => void;
    block: (prompt?: boolean | string | ((location: any, action: any) => string | boolean)) => void;
    location: {
      pathname: string;
      search: string;
      hash: string;
      state?: any;
    };
    listen: (listener: (location: any, action: any) => void) => () => void;
  };

  // UMI Model Hook
  export const useModel: <T = any>(namespace: string) => T;

  // UMI Request
  export const request: <T = any>(url: string, options?: any) => Promise<T>;

  // UMI Access
  export const useAccess: () => any;
  export const Access: React.ComponentType<{
    accessible?: boolean;
    fallback?: React.ReactNode;
    children: React.ReactNode;
  }>;

  // UMI Plugin API
  export const getLocale: () => string;
  export const setLocale: (locale: string, realReload?: boolean) => void;
  export const useIntl: () => any;
  export const FormattedMessage: React.ComponentType<any>;

  // UMI Layout
  export const useLocation: () => {
    pathname: string;
    search: string;
    hash: string;
    state?: any;
  };

  export const useNavigate: () => (to: string | number, options?: any) => void;
  export const useParams: <T = any>() => T;
  export const useSearchParams: () => [URLSearchParams, (params: URLSearchParams) => void];
}

// React 类型扩展
declare global {
  namespace JSX {
    interface IntrinsicElements {
      div: any;
      p: any;
      span: any;
      a: any;
      img: any;
      button: any;
      input: any;
      form: any;
      label: any;
      h1: any;
      h2: any;
      h3: any;
      h4: any;
      h5: any;
      h6: any;
      ul: any;
      li: any;
      ol: any;
      [elemName: string]: any;
    }
  }

  namespace React {
    export interface FC<P = {}> {
      (props: P): ReactElement | null;
      displayName?: string;
    }

    export interface ReactElement<P = any, T extends string | JSXElementConstructor<any> = string | JSXElementConstructor<any>> {
      type: T;
      props: P;
      key: Key | null;
    }

    export type ReactNode = ReactElement | string | number | ReactFragment | ReactPortal | boolean | null | undefined;

    export interface ReactFragment {
      [key: string]: any;
    }

    export interface ReactPortal {
      [key: string]: any;
    }

    export interface CSSProperties {
      [key: string]: any;
    }

    export type JSXElementConstructor<P> = ((props: P) => ReactElement | null) | (new (props: P) => Component<any, any>);
    export type Key = string | number;

    export class Component<P = {}, S = {}> {
      props: Readonly<P>;
      state: Readonly<S>;
      constructor(props: P);
      render(): ReactNode;
    }

    // Hook 类型
    export function useState<S>(initialState: S | (() => S)): [S, (value: S | ((prevState: S) => S)) => void];
    export function useEffect(effect: () => void | (() => void), deps?: any[]): void;
    export function useRef<T>(initialValue: T): { current: T };
    export function useImperativeHandle<T>(ref: any, createHandle: () => T, deps?: any[]): void;
    export function forwardRef<T, P = {}>(render: (props: P, ref: React.Ref<T>) => ReactElement | null): React.ForwardRefExoticComponent<P & React.RefAttributes<T>>;
  }
}

// CSS Modules 类型声明
declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.less' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

// 图片资源类型声明
declare module '*.png' {
  const src: string;
  export default src;
}

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.gif' {
  const src: string;
  export default src;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

declare module '*.webp' {
  const src: string;
  export default src;
}

// 其他资源文件
declare module '*.json' {
  const value: any;
  export default value;
}

// umi-request 类型声明
declare module 'umi-request' {
  export function extend(options: any): any;
  export default function request(url: string, options?: any): Promise<any>;
}

// 全局类型定义
declare global {
  interface Window {
    // 可以在这里添加全局的window属性类型
  }

  // 常用工具类型
  type Nullable<T> = T | null;
  type Optional<T> = T | undefined;
  type StringOrUndefined = string | undefined;
  type SafeString = string | null | undefined;
}

export { };
