// @ts-ignore
import { defineConfig } from '@umijs/max';

export default defineConfig({
  // 禁用MFSU以避免编译问题
  mfsu: false,

  // 禁用dva插件以解决@umijs/utils模块找不到的问题
  dva: false,

  // 路由配置
  routes: [
    {
      path: '/login',
      component: './Login',
      layout: false, // 不使用布局
    },
    {
      path: '/',
      redirect: '/dashboard',
    },
    {
      name: '仪表盘',
      path: '/dashboard',
      component: './Dashboard',
    },
    {
      name: '任务管理',
      path: '/tasks',
      component: './TaskManagement',
    },
    {
      name: '用户管理',
      path: '/users',
      component: './UserManagement',
    },
    {
      name: '角色管理',
      path: '/roles',
      component: './RoleManagement',
    },
    {
      name: '权限管理',
      path: '/permissions',
      component: './PermissionManagement',
    },
    {
      name: '系统监控',
      path: '/monitor',
      component: './SystemMonitor',
    },
    {
      name: '报表管理',
      path: '/reports',
      component: './Report',
    },
    {
      name: '系统配置',
      path: '/config',
      component: './SystemConfig',
    },
    {
      name: '字典管理',
      path: '/dict',
      component: './Dictionary',
    },
    {
      name: '通知公告',
      path: '/notice',
      component: './Notice',
    },
    {
      name: '系统设置',
      path: '/settings',
      component: './SystemSettings',
    },
  ],

  // Ant Design配置
  antd: {},

  // 状态管理配置
  model: {},

  // 权限控制配置
  access: {},

  // 请求配置
  request: {},

  // 开发代理配置
  proxy: {
    '/api': {
      target: process.env.API_BASE_URL || 'http://localhost:7001',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
  },

  // 环境变量定义
  define: {
    'process.env.API_BASE_URL': JSON.stringify(
      process.env.API_BASE_URL || 'http://localhost:7001'
    ),
  },

  // npm客户端配置
  npmClient: 'pnpm',
});
