// Type definitions for umi
declare module 'umi' {
  export const defineConfig: any;
  export const history: any;
  export const request: any;
  export const useLocation: any;
  export const useNavigate: any;
  export const useParams: any;
  export const useSearchParams: any;
  export const useModel: any;
  export const useAccess: any;
  export const useIntl: any;
  export const useAppData: any;
  export const useRouteData: any;
  export const useRoutes: any;
  export const useSelectedRoutes: any;
  export const Outlet: any;
  export const Link: any;
  export const NavLink: any;
  export const useOutlet: any;
  export const matchRoutes: any;
  export const renderClient: any;
  export const ApplyPluginsType: any;
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
  export const extend: any;
  export const request: any;
}