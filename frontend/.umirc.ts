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
      path: '/',
      redirect: '/dashboard',
    },
    {
      name: '仪表盘',
      path: '/dashboard',
      component: './Dashboard',
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
