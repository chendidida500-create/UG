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

import 'egg';

declare module 'egg' {
  interface Application {
    genHash(password: string): Promise<string>;
    compareHash(password: string, hash: string): Promise<boolean>;
  }

  interface Context {
    genHash(password: string): Promise<string>;
    compareHash(password: string, hash: string): Promise<boolean>;
  }
}
