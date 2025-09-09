// Type definitions for umi
declare module 'umi' {
  export const defineConfig: <T>(config: T) => T;
  export const history: {
    push: (path: string) => void;
    replace: (path: string) => void;
    go: (n: number) => void;
    back: () => void;
    forward: () => void;
  };
  export const request: <T = unknown>(
    url: string,
    options?: RequestOptions
  ) => Promise<T>;
  export const useLocation: () => {
    pathname: string;
    search: string;
    hash: string;
    state?: any;
  };
  export const useNavigate: () => (
    to: string | number,
    options?: { replace?: boolean; state?: any }
  ) => void;
  export const useParams: <T = Record<string, string>>() => T;
  export const useSearchParams: () => [
    URLSearchParams,
    (params: URLSearchParams) => void,
  ];
  export const useModel: <T = unknown>(namespace: string) => T;
  export const useAccess: () => any;
  export const useIntl: () => {
    formatMessage: (
      descriptor: { id: string; defaultMessage?: string },
      values?: Record<string, any>
    ) => string;
  };
  export const useAppData: () => any;
  export const useRouteData: () => any;
  export const useRoutes: () => any;
  export const useSelectedRoutes: () => any;
  export const Outlet: React.ComponentType;
  export const Link: React.ComponentType<
    { to: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>
  >;
  export const NavLink: React.ComponentType<
    { to: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>
  >;
  export const useOutlet: () => React.ReactElement | null;
  export const matchRoutes: (
    routes: any[],
    location: { pathname: string }
  ) => any;
  export const renderClient: (props: any) => void;
  export const ApplyPluginsType: { modify: string; event: string };
  export const PluginEvent: any;
  export const __USE_MODEL__: any;
  export const __ACCESS__: any;
}

declare module '@umijs/plugins/dist/antd' {
  const content: any;
  export default content;
}

declare module '@umijs/plugins/dist/model' {
  const content: any;
  export default content;
}

declare module '@umijs/plugins/dist/access' {
  const content: any;
  export default content;
}

declare module '@umijs/plugins/dist/initial-state' {
  const content: any;
  export default content;
}

declare module '@umijs/plugins/dist/request' {
  const content: any;
  export default content;
}

declare module 'umi-request' {
  export const extend: (options: any) => typeof request;
  export const request: <T = unknown>(
    url: string,
    options?: RequestOptions
  ) => Promise<T>;
}
