# UG管理系统布局规范设计

## 1. 概述

UG管理系统采用UMI框架进行前端开发，需要建立统一的布局规范以确保页面风格一致性和开发效率。本设计文档定义了系统的布局结构、组件规范和实现要求。

**重要说明**：本设计文档严格遵循现有项目结构，仅在`frontend/src`目录下添加`layouts`目录及相关组件，不改变任何现有目录结构和文件组织方式。

### 1.1 设计目标

- 提供统一的页面布局结构
- 实现响应式设计，适配不同屏幕尺寸
- 支持权限控制和动态菜单渲染
- 确保良好的用户体验和可维护性
- 保证布局组件的可拓展性和调用便利性
- 确保接口设计符合项目标准和UMI框架规范

### 1.2 技术选型

- UMI 4.x 路由和布局系统
- Ant Design 5.x 组件库
- TypeScript 类型安全
- React Hooks 状态管理

## 2. 布局架构设计

### 2.1 整体架构

系统采用分层布局架构，包含以下主要布局组件：

```
App (应用根节点)
├── AuthLayout (认证布局)
│   ├── LoginPage (登录页面)
│   └── RegisterPage (注册页面)
└── BasicLayout (基础布局)
    ├── Header (顶部导航栏)
    ├── Sider (侧边菜单栏)
    ├── Content (内容区域)
    └── Footer (底部信息栏)
```

### 2.2 布局组件职责

#### AuthLayout (认证布局)

- 职责：为登录、注册等认证相关页面提供统一布局
- 特点：全屏居中展示，简洁明了

#### BasicLayout (基础布局)

- 职责：为应用主体功能页面提供统一布局
- 特点：包含完整导航结构，支持权限控制

## 3. 布局组件详细设计

### 3.1 layouts目录结构

根据现有项目结构，将在`src`目录下添加`layouts`目录：

```
src/
├── assets/           (现有目录)
├── components/       (现有目录)
├── layouts/          (新增目录)
│   ├── BasicLayout/
│   │   ├── index.tsx          (基础布局主文件)
│   │   ├── HeaderContent.tsx  (顶部导航内容)
│   │   ├── SiderMenu.tsx      (侧边菜单)
│   │   └── styles.less        (样式文件)
│   ├── AuthLayout/
│   │   ├── index.tsx          (认证布局主文件)
│   │   └── styles.less        (样式文件)
│   └── index.ts               (布局导出文件，用于导出所有布局组件)
├── models/           (现有目录)
├── pages/            (现有目录)
├── services/         (现有目录)
├── styles/           (现有目录)
├── utils/            (现有目录)
├── wrappers/         (新增目录，用于存放权限包装器等高阶组件)
└── ...               (其他现有文件)
```

**注意**：以上结构展示新增的`layouts`目录和`wrappers`目录，其他现有目录和文件保持不变。

### 3.2 BasicLayout实现规范

#### 3.2.1 index.tsx (基础布局主文件)

```typescript
import React, { useState } from 'react';
import { Layout, theme } from 'antd';
import HeaderContent from './HeaderContent.tsx';
import SiderMenu from './SiderMenu.tsx';
import styles from './styles.less';

const { Header, Sider, Content, Footer } = Layout;

const BasicLayout: React.FC = ({ children }) => {
  const [collapsed, setCollapsed] = useState(false);

  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  return (
    <Layout className={styles.layout}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
        className={styles.sider}
      >
        <div className={styles.logo} />
        <SiderMenu />
      </Sider>
      <Layout>
        <Header className={styles.header}>
          <HeaderContent collapsed={collapsed} setCollapsed={setCollapsed} />
        </Header>
        <Content
          className={styles.content}
          style={{
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          <div className={styles.contentInner}>{children}</div>
        </Content>
        <Footer className={styles.footer}>
          UG管理系统 ©2025 Created by UG Team
        </Footer>
      </Layout>
    </Layout>
  );
};

export default BasicLayout;
```

#### 3.2.2 HeaderContent.tsx (顶部导航内容)

