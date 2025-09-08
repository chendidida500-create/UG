// Type definitions for React
declare module 'react' {
  export const useState: any;
  export const useEffect: any;
  export const useRef: any;
  export const useContext: any;
  export const useReducer: any;
  export const useCallback: any;
  export const useMemo: any;
  export const useLayoutEffect: any;
  export const useImperativeHandle: any;
  export const useDebugValue: any;
  export const useDeferredValue: any;
  export const useTransition: any;
  export const useId: any;
  export const createElement: any;
  export const cloneElement: any;
  export const createFactory: any;
  export const isValidElement: any;
  export const Fragment: any;
  export const StrictMode: any;
  export const Suspense: any;
  export const memo: any;
  export const forwardRef: any;
  export const createContext: any;
  export const Component: any;
  export const PureComponent: any;
  export type FC<P = {}> = FunctionComponent<P>;
  export interface FunctionComponent<P = {}> {
    (props: P, context?: any): ReactElement<any, any> | null;
    propTypes?: any;
    contextTypes?: any;
    defaultProps?: Partial<P>;
    displayName?: string;
  }
  export type ReactNode = ReactElement | string | number | ReactFragment | ReactPortal | boolean | null | undefined;

  // 修复：将 React 定义为一个命名空间而不是函数
  export namespace React {
    // 添加缺失的属性
    export const version: string;
    export const createElement: any;
    export const cloneElement: any;
    export const createFactory: any;
    export const isValidElement: any;
    export const Fragment: any;
    export const StrictMode: any;
    export const Suspense: any;
    // ... 其他属性
  }

  // 添加默认导出，使其成为一个包含所有属性的对象
  const React: {
    useState: any;
    useEffect: any;
    useRef: any;
    useContext: any;
    useReducer: any;
    useCallback: any;
    useMemo: any;
    useLayoutEffect: any;
    useImperativeHandle: any;
    useDebugValue: any;
    useDeferredValue: any;
    useTransition: any;
    useId: any;
    createElement: any;
    cloneElement: any;
    createFactory: any;
    isValidElement: any;
    Fragment: any;
    StrictMode: any;
    Suspense: any;
    memo: any;
    forwardRef: any;
    createContext: any;
    Component: any;
    PureComponent: any;
    version: string;
  };

  export default React;
}

declare module 'react-router-dom' {
  export const BrowserRouter: any;
  export const HashRouter: any;
  export const Link: any;
  export const NavLink: any;
  export const Navigate: any;
  export const Outlet: any;
  export const Route: any;
  export const Routes: any;
  export const useLocation: any;
  export const useNavigate: any;
  export const useParams: any;
  export const useSearchParams: any;
  export const useMatch: any;
  export const useResolvedPath: any;
  export const useHref: any;
  export const useLinkClickHandler: any;
  export const useNavigateStable: any;
  export const useOutlet: any;
  export const useOutletContext: any;
  export const useRoutes: any;
  export const useSearchParamsStable: any;
}

declare namespace React {
  interface ReactElement<P = any, T extends string | React.ComponentType<any> = string | React.ComponentType<any>> {
    type: T;
    props: P;
    key: string | null;
  }

  interface ComponentType<P = {}> {
    (props: P): ReactElement<any, any> | null;
    propTypes?: any;
    contextTypes?: any;
    defaultProps?: Partial<P>;
    displayName?: string;
  }

  interface ComponentClass<P = {}, S = any> extends ComponentType<P> {
    new(props: P, context?: any): Component<P, S>;
    propTypes?: any;
    contextTypes?: any;
    childContextTypes?: any;
    defaultProps?: Partial<P>;
    displayName?: string;
  }

  interface Component<P = {}, S = any> {
    setState<K extends keyof S>(
      state: ((prevState: Readonly<S>, props: Readonly<P>) => (Pick<S, K> | S | null)) | (Pick<S, K> | S | null),
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
  interface ReactNodeArray extends Array<ReactNode> { }
  interface ReactPortal extends ReactElement {
    key: string | null;
    children: ReactNode;
  }

  type Key = string | number;

  export type ReactNode = ReactElement | string | number | ReactFragment | ReactPortal | boolean | null | undefined;
}

declare global {
  namespace JSX {
    interface IntrinsicElements {
      [elemName: string]: any;
    }
    interface Element extends React.ReactElement<any, any> { }
    interface ElementClass extends React.Component<any> {
      render(): React.ReactNode;
    }
    interface ElementAttributesProperty { props: {}; }
    interface ElementChildrenAttribute { children: {}; }
    interface IntrinsicAttributes {
      key?: string | number | any;
    }
    interface IntrinsicClassAttributes<T> extends React.Attributes { }
    interface IntrinsicElements {
      div: React.HTMLAttributes<HTMLDivElement>;
      span: React.HTMLAttributes<HTMLSpanElement>;
      input: React.InputHTMLAttributes<HTMLInputElement>;
      button: React.ButtonHTMLAttributes<HTMLButtonElement>;
      // Add more HTML elements as needed
    }
  }
}