// 运行时配置文件，可以在这里扩展运行时能力
// 比如修改路由、修改 render 方法等

import type { RequestConfig } from '@@/plugin-request/types';
import type {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from '@@/plugin-request/request';

// 定义用户类型
interface CurrentUser {
  name?: string;
  avatar?: string;
  userid?: string;
  email?: string;
  signature?: string;
  title?: string;
  group?: string;
  tags?: {
    key: string;
    label: string;
  }[];
  notifyCount?: number;
  unreadCount?: number;
  country?: string;
  access?: string;
  geographic?: {
    province: {
      label: string;
      key: string;
    };
    city: {
      label: string;
      key: string;
    };
  };
  address?: string;
  phone?: string;
}

// 定义初始状态类型
interface InitialState {
  currentUser?: CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<CurrentUser | undefined>;
}

// 定义路由变更参数类型
interface RouteChangeParams {
  location: {
    pathname: string;
    search: string;
    hash: string;
    state: unknown;
    key: string;
  };
  action: 'PUSH' | 'POP' | 'REPLACE';
}

// 定义layout配置返回值类型
interface LayoutConfig {
  logout: () => void;
  rightRender: (_initialState: InitialState) => string | null;
}

// 全局初始化数据配置，用于 Layout 插件
export const layout: () => LayoutConfig = () => {
  return {
    logout: () => {
      // 实现退出登录逻辑
      console.log('退出登录');
      // 在实际应用中，这里应该清除用户信息并跳转到登录页面
      // 例如: history.push('/auth/login');
    },
    rightRender: (_initialState: InitialState) => {
      // 右上角渲染逻辑
      // 这里可以根据初始状态渲染不同的内容
      return null;
    },
  };
};

// 请求配置
export const request: RequestConfig = {
  timeout: 10000,
  // 其他请求配置
  errorConfig: {
    errorHandler: (error: AxiosError | Error) => {
      console.error('请求错误', error);
      // 可以在这里添加全局错误处理逻辑
    },
  },
  requestInterceptors: [
    (url: string, config: AxiosRequestConfig) => {
      // 请求拦截器
      // 可以在这里添加认证token等
      return { url, options: config };
    },
  ],
  responseInterceptors: [
    (response: AxiosResponse) => {
      // 响应拦截器
      // 可以在这里统一处理响应数据
      return response;
    },
  ],
};

// 全局初始化状态
export async function getInitialState(): Promise<InitialState> {
  // 在这里可以获取全局初始状态
  // 例如获取当前用户信息
  return {
    currentUser: undefined,
    loading: false,
  };
}

// 在初始状态加载完成后执行
export function onInitialStateResolved(initialState: InitialState) {
  // 可以在这里执行一些初始化后的操作
  console.log('初始状态已加载', initialState);
}

// 路由变更时触发
export function onRouteChange(params: RouteChangeParams) {
  // 可以在这里添加路由变更时的逻辑
  console.log('路由变更', params.location, params.action);
}
