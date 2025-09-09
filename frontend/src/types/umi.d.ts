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
    state?: unknown;
  };
  export const useNavigate: () => (
    to: string | number,
    options?: { replace?: boolean; state?: unknown }
  ) => void;
  export const useParams: <T = Record<string, string>>() => T;
  export const useSearchParams: () => [
    URLSearchParams,
    (params: URLSearchParams) => void,
  ];
  export const useModel: <T = unknown>(namespace: string) => T;
  export const useAccess: () => unknown;
  export const useIntl: () => {
    formatMessage: (
      descriptor: { id: string; defaultMessage?: string },
      values?: Record<string, unknown>
    ) => string;
  };
  export const useAppData: () => unknown;
  export const useRouteData: () => unknown;
  export const useRoutes: () => unknown;
  export const useSelectedRoutes: () => unknown;
  export const Outlet: React.ComponentType;
  export const Link: React.ComponentType<
    { to: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>
  >;
  export const NavLink: React.ComponentType<
    { to: string } & React.AnchorHTMLAttributes<HTMLAnchorElement>
  >;
  export const useOutlet: () => React.ReactElement | null;
  export const matchRoutes: (
    routes: unknown[],
    location: { pathname: string }
  ) => unknown;
  export const renderClient: (props: unknown) => void;
  export const ApplyPluginsType: { modify: string; event: string };
  export const PluginEvent: unknown;
  export const __USE_MODEL__: unknown;
  export const __ACCESS__: unknown;
}

declare module '@umijs/plugins/dist/antd' {
  const content: unknown;
  export default content;
}

declare module '@umijs/plugins/dist/model' {
  const content: unknown;
  export default content;
}

declare module '@umijs/plugins/dist/access' {
  const content: unknown;
  export default content;
}

declare module '@umijs/plugins/dist/initial-state' {
  const content: unknown;
  export default content;
}

declare module '@umijs/plugins/dist/request' {
  const content: unknown;
  export default content;
}

declare module 'umi-request' {
  export const extend: (options: Record<string, unknown>) => typeof request;
  export const request: <T = unknown>(
    url: string,
    options?: RequestOptions
  ) => Promise<T>;
}
