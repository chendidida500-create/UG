// UMI 4.x Mock 文件，用于解决类型检查问题
import type { AccessModelState } from '../models/access';
import type { AuthModelState } from '../models/auth';
import type { DashboardModelState } from '../models/dashboard';
import type { PermissionModelState } from '../models/permission';
import type { RoleModelState } from '../models/role';
import type { UserModelState } from '../models/user';

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
  : unknown = <
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
    : unknown =>
  {
    // 这只是一个模拟实现，实际运行时会使用 UMI 的 useModel
    return {} as T extends 'access'
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
      : unknown;
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
export const request = async <T = unknown> (
  _url: string,
  _options?: unknown
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
export const useParams = <T = unknown> (): T => ( {} ) as T;
export const useSearchParams = () => [ new URLSearchParams(), () => { } ];
export const useAccess = () => ( {} );
// 使用直接导入的 ReactNode 类型
export const Access = ( { children }: { children: ReactNode } ) => children;
export const useIntl = () => ( {
  formatMessage: ( descriptor: { id: string; defaultMessage?: string } ) =>
    descriptor.defaultMessage || descriptor.id,
} );