```typescript
import React from 'react';
import { Space, Avatar, Dropdown, Menu } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';
import { useModel } from 'umi';
import styles from './styles.less';

interface HeaderContentProps {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const HeaderContent: React.FC<HeaderContentProps> = ({ collapsed, setCollapsed }) => {
  const { initialState, setInitialState } = useModel('@@initialState');

  const handleLogout = async () => {
    // 实现退出登录逻辑
    await setInitialState({ ...initialState, currentUser: undefined });
  };

  const menu = (
    <Menu
      items={[
        {
          key: 'logout',
          label: '退出登录',
          onClick: handleLogout,
        },
      ]}
    />
  );

  return (
    <div className={styles.headerContent}>
      <div className={styles.trigger}>
        {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
          className: styles.triggerIcon,
          onClick: () => setCollapsed(!collapsed),
        })}
      </div>
      <div className={styles.rightContent}>
        <Space>
          <Dropdown overlay={menu}>
            <Space className={styles.action}>
              <Avatar icon={<UserOutlined />} />
              <span>{initialState?.currentUser?.name}</span>
            </Space>
          </Dropdown>
        </Space>
      </div>
    </div>
  );
};

export default HeaderContent;
```

#### 3.2.3 SiderMenu.tsx (侧边菜单)

```typescript
import React from 'react';
import { Menu } from 'antd';
import { useLocation, useNavigate } from 'umi';
import { useModel } from 'umi';
import styles from './styles.less';

// 菜单项定义
const menuItems = [
  {
    key: '/dashboard',
    label: '仪表盘',
  },
  {
    key: '/system',
    label: '系统管理',
    children: [
      {
        key: '/system/users',
        label: '用户管理',
      },
      {
        key: '/system/roles',
        label: '角色管理',
      },
      {
        key: '/system/permissions',
        label: '权限管理',
      },
    ],
  },
];

const SiderMenu: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { initialState } = useModel('@@initialState');

  // 根据权限过滤菜单项
  const filterMenuItems = (items: any[]) => {
    // 实现权限过滤逻辑
    return items;
  };

  const filteredMenuItems = filterMenuItems(menuItems);

  return (
    <Menu
      mode="inline"
      selectedKeys={[location.pathname]}
      onClick={({ key }) => navigate(key)}
      items={filteredMenuItems}
      className={styles.menu}
    />
  );
};

export default SiderMenu;
```

#### 3.2.4 index.ts (布局导出文件)

```typescript
export { default as BasicLayout } from "./BasicLayout";
export { default as AuthLayout } from "./AuthLayout";
```

#### 3.2.5 styles.less (基础布局样式)

```less
@import "~antd/es/style/themes/default.less";

.layout {
  height: 100vh;

  .sider {
    height: 100vh;
    overflow: auto;
    position: fixed;
    left: 0;

    .logo {
      height: 32px;
      margin: 16px;
      background: rgba(255, 255, 255, 0.3);
    }
  }

  .header {
    padding: 0;
    background: @component-background;
    box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

    .headerContent {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 24px;

      .trigger {
        font-size: 18px;
        line-height: 64px;
        cursor: pointer;
        transition: color 0.3s;

        &:hover {
          color: @primary-color;
        }
      }

      .rightContent {
        .action {
          cursor: pointer;
          padding: 0 12px;
          display: inline-block;
          transition: all 0.3s;

          &:hover {
            background: rgba(0, 0, 0, 0.025);
          }
        }
      }
    }
  }

  .content {
    margin: 24px 16px 0;
    overflow: initial;

    .contentInner {
      padding: 24px;
      background: @component-background;
      min-height: 360px;
    }
  }

  .footer {
    text-align: center;
  }
}
```

### 3.3 BasicLayout设计

#### 3.3.1 组件结构

BasicLayout包含以下核心组件：

1. **Header (顶部导航栏)**
   - 用户信息展示
   - 通知消息提醒
   - 系统设置入口
   - 退出登录功能

2. **Sider (侧边菜单栏)**
   - 主导航菜单
   - 菜单折叠/展开功能
   - 动态菜单渲染（基于权限）

3. **Content (内容区域)**
   - 页面内容展示区域
   - 面包屑导航
   - 页面标题

4. **Footer (底部信息栏)**
   - 版权信息
   - 系统版本

#### 3.2.2 状态管理

- 使用UMI的model进行全局状态管理
- 集成权限控制模块，实现菜单和按钮级权限控制

#### 3.2.3 权限控制实现

1. **菜单权限控制**
   - 根据用户角色动态渲染菜单项
   - 隐藏无权限访问的菜单

2. **按钮权限控制**
   - 提供权限检查Hook
   - 支持组件级权限控制

3. **路由权限控制**
   - 集成AuthWrapper实现路由级权限
   - 未授权访问自动跳转登录页

#### 3.2.4 组件接口设计规范

1. **属性接口定义**
   - 使用TypeScript接口明确定义组件属性
   - 提供详细的属性注释说明
   - 合理设置属性默认值和可选性

2. **事件处理规范**
   - 事件处理函数命名遵循React惯例
   - 提供事件对象类型定义
   - 支持事件处理器的可选性

