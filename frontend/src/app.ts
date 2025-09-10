// 运行时配置文件，可以在这里扩展运行时能力
// 比如修改路由、修改 render 方法等

import type { LayoutConfig, RequestConfig } from '@umijs/max';
import type { InitialState } from './models/initialState';

// 全局初始化数据配置，用于 Layout 插件
export const layout: LayoutConfig = () => {
  return {
    logout: () => {
      // 实现退出登录逻辑
      console.log('退出登录');
      // 在实际应用中，这里应该清除用户信息并跳转到登录页面
      // 例如: history.push('/auth/login');
    },
    rightRender: (initialState: InitialState) => {
      // 右上角渲染逻辑
      if (initialState?.currentUser) {
        return `欢迎，${initialState.currentUser.name}`;
      }
      return null;
    },
  };
};

// 请求配置
export const request: RequestConfig = {
  timeout: 10000,
  // 其他请求配置
  errorConfig: {
    errorHandler: (error: any) => {
      console.error('请求错误', error);
      // 可以在这里添加全局错误处理逻辑
    },
  },
  requestInterceptors: [
    (url: string, options: any) => {
      // 请求拦截器
      // 可以在这里添加认证token等
      return { url, options };
    },
  ],
  responseInterceptors: [
    (response: any) => {
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
export function onRouteChange({ location, action }: any) {
  // 可以在这里添加路由变更时的逻辑
  console.log('路由变更', location, action);
}
