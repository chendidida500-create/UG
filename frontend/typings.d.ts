// 声明UMI相关模块
declare module 'umi' {
  export * from '@umijs/max';
}

declare module '@umijs/max' {
  export * from 'umi';
  
  // 导出UMI常用类型和函数
  export const history: any;
  export const request: any;
  export function useNavigate(): any;
  export function useLocation(): any;
  export function useParams(): any;
  export function useModel(namespace: string): any;
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
declare var process: NodeJS.Process;