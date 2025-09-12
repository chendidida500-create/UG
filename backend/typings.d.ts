// 为 Egg.js 添加全局类型声明
// /// <reference types="egg" />

// 声明Node.js类型
/// <reference types="node" />

// 声明环境变量
declare namespace NodeJS {
  interface ProcessEnv {
    readonly MYSQL_HOST: string;
    readonly MYSQL_PORT: string;
    readonly MYSQL_DATABASE: string;
    readonly MYSQL_USERNAME: string;
    readonly MYSQL_PASSWORD: string;
    readonly JWT_SECRET: string;
  }
}

// 声明process对象
declare let process: NodeJS.Process;

declare module 'egg' {
  interface Application {
    // 可以在这里添加自定义的应用程序属性类型
  }

  interface Context {
    // 可以在这里添加自定义的上下文属性类型
  }
}
