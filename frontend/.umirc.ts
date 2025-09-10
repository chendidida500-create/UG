export default {
  // 禁用MFSU以避免编译问题
  mfsu: false,

  // 添加viewport meta标签
  metas: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
  ],

  // 引入全局样式
  styles: ['@/styles/global.css'],

  // 路由配置
  routes: [
    {
      path: '/auth',
      component: '@/layouts/AuthLayout',
      routes: [
        { path: '/auth/login', component: '@/pages/Auth/Login' },
        { path: '/auth/register', component: '@/pages/Auth/Register' },
      ],
    },
    {
      path: '/',
      component: '@/layouts/BasicLayout',
      wrappers: ['@/wrappers/AuthWrapper'],
      routes: [
        {
          path: '/dashboard',
          name: '仪表盘',
          icon: 'DashboardOutlined',
          component: '@/pages/Dashboard',
        },
        {
          path: '/system',
          name: '系统管理',
          routes: [
            {
              path: '/system/users',
              name: '用户管理',
              component: '@/pages/System/User',
            },
            {
              path: '/system/roles',
              name: '角色管理',
              component: '@/pages/System/Role',
            },
            {
              path: '/system/permissions',
              name: '权限管理',
              component: '@/pages/System/Permission',
            },
          ],
        },
      ],
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
      target: 'http://localhost:7001',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
  },

  // 构建分析配置
  analyze: {
    analyzerMode: 'static',
    openAnalyzer: false,
    generateStatsFile: true,
    statsFilename: 'stats.json',
  },

  // npm客户端配置
  npmClient: 'pnpm',
};
