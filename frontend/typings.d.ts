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
declare let process: NodeJS.Process;

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
