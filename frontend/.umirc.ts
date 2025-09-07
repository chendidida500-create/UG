import { defineConfig } from 'umi';

export default defineConfig({
  plugins: [
    require.resolve('@umijs/plugins/dist/antd'),
    require.resolve('@umijs/plugins/dist/model'),
    require.resolve('@umijs/plugins/dist/access'),
    require.resolve('@umijs/plugins/dist/initial-state'),
    require.resolve('@umijs/plugins/dist/request'),
  ],
  routes: [
    // 认证相关路由
    {
      path: '/auth',
      component: '@/layouts/AuthLayout',
      routes: [
        {
          path: '/auth/login',
          component: '@/pages/Auth/Login',
        },
        {
          path: '/auth/register',
          component: '@/pages/Auth/Register',
        },
        {
          path: '/auth',
          redirect: '/auth/login',
        },
      ],
    },
    // 主应用路由
    {
      path: '/',
      component: '@/layouts/BasicLayout',
      wrappers: ['@/wrappers/AuthWrapper'],
      routes: [
        {
          path: '/dashboard',
          component: '@/pages/Dashboard',
          name: '仪表盘',
          icon: 'DashboardOutlined',
        },
        {
          path: '/system',
          name: '系统管理',
          icon: 'SettingOutlined',
          routes: [
            {
              path: '/system/users',
              component: '@/pages/System/User',
              name: '用户管理',
              icon: 'UserOutlined',
            },
            {
              path: '/system/roles',
              component: '@/pages/System/Role',
              name: '角色管理',
              icon: 'TeamOutlined',
            },
            {
              path: '/system/permissions',
              component: '@/pages/System/Permission',
              name: '权限管理',
              icon: 'SafetyCertificateOutlined',
            },
          ],
        },
        {
          path: '/profile',
          component: '@/pages/Profile',
          name: '个人中心',
          hideInMenu: true,
        },
        {
          path: '/',
          redirect: '/dashboard',
        },
      ],
    },
    // 404页面
    {
      path: '/*',
      component: '@/pages/404',
    },
  ],
  npmClient: 'npm',
  // 通过环境变量设置端口
  // devServer配置在UMI 4.x中已更改，使用PORT环境变量
  lessLoader: {
    modifyVars: {
      '@primary-color': '#1890ff',
      '@link-color': '#1890ff',
      '@success-color': '#52c41a',
      '@warning-color': '#faad14',
      '@error-color': '#f5222d',
      '@font-size-base': '14px',
      '@heading-color': 'rgba(0, 0, 0, 0.85)',
      '@text-color': 'rgba(0, 0, 0, 0.65)',
      '@text-color-secondary': 'rgba(0, 0, 0, 0.45)',
      '@disabled-color': 'rgba(0, 0, 0, 0.25)',
      '@border-radius-base': '6px',
      '@border-color-base': '#d9d9d9',
      '@box-shadow-base':
        '0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05)',
    },
  },
  define: {
    'process.env.API_BASE_URL': JSON.stringify(
      process.env.NODE_ENV === 'production'
        ? 'https://api.example.com'
        : 'http://localhost:15001'
    ),
  },
  proxy: {
    '/api': {
      target: 'http://localhost:15001',
      changeOrigin: true,
      pathRewrite: { '^/api': '/api' },
    },
  },
  hash: true,
  analyze: {
    analyzerMode: 'server',
    analyzerPort: 8888,
    openAnalyzer: false,
  },
  esbuildMinifyIIFE: true,
  codeSplitting: {
    jsStrategy: 'granularChunks',
  },
  title: 'UG管理系统',
  favicons: ['/favicon.ico'],
  metas: [
    {
      name: 'description',
      content: 'UG管理系统 - 基于UMI和Ant Design的现代化后台管理系统',
    },
    {
      name: 'keywords',
      content: 'UG,管理系统,UMI,Ant Design,React,TypeScript',
    },
  ],
});