3. **子组件传递**
   - 通过`children`属性传递子组件内容
   - 支持React.ReactNode类型
   - 保持组件组合的灵活性

### 3.4 AuthLayout实现规范

#### 3.4.1 index.tsx (认证布局主文件)

```typescript
import React from 'react';
import { Layout, Card } from 'antd';
import styles from './styles.less';

const { Content } = Layout;

const AuthLayout: React.FC = ({ children }) => {
  return (
    <Layout className={styles.layout}>
      <Content className={styles.content}>
        <div className={styles.container}>
          <div className={styles.logo}>
            <img src="/logo.png" alt="系统Logo" />
            <h1>UG管理系统</h1>
          </div>
          <Card className={styles.card}>{children}</Card>
        </div>
      </Content>
    </Layout>
  );
};

export default AuthLayout;
```

#### 3.4.2 styles.less (认证布局样式)

```less
.layout {
  min-height: 100vh;

  .content {
    display: flex;
    align-items: center;
    justify-content: center;

    .container {
      width: 100%;
      max-width: 400px;
      padding: 32px;

      .logo {
        text-align: center;
        margin-bottom: 32px;

        img {
          width: 64px;
          height: 64px;
        }

        h1 {
          margin-top: 16px;
          font-size: 24px;
          font-weight: 600;
        }
      }

      .card {
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      }
    }
  }
}
```

## 4. 路由配置规范

### 4.1 路由结构设计

遵循UMI框架路由配置规范，布局组件通过`component`字段指定，权限控制通过`wrappers`字段实现：

```
routes: [
  {
    path: '/auth',
    component: '@/layouts/AuthLayout',
    routes: [
      { path: '/auth/login', component: '@/pages/Auth/Login' },
      { path: '/auth/register', component: '@/pages/Auth/Register' }
    ]
  },
  {
    path: '/',
    component: '@/layouts/BasicLayout',
    wrappers: ['@/wrappers/AuthWrapper'],
    routes: [
      { path: '/dashboard', name: '仪表盘', icon: 'DashboardOutlined' },
      {
        path: '/system',
        name: '系统管理',
        routes: [
          { path: '/system/users', name: '用户管理', component: '@/pages/System/User' },
          { path: '/system/roles', name: '角色管理', component: '@/pages/System/Role' },
          { path: '/system/permissions', name: '权限管理', component: '@/pages/System/Permission' }
        ]
      }
    ]
  }
]
```

### 4.2 路由配置说明

1. **布局组件应用**
   - 通过`component`字段指定布局组件路径
   - 支持嵌套路由，子路由自动继承父级布局
   - 布局组件接收子路由内容作为`children`属性

2. **权限包装器集成**
   - 使用`wrappers`字段配置权限包装器
   - 支持多个包装器按顺序执行
   - 包装器组件接收子组件作为`children`属性

3. **UMI框架兼容性**
   - 遵循UMI路由配置规范
   - 支持UMI路由插件功能
   - 兼容UMI运行时配置

### 4.2 权限包装器

- 使用`wrappers`字段配置权限包装器
- 实现路由级别的权限控制
- 未授权访问时自动跳转至登录页

#### 4.2.1 AuthWrapper实现示例

```typescript
import React, { useEffect } from 'react';
import { useModel, useNavigate, useLocation } from 'umi';
import { Spin } from 'antd';

const AuthWrapper: React.FC = ({ children }) => {
  const { initialState, loading, refresh } = useModel('@@initialState');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // 检查用户认证状态
    if (!initialState?.currentUser && !loading) {
      // 未登录则跳转到登录页
      navigate('/auth/login', {
        state: {
          redirect: location.pathname,
        },
      });
    }
  }, [initialState, loading]);

  if (loading) {
    return <Spin size="large" style={{ display: 'block', margin: '100px auto' }} />;
  }

  return <>{children}</>;
};

export default AuthWrapper;
```

## 5. 样式规范

### 5.1 命名规范

- 使用BEM命名规范
- 组件样式作用域隔离
- 主题变量统一管理

### 5.2 响应式设计

- 支持移动端、平板、桌面端适配
- 菜单自动折叠/展开
- 内容区域自适应布局

#### 5.2.1 断点规范

```less
// 移动设备
@screen-xs: 480px;
// 平板设备
@screen-sm: 576px;
// 小屏幕桌面
@screen-md: 768px;
// 中等屏幕桌面
@screen-lg: 992px;
// 大屏幕桌面
@screen-xl: 1200px;
// 超大屏幕桌面
@screen-xxl: 1600px;
```

