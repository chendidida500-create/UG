export default {
  // 禁用MFSU以避免编译问题
  mfsu: false,

  // 启用的插件
  plugins: ['@umijs/plugins/dist/layout', '@umijs/plugins/dist/antd'],

  // Layout配置
  layout: {
    locale: false,
    title: 'UG管理系统',
    logo: '@/assets/logo.svg',
    theme: 'dark',
    layout: 'mix',
    contentWidth: 'Fluid',
    fixedHeader: true,
    fixSiderbar: true,
    siderWidth: 208,
    splitMenus: false,
    menu: {
      locale: false,
      defaultOpenAll: true,
    },
  },

  // Ant Design配置
  antd: {
    // 确保 pro-components 能正确加载
    import: true,
  },

  // 添加别名配置，确保模块解析正确
  alias: {
    '@ant-design/pro-components': '@ant-design/pro-components',
  },

  // 添加额外的Webpack配置
  chainWebpack(memo: unknown) {
    // 确保能够正确解析 pro-components
    (memo as any).resolve.modules.add('node_modules').end();
    return memo;
  },

  // 添加viewport meta标签
  metas: [
    {
      name: 'viewport',
      content: 'width=device-width, initial-scale=1',
    },
    {
      name: 'referrer',
      content: 'origin',
    },
  ],

  // 引入全局样式
  styles: ['@/styles/global.css'],

  // 路由配置
  routes: [
    {
      path: '/',
      redirect: '/welcome',
    },
    {
      path: '/welcome',
      name: '欢迎',
      icon: 'smile',
      component: './Welcome',
    },
    {
      path: '/auth',
      component: '@/layouts/AuthLayout',
      routes: [
        { path: '/auth/login', component: '@/pages/Auth/Login' },
        { path: '/auth/register', component: '@/pages/Auth/Register' },
      ],
      layout: false,
    },
    {
      path: '/dashboard',
      name: '仪表盘',
      icon: 'DashboardOutlined',
      component: '@/pages/Dashboard',
      wrappers: ['@/wrappers/AuthWrapper'],
    },
    {
      path: '/system',
      name: '系统管理',
      icon: 'SettingOutlined',
      routes: [
        {
          path: '/system/users',
          name: '用户管理',
          component: '@/pages/System/User',
          wrappers: ['@/wrappers/AuthWrapper'],
        },
        {
          path: '/system/roles',
          name: '角色管理',
          component: '@/pages/System/Role',
          wrappers: ['@/wrappers/AuthWrapper'],
        },
        {
          path: '/system/permissions',
          name: '权限管理',
          component: '@/pages/System/Permission',
          wrappers: ['@/wrappers/AuthWrapper'],
        },
      ],
    },
    {
      path: '/admin',
      name: '管理页',
      icon: 'crown',
      access: 'canAdmin',
      routes: [
        {
          path: '/admin/sub-page-1',
          name: '分页一',
          icon: 'smile',
          component: './Welcome',
          wrappers: ['@/wrappers/AuthWrapper'],
        },
        {
          path: '/admin/sub-page-2',
          name: '分页二',
          icon: 'smile',
          component: './Welcome',
          wrappers: ['@/wrappers/AuthWrapper'],
        },
      ],
    },
  ],

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
