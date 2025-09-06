'use strict';

/**
 * UG管理系统后端入口文件
 * 基于Egg.js框架
 */

module.exports = app => {
  app.beforeStart(async () => {
    // 应用会等待这个函数执行完成才启动
    console.log('🚀 UG Backend Server is starting...');

    // 可以在这里执行一些异步的启动逻辑
    // 比如检查数据库连接、初始化缓存等

    console.log('✅ UG Backend Server started successfully!');
  });
};