#### 5.2.2 响应式实现

- 使用Ant Design的Grid系统
- 媒体查询适配不同设备
- 触摸友好的交互设计

## 6. 实现要求

### 6.1 文件创建要求

1. 在`frontend/src`目录下创建`layouts`目录（保持现有项目结构不变）
2. 在`frontend/src`目录下创建`wrappers`目录（用于存放权限包装器等高阶组件）
3. 按照上述结构创建各布局组件文件
4. 确保TypeScript类型定义完整
5. 遵循项目ESLint和Prettier规范
6. **重要**：保持现有项目结构不变，仅添加layouts和wrappers目录及相关组件

### 6.2 功能实现要求

1. BasicLayout需集成权限控制逻辑
2. 菜单支持动态渲染和权限过滤
3. 布局组件需支持主题定制
4. 确保良好的可访问性支持

### 6.3 性能要求

1. 布局组件需进行性能优化
2. 避免不必要的重渲染
3. 图标和图片资源需优化加载

## 7. 测试规范

### 7.1 单元测试

- 布局组件核心功能需编写单元测试
- 权限控制逻辑需覆盖测试
- 响应式行为需进行测试验证

### 7.2 集成测试

- 布局与路由的集成测试
- 权限包装器功能测试
- 不同设备尺寸下的显示测试

## 8. 可拓展性与调用便利性

### 8.1 可拓展性设计

1. **模块化架构**
   - 布局组件采用模块化设计，每个组件职责单一，便于独立扩展
   - 支持通过继承或组合方式添加新功能
   - 组件间松耦合，降低扩展时的相互影响

2. \*\*配置化扩展
   - 菜单配置支持动态添加新项
   - 样式变量统一管理，便于主题定制
   - 支持插槽机制，允许在特定位置插入自定义内容

3. \*\*接口扩展性
   - 组件属性设计考虑未来扩展需求
   - 提供生命周期钩子函数，支持自定义逻辑注入
   - 遵循开闭原则，对扩展开放，对修改封闭

### 8.2 调用便利性

1. \*\*统一导出机制
   - 通过`layouts/index.ts`统一导出所有布局组件
   - 支持按需导入，减少打包体积
   - 提供类型定义，支持IDE智能提示

2. \*\*简洁的使用方式
   - 布局组件使用方式简单直观
   - 支持通过路由配置自动应用布局
   - 提供高阶组件包装器，简化权限控制

3. \*\*UMI框架集成
   - 与UMI路由系统无缝集成
   - 支持UMI插件生态系统
   - 遵循UMI最佳实践

### 8.3 接口标准符合性

1. \*\*TypeScript类型安全
   - 所有组件提供完整的TypeScript类型定义
   - 遵循严格的类型检查规范
   - 支持泛型和联合类型，提高类型表达能力

2. \*\*UMI框架规范
   - 遵循UMI路由和布局规范
   - 兼容UMI插件系统
   - 符合UMI配置标准

3. \*\*React最佳实践
   - 遵循React组件设计原则
   - 使用React Hooks进行状态管理
   - 符合React性能优化建议

4. \*\*项目编码规范
   - 遵循项目ESLint和Prettier规范
   - 符合项目TypeScript配置要求
   - 遵循项目代码组织结构

## 9. 图标集引用便捷性

项目已配置`@ant-design/icons`依赖（版本^5.4.0），支持便捷地引用图标集。在组件中可以通过以下方式导入和使用图标：

```typescript
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined } from '@ant-design/icons';

// 在组件中使用
<MenuUnfoldOutlined />
<MenuFoldOutlined />
<UserOutlined />
```

这种导入方式具有以下优势：

1. **按需导入**：只导入实际使用的图标，减少打包体积
2. **类型安全**：TypeScript支持，提供完整的类型定义
3. **使用便捷**：直接作为React组件使用，支持所有SVG属性
4. **主题兼容**：图标颜色自动适应Ant Design主题

开发人员可以在任何组件中便捷地引用图标集，无需额外配置。

## 10. 总结

本设计文档定义了UG管理系统的布局规范，包括基础布局和认证布局的详细实现要求。通过遵循此规范，可以确保系统具有一致的用户界面和良好的用户体验。布局组件采用模块化设计，便于维护和扩展，同时集成了权限控制机制，确保系统的安全性。

**重要承诺**：本设计严格遵循现有项目结构，仅在`frontend/src`目录下添加`layouts`和`wrappers`目录及相关组件，不改变任何现有目录结构和文件组织方式，确保与当前开发工作完全兼容。
