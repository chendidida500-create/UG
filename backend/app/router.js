'use strict';

/**
 * 路由配置
 * UG管理系统API路由
 */

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = (app) => {
  const { router, controller } = app;

  // 健康检查
  router.get('/api/health', controller.base.health);

  // 认证相关路由
  router.post('/api/auth/login', controller.auth.login);
  router.post('/api/auth/register', controller.auth.register);
  router.post('/api/auth/refresh', controller.auth.refresh);
  router.post('/api/auth/logout', controller.auth.logout);

  // 用户管理路由
  router.get('/api/users', controller.user.index);
  router.get('/api/users/:id', controller.user.show);
  router.post('/api/users', controller.user.create);
  router.put('/api/users/:id', controller.user.update);
  router.delete('/api/users/:id', controller.user.destroy);
  router.patch('/api/users/:id/status', controller.user.updateStatus);
  router.patch('/api/users/:id/password', controller.user.updatePassword);

  // 角色管理路由
  router.get('/api/roles', controller.role.index);
  router.get('/api/roles/:id', controller.role.show);
  router.post('/api/roles', controller.role.create);
  router.put('/api/roles/:id', controller.role.update);
  router.delete('/api/roles/:id', controller.role.destroy);
  router.get('/api/roles/:id/permissions', controller.role.permissions);
  router.put('/api/roles/:id/permissions', controller.role.updatePermissions);

  // 权限管理路由
  router.get('/api/permissions', controller.permission.index);
  router.get('/api/permissions/tree', controller.permission.tree);
  router.get('/api/permissions/:id', controller.permission.show);
  router.post('/api/permissions', controller.permission.create);
  router.put('/api/permissions/:id', controller.permission.update);
  router.delete('/api/permissions/:id', controller.permission.destroy);

  // 当前用户信息路由
  router.get('/api/me', controller.user.profile);
  router.put('/api/me', controller.user.updateProfile);
  router.put('/api/me/password', controller.user.updateMyPassword);
};
