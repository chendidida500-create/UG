// UMI 4.x Mock 文件，用于解决类型检查问题
import type { AccessModelState } from '../models/access.ts';
import type { AuthModelState } from '../models/auth.ts';
import type { DashboardModelState } from '../models/dashboard.ts';
import type { PermissionModelState } from '../models/permission.ts';
import type { RoleModelState } from '../models/role.ts';
import type { UserModelState } from '../models/user.ts';

// 从 react 中直接导入 ReactNode 类型
import type { ReactNode } from 'react';

// 模拟 useModel hook，用于类型检查
export const useModel: <
  T extends 'access' | 'auth' | 'dashboard' | 'permission' | 'role' | 'user',
>(
  namespace: T
) => T extends 'access'
  ? AccessModelState
  : T extends 'auth'
  ? AuthModelState
  : T extends 'dashboard'
  ? DashboardModelState
  : T extends 'permission'
  ? PermissionModelState
  : T extends 'role'
  ? RoleModelState
  : T extends 'user'
  ? UserModelState
  : any = <
    T extends 'access' | 'auth' | 'dashboard' | 'permission' | 'role' | 'user',
  > (
    _namespace: T
  ): T extends 'access'
    ? AccessModelState
    : T extends 'auth'
    ? AuthModelState
    : T extends 'dashboard'
    ? DashboardModelState
    : T extends 'permission'
    ? PermissionModelState
    : T extends 'role'
    ? RoleModelState
    : T extends 'user'
    ? UserModelState
    : any =>
  {
    // 这只是一个模拟实现，实际运行时会使用 UMI 的 useModel
    return {} as any;
  };

// 模拟 history 对象
export const history = {
  push: ( _path: string ) => { },
  replace: ( _path: string ) => { },
  go: ( _n: number ) => { },
  goBack: () => { },
  goForward: () => { },
  block: () => () => { },
  location: {
    pathname: '',
    search: '',
    hash: '',
    state: undefined,
  },
  listen: () => () => { },
};

// 模拟其他 UMI 导出
export const request = async <T = any> (
  _url: string,
  _options?: any
): Promise<T> =>
{
  return {} as T;
};

export const Outlet = () => null;
export const useLocation = () => ( {
  pathname: '',
  search: '',
  hash: '',
  state: undefined,
} );

export const useNavigate = () => ( _to: string ) => { };
export const useParams = <T = any> (): T => ( {} ) as T;
export const useSearchParams = () => [ new URLSearchParams(), () => { } ];
export const useAccess = () => ( {} );
// 使用直接导入的 ReactNode 类型
export const Access = ( { children }: { children: ReactNode } ) => children;
export const useIntl = () => ( {
  formatMessage: ( descriptor: { id: string; defaultMessage?: string } ) =>
    descriptor.defaultMessage || descriptor.id,
} );
