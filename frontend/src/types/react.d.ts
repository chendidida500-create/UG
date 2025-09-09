// Type definitions for React
declare module 'react' {
  export const useState: <S>(
    initialState: S | (() => S)
  ) => [S, Dispatch<SetStateAction<S>>];
  export const useEffect: (
    effect: EffectCallback,
    deps?: DependencyList
  ) => void;
  export const useRef: <T>(initialValue: T) => MutableRefObject<T>;
  export const useContext: <T>(context: Context<T>) => T;
  export const useReducer: <S, A>(
    reducer: Reducer<S, A>,
    initialState: S,
    initializer?: (arg: S) => S
  ) => [S, Dispatch<A>];
  export const useCallback: <T extends Function>(
    callback: T,
    deps: DependencyList
  ) => T;
  export const useMemo: <T>(
    factory: () => T,
    deps: DependencyList | undefined
  ) => T;
  export const useLayoutEffect: (
    effect: EffectCallback,
    deps?: DependencyList
  ) => void;
  export const useImperativeHandle: <T>(
    ref: Ref<T> | undefined,
    init: () => T,
    deps?: DependencyList
  ) => void;
  export const useDebugValue: <T>(
    value: T,
    formatter?: (value: T) => any
  ) => void;
  export const useDeferredValue: <T>(value: T) => T;
  export const useTransition: () => [boolean, (callback: () => void) => void];
  export const useId: () => string;
  export const createElement: typeof _createElement;
  export const cloneElement: typeof _cloneElement;
  export const createFactory: typeof _createFactory;
  export const isValidElement: (object: any) => object is ReactElement;
  export const Fragment: ExoticComponent<{ children?: ReactNode }>;
  export const StrictMode: ExoticComponent<{ children?: ReactNode }>;
  export const Suspense: ExoticComponent<{
    children?: ReactNode;
    fallback?: ReactNode;
  }>;
  export const memo: typeof _memo;
  export const forwardRef: typeof _forwardRef;
  export const createContext: <T>(defaultValue: T) => Context<T>;
  export const Component: typeof _Component;
  export const PureComponent: typeof _PureComponent;
  export type FC<P = {}> = FunctionComponent<P>;
  export interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P>;
    contextTypes?: ValidationMap<any>;
    defaultProps?: Partial<P>;
    displayName?: string;
  }

  // 确保 ReactNode 类型被正确导出
  export type ReactNode =
    | ReactElement
    | string
    | number
    | ReactFragment
    | ReactPortal
    | boolean
    | null
    | undefined;
  export type ReactElement<
    P = unknown,
    T extends string | JSXElementConstructor<any> =
      | string
      | JSXElementConstructor<any>,
  > = {
    type: T;
    props: P;
    key: Key | null;
  };
  export type ReactFragment = {} | ReactNodeArray;
  export interface ReactNodeArray extends Array<ReactNode> {}
  export interface ReactPortal extends ReactElement {
    key: string | null;
    children: ReactNode;
  }
  export type Key = string | number;
  export type JSXElementConstructor<P> =
    | ((props: P) => ReactElement | null)
    | (new (props: P) => Component<any, any>);

  // 修复：将 React 定义为一个命名空间而不是函数
  export namespace React {
    // 添加缺失的属性
    export const version: string;
    export const createElement: typeof _createElement;
    export const cloneElement: typeof _cloneElement;
    export const createFactory: typeof _createFactory;
    export const isValidElement: (object: any) => object is ReactElement;
    export const Fragment: ExoticComponent<{ children?: ReactNode }>;
    export const StrictMode: ExoticComponent<{ children?: ReactNode }>;
    export const Suspense: ExoticComponent<{
      children?: ReactNode;
      fallback?: ReactNode;
    }>;

    // 确保 ReactNode 在命名空间中也可访问
    export type ReactNode =
      | ReactElement
      | string
      | number
      | ReactFragment
      | ReactPortal
      | boolean
      | null
      | undefined;
    // ... 其他属性
  }

  // 添加默认导出，使其成为一个包含所有属性的对象
  const React: {
    useState: <S>(
      initialState: S | (() => S)
    ) => [S, Dispatch<SetStateAction<S>>];
    useEffect: (effect: EffectCallback, deps?: DependencyList) => void;
    useRef: <T>(initialValue: T) => MutableRefObject<T>;
    useContext: <T>(context: Context<T>) => T;
    useReducer: <S, A>(
      reducer: Reducer<S, A>,
      initialState: S,
      initializer?: (arg: S) => S
    ) => [S, Dispatch<A>];
    useCallback: <T extends Function>(callback: T, deps: DependencyList) => T;
    useMemo: <T>(factory: () => T, deps: DependencyList | undefined) => T;
    useLayoutEffect: (effect: EffectCallback, deps?: DependencyList) => void;
    useImperativeHandle: <T>(
      ref: Ref<T> | undefined,
      init: () => T,
      deps?: DependencyList
    ) => void;
    useDebugValue: <T>(value: T, formatter?: (value: T) => any) => void;
    useDeferredValue: <T>(value: T) => T;
    useTransition: () => [boolean, (callback: () => void) => void];
    useId: () => string;
    createElement: typeof _createElement;
    cloneElement: typeof _cloneElement;
    createFactory: typeof _createFactory;
    isValidElement: (object: any) => object is ReactElement;
    Fragment: ExoticComponent<{ children?: ReactNode }>;
    StrictMode: ExoticComponent<{ children?: ReactNode }>;
    Suspense: ExoticComponent<{ children?: ReactNode; fallback?: ReactNode }>;
    memo: typeof _memo;
    forwardRef: typeof _forwardRef;
    createContext: <T>(defaultValue: T) => Context<T>;
    Component: typeof _Component;
    PureComponent: typeof _PureComponent;
    version: string;
  };

  export default React;
}

