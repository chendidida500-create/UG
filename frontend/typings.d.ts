// 声明UMI相关模块
declare module 'umi' {
  export * from '@umijs/max';
}

declare module '@umijs/max' {
  // 导出UMI常用类型和函数
  export const history: any;
  export const request: any;
  export function useNavigate(): any;
  export function useLocation(): any;
  export function useParams(): any;
  export function useModel(namespace: string): any;

  // 添加其他可能需要的导出
  export const Link: any;
  export const Outlet: any;
  export const useAppData: any;
  export const useRouteData: any;
  export const useLocation: any;
  export const useNavigate: any;
  export const useParams: any;
  export const useSearchParams: any;
  export const useSelectedRoutes: any;
}

// 声明CSS模块
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
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

  interface Process {
    env: ProcessEnv;
  }
}

// 声明process对象
declare let process: NodeJS.Process;
