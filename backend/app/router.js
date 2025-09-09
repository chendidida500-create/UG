import { Application } from 'egg';

export default (app: Application) => {
  const { controller, router } = app;

  router.get('/', controller.home.index);
  
  // Health check endpoint
  router.get('/api/health', controller.home.health);
};