import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  
  // Health check endpoint
  router.get('/api/health', controller.home.health);

  // User management endpoints
  router.get('/api/users', controller.user.index);
  router.get('/api/users/:id', controller.user.show);
  router.post('/api/users', controller.user.create);
  router.put('/api/users/:id', controller.user.update);
  router.delete('/api/users/:id', controller.user.destroy);
  router.post('/api/users/:id/roles', controller.user.assignRoles);
  
  // Role management endpoints
  router.get('/api/roles', controller.role.index);
  router.get('/api/roles/:id', controller.role.show);
  router.post('/api/roles', controller.role.create);
  router.put('/api/roles/:id', controller.role.update);
  router.delete('/api/roles/:id', controller.role.destroy);
  router.post('/api/roles/:id/permissions', controller.role.assignPermissions);
  
  // Permission management endpoints
  router.get('/api/permissions', controller.permission.index);
  router.get('/api/permissions/:id', controller.permission.show);
  router.post('/api/permissions', controller.permission.create);
  router.put('/api/permissions/:id', controller.permission.update);
  router.delete('/api/permissions/:id', controller.permission.destroy);
  
  // Authentication endpoints
  router.post('/api/auth/login', controller.auth.login);
  router.post('/api/auth/logout', controller.auth.logout);
  router.get('/api/auth/profile', controller.auth.profile);
};