declare module 'react-router-dom' {
  export const BrowserRouter: ComponentType<
    RouteComponentProps<{}, StaticContext, unknown>
  >;
  export const HashRouter: ComponentType<
    RouteComponentProps<{}, StaticContext, unknown>
  >;
  export const Link: ComponentType<LinkProps>;
  export const NavLink: ComponentType<NavLinkProps>;
  export const Navigate: ComponentType<NavigateProps>;
  export const Outlet: ComponentType<{}>;
  export const Route: ComponentType<RouteProps>;
  export const Routes: ComponentType<RoutesProps>;
  export const useLocation: () => Location;
  export const useNavigate: () => NavigateFunction;
  export const useParams: <K extends string = string>() => Readonly<Params<K>>;
  export const useSearchParams: () => [URLSearchParams, SetURLSearchParams];
  export const useMatch: (pattern: PathPattern | string) => PathMatch | null;
  export const useResolvedPath: (to: To) => Path;
  export const useHref: (to: To) => string;
  export const useLinkClickHandler: <S>(
    to: To,
    options?: {
      replace?: boolean;
      state?: S;
      target?: React.HTMLAttributeAnchorTarget;
    }
  ) => (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
  export const useNavigateStable: () => NavigateFunction;
  export const useOutlet: () => ReactElement | null;
  export const useOutletContext: <T = unknown>() => T;
  export const useRoutes: (
    routes: RouteObject[],
    location?: Partial<Location> | string
  ) => ReactElement | null;
  export const useSearchParamsStable: () => [
    URLSearchParams,
    SetURLSearchParams,
  ];
}

declare namespace React {
  interface ReactElement<
    P = unknown,
    T extends string | React.ComponentType<any> =
      | string
      | React.ComponentType<any>,
  > {
    type: T;
    props: P;
    key: string | null;
  }

  interface ComponentType<P = {}> {
    (props: P): ReactElement<any, any> | null;
    propTypes?: WeakValidationMap<P>;
    contextTypes?: ValidationMap<any>;
    defaultProps?: Partial<P>;
    displayName?: string;
  }

  interface ComponentClass<P = {}, S = any> extends ComponentType<P> {
    new (props: P, context?: any): Component<P, S>;
    propTypes?: WeakValidationMap<P>;
    contextTypes?: ValidationMap<any>;
    childContextTypes?: ValidationMap<any>;
    defaultProps?: Partial<P>;
    displayName?: string;
  }

  interface Component<P = {}, S = any> {
    setState<K extends keyof S>(
      state:
        | ((
            prevState: Readonly<S>,
            props: Readonly<P>
          ) => Pick<S, K> | S | null)
        | (Pick<S, K> | S | null),
      callback?: () => void
    ): void;
    forceUpdate(callback?: () => void): void;
    render(): ReactNode;
    readonly props: Readonly<P> & Readonly<{ children?: ReactNode }>;
    state: Readonly<S>;
    refs: {
      [key: string]: any;
    };
  }

  type ReactFragment = {} | ReactNodeArray;
  interface ReactNodeArray extends Array<ReactNode> {}
  interface ReactPortal extends ReactElement {
    key: string | null;
    children: ReactNode;
  }

  type Key = string | number;

  // 确保在 React 命名空间中也有 ReactNode 的定义
  export type ReactNode =
    | ReactElement
    | string
    | number
    | ReactFragment
    | ReactPortal
    | boolean
    | null
    | undefined;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element extends React.ReactElement<any, any> {}
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode;
    }
    interface ElementAttributesProperty {
      props: {};
    }
    interface ElementChildrenAttribute {
      children: {};
    }
    interface IntrinsicAttributes {
      key?: string | number | undefined;
    }
    interface IntrinsicClassAttributes<T> extends React.Attributes {}
    interface IntrinsicElements {
      div: React.HTMLAttributes<HTMLDivElement>;
      span: React.HTMLAttributes<HTMLSpanElement>;
      input: React.InputHTMLAttributes<HTMLInputElement>;
      button: React.ButtonHTMLAttributes<HTMLButtonElement>;
      // Add more HTML elements as needed
    }
  }
}

// 修复React和UMI类型定义问题
import * as React from 'react';

// 重新声明useState以确保泛型支持
declare module 'react' {
  function useState<S>(
    initialState: S | (() => S)
  ): [S, React.Dispatch<React.SetStateAction<S>>];

  // 确保useCallback支持泛型
  function useCallback<T extends (...args: any[]) => any>(
    callback: T,
    deps: React.DependencyList
  ): T;

  // 确保 ReactNode 类型在模块中可访问
  export type { ReactNode } from 'react';
}

// 为UMI request函数提供更明确的类型定义
declare module 'umi' {
  interface RequestOptions {
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH' | 'HEAD' | 'OPTIONS';
    data?: unknown;
    params?: Record<string, unknown>;
    headers?: Record<string, string>;
    [key: string]: unknown;
  }

  function request<T = unknown>(
    url: string,
    options?: RequestOptions
  ): Promise<T>;

  // 其他UMI导出保持不变
  export const history: {
    push: (path: string) => void;
    replace: (path: string) => void;
    go: (n: number) => void;
    back: () => void;
    forward: () => void;
  };
  export function useModel<T = unknown>(namespace: string): T;
}

export {};
