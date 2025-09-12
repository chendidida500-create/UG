// 为 Egg.js 添加全局类型声明
// /// <reference types="egg" />

declare module "egg" {
  interface Application {
    // 可以在这里添加自定义的应用程序属性类型
  }

  interface Context {
    // 可以在这里添加自定义的上下文属性类型
  }
}
