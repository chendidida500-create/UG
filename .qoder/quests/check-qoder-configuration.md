# Qoder环境配置检查与设置 - UMI + Egg.js全栈开发

## 1. 概述

本文档旨在检查和配置Qoder开发环境，确保其符合UMI + Egg.js全栈开发的要求。我们将按照以下步骤进行：

1. 检查Qoder的设置、配置和插件是否符合UMI + Egg.js全栈开发环境要求
2. 根据检测结果设置好开发工具
3. 确保所有开发都按照UMI和Egg.js的代码规范、接口规范和变量规范进行
4. 构建UMI前端并与Egg.js后端协同工作，确保可以正常运行其多功能

## 2. Qoder环境配置目标

根据项目知识库中的信息，Qoder在UG项目中的配置需要满足以下目标：

1. **兼容性要求**：确保Qoder环境与UMI + Egg.js技术栈完全兼容
2. **一致性要求**：确保团队成员的开发环境配置一致
3. **自动化要求**：通过脚本化方式实现环境配置的自动化
4. **可维护性要求**：提供清晰的配置文档和检查机制

## 3. UMI + Egg.js技术组合概述

UG系统采用前后端分离架构，使用现代化的技术栈组合：

### 前端技术栈
- **框架**: UMI 4.x + React 18
- **UI库**: Ant Design 5.x
- **状态管理**: UMI Model
- **网络请求**: UMI Request/axios
- **构建工具**: Webpack 5
- **语言**: TypeScript 5.x

### 后端技术栈
- **框架**: Egg.js 3.x (基于Koa)
- **数据库**: MySQL 8.0
- **ORM**: Sequelize 6.x
- **认证**: JWT (jsonwebtoken)
- **语言**: TypeScript/JavaScript

## 4. UMI + Egg.js开发环境要求

### 4.1 技术栈要求

根据项目知识库信息，UMI + Egg.js项目的技术栈要求如下：

- **Node.js**: 20.19.0
- **包管理器**: pnpm 8.15.8
- **TypeScript**: 5.9.2版本
- **前端框架**: UMI 4.3+
- **后端框架**: Egg.js 3.x
- **React**: 18.x
- **UI组件库**: Ant Design 5.x
- **状态管理**: UMI Model
- **网络请求**: UMI Request或axios
- **数据库**: MySQL 8.0+
- **ORM**: Sequelize 6.x
- **代码质量工具**: ESLint 8.x, Prettier 3.x

### 4.2 Qoder特定要求

根据项目知识库中的Qoder配置信息，还需要满足以下特定要求：

1. **VS Code配置**：
   - 配置自动保存：`"files.autoSave": "onFocusChange"`
   - 配置保存时自动格式化：`"editor.formatOnSave": true`
   - 配置保存时ESLint自动修复：`"editor.codeActionsOnSave": { "source.fixAll.eslint": "explicit" }`

2. **自动化脚本**：
   - 提供自动格式化和检查代码脚本
   - 提供自动类型检查脚本
   - 提供自动构建项目脚本
   - 提供自动启动开发服务器脚本

3. **开发规范**：
   - 遵循UMI 4.x规范要求
   - 使用约定式路由
   - 遵循项目目录结构规范

### 4.3 开发工具要求

- **编辑器**: VS Code（推荐）
- **必要插件**: 
  - TypeScript开发支持
  - React代码片段
  - 代码质量工具(Prettier/ESLint/拼写检查)
  - Git工具(Git图形化/GitLens/GitHub Pull Request)
  - 界面增强(图标主题)
  - 开发效率工具(IntelliCode/自动重命名标签/路径智能提示/Tailwind CSS)
  - 数据库工具(SQLTools及MySQL驱动)
  - API测试工具(REST Client)
  - 文档支持(更好的注释/Markdown工具)
  - UMI开发所需的JavaScript调试工具

## 5. Qoder环境配置检查

### 5.1 当前环境状态检查

由于当前工作目录为空，我们需要从头开始配置环境。以下是需要检查和配置的项目：

1. **Node.js环境检查**
   - 检查Node.js版本是否为20.19.0
   - 检查npm版本
   - 检查pnpm是否已安装及版本（推荐8.15.8）

2. **VS Code配置检查**
   - 检查VS Code是否已安装
   - 检查必要插件是否已安装
   - 检查VS Code设置是否符合项目要求

3. **Qoder特定配置检查**
   - 检查是否配置了自动保存
   - 检查是否配置了保存时自动格式化
   - 检查是否配置了保存时ESLint自动修复

4. **项目结构初始化**
   - 初始化前后端项目结构
   - 配置UMI前端项目
   - 配置Egg.js后端项目
   - 设置TypeScript配置
   - 配置ESLint和Prettier

### 5.2 环境配置问题识别

根据项目知识库信息，以下是可能遇到的配置问题：

1. **包管理器问题**:
   - 项目要求使用pnpm而非npm或yarn
   - 需要确保pnpm版本为8.15.8

2. **TypeScript配置问题**:
   - 需要正确配置tsconfig.json文件
   - 需要设置ignoreDeprecations以避免弃用警告

3. **UMI配置问题**:
   - 需要正确配置.umirc.ts文件
   - 需要禁用MFSU以避免编译问题
   - 需要正确配置代理设置

4. **Egg.js配置问题**:
   - 需要正确配置config.default.js文件
   - 需要配置数据库连接信息
   - 需要配置CORS跨域设置

5. **代码质量工具配置问题**:
   - 需要使用ESLint 8.x的扁平化配置格式
   - 需要正确配置Prettier规则

6. **Qoder环境配置问题**:
   - VS Code设置不符合项目要求
   - 缺少自动化开发脚本
   - 未遵循UMI 4.x规范要求

## 6. Qoder环境配置设置

### 6.1 Node.js和包管理器配置

```bash
# 安装和使用指定版本的Node.js
nvm install 20.19.0
nvm use 20.19.0

# 启用Corepack并安装指定版本的pnpm
corepack enable
corepack prepare pnpm@8.15.8 --activate
```

### 6.2 VS Code配置

#### 6.2.1 必要插件安装

在VS Code中安装以下插件：
- TypeScript Importer
- ES7+ React/Redux/React-Native snippets
- Prettier - Code formatter
- ESLint
- GitLens — Git supercharged
- Git Graph
- Path Intellisense
- Auto Rename Tag
- Bracket Pair Colorizer
- indent-rainbow
- REST Client
- Better Comments
- Markdown All in One
- JavaScript Debugger
- IntelliCode

#### 6.2.2 VS Code设置配置

创建 `.vscode/settings.json` 文件：

```json
{
  "files.autoSave": "onFocusChange",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "typescript.preferences.includePackageJsonAutoImports": "on",
  "typescript.suggest.autoImports": true,
  "javascript.suggest.autoImports": true,
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "terminal.integrated.defaultProfile.windows": "Command Prompt",
  "terminal.integrated.profiles.windows": {
    "Command Prompt": {
      "path": [
        "${env:windir}\\Sysnative\\cmd.exe",
        "${env:windir}\\System32\\cmd.exe"
      ],
      "icon": "terminal-cmd"
    }
  }
}
```

> **注意事项**：根据用户的Windows开发环境偏好，建议在Windows环境下优先使用CMD终端执行命令，避免使用PowerShell，以防止命令分隔符和路径问题导致的错误。所有终端命令应该针对特定终端程序进行隔离，不要交叉使用。

### 6.2.3 Qoder自动化脚本配置

根据项目要求，创建以下自动化开发脚本：

1. **auto-format-and-lint.bat** - 自动格式化和检查代码脚本
2. **auto-type-check.bat** - 自动类型检查脚本
3. **auto-build.bat** - 自动构建项目脚本
4. **auto-dev-server.bat** - 自动启动开发服务器脚本

这些脚本应该放在项目的`scripts/`目录下，以便团队成员可以轻松使用。

#### 6.2.3.1 VS Code任务配置

为了进一步提升开发效率，可以在VS Code中配置任务，通过快捷键直接运行自动化脚本。创建`.vscode/tasks.json`文件：

```json
{
  "version": "2.0.0",
  "tasks": [
    {
      "label": "自动格式化和检查",
      "type": "shell",
      "command": "${workspaceFolder}/scripts/auto-format-and-lint.bat",
      "group": "build"
    },
    {
      "label": "自动类型检查",
      "type": "shell",
      "command": "${workspaceFolder}/scripts/auto-type-check.bat",
      "group": "build"
    },
    {
      "label": "自动构建项目",
      "type": "shell",
      "command": "${workspaceFolder}/scripts/auto-build.bat",
      "group": "build"
    },
    {
      "label": "启动开发服务器",
      "type": "shell",
      "command": "${workspaceFolder}/scripts/auto-dev-server.bat",
      "group": "build"
    },
    {
      "label": "修复编辑器状态一致性",
      "type": "shell",
      "command": "${workspaceFolder}/scripts/fix-editor-consistency-simple.bat",
      "group": "build"
    }
  ]
}
```

配置完成后，可以通过以下方式运行任务：
1. 按下 `Ctrl+Shift+P` 打开命令面板
2. 输入 `Tasks: Run Task` 并选择
3. 在任务列表中选择需要执行的任务
4. 等待任务执行完成

### 6.3 项目结构初始化

#### 6.3.1 创建前后端项目结构

```
ug-project/
├── backend/
│   ├── app/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── model/
│   │   ├── middleware/
│   │   └── router.js
│   ├── config/
│   │   ├── config.default.js
│   │   ├── plugin.js
│   │   └── config.local.js
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── app.js
│   ├── package.json
│   ├── tsconfig.json
│   └── typings.d.ts
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── models/
│   │   ├── styles/
│   │   └── assets/
│   ├── config/
│   ├── public/
│   ├── package.json
│   ├── .umirc.ts
│   ├── tsconfig.json
│   ├── eslint.config.js
│   └── .prettierrc.json
├── scripts/
├── tools/
├── monitoring/
├── .vscode/
│   └── settings.json
└── package.json
```

#### 6.3.2 初始化前端package.json

```json
{
  "name": "ug-frontend",
  "version": "1.0.0",
  "description": "UG管理系统前端",
  "engines": {
    "node": "20.19.0",
    "pnpm": "8.15.8"
  },
  "packageManager": "pnpm@8.15.8",
  "scripts": {
    "dev": "umi dev",
    "build": "umi build",
    "lint": "eslint . --ext .ts,.tsx,.js,.jsx",
    "lint:fix": "eslint . --ext .ts,.tsx,.js,.jsx --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,js,jsx,json}\""
  },
  "dependencies": {
    "@umijs/max": "^4.3.0",
    "antd": "^5.21.0",
    "@ant-design/pro-components": "^2.7.0",
    "@ant-design/icons": "^5.4.0",
    "ahooks": "^3.8.0",
    "dayjs": "^1.11.10",
    "lodash-es": "^4.17.21",
    "zustand": "^4.5.0",
    "@antv/g2plot": "^2.4.32"
  },
  "devDependencies": {
    "typescript": "^5.9.2",
    "@types/lodash-es": "^4.17.12",
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "eslint": "^8.57.0",
    "prettier": "^3.3.0",
    "@testing-library/react": "^14.3.0",
    "@testing-library/jest-dom": "^6.4.0",
    "jest": "^29.7.0"
  }
}
```

#### 6.3.3 初始化后端package.json

```json
{
  "name": "ug-backend",
  "version": "1.0.0",
  "description": "UG管理系统后端",
  "engines": {
    "node": "20.19.0",
    "pnpm": "8.15.8"
  },
  "packageManager": "pnpm@8.15.8",
  "scripts": {
    "dev": "egg-bin dev",
    "debug": "egg-bin debug",
    "start": "egg-scripts start --daemon --title=ug-backend",
    "stop": "egg-scripts stop --title=ug-backend",
    "clean": "ets clean",
    "autod": "autod",
    "lint": "eslint . --ext .ts,.js",
    "lint:fix": "eslint . --ext .ts,.js --fix",
    "cov": "egg-bin cov",
    "ci": "npm run lint && npm run cov",
    "migrate:up": "egg-sequelize migration:up",
    "migrate:down": "egg-sequelize migration:down",
    "db:seed": "egg-sequelize db:seed:all"
  },
  "dependencies": {
    "egg": "^3.31.0",
    "egg-sequelize": "^5.0.0",
    "egg-jwt": "^3.1.0",
    "egg-cors": "^3.0.1",
    "egg-validate": "^3.0.2",
    "mysql2": "^3.9.7",
    "bcryptjs": "^2.4.3",
    "lodash": "^4.17.21",
    "moment": "^2.30.1"
  },
  "devDependencies": {
    "egg-bin": "^6.10.0",
    "egg-scripts": "^3.0.1",
    "egg-sequelize-cli": "^5.0.1",
    "egg-ts-helper": "^2.1.0",
    "typescript": "^5.9.2",
    "@types/node": "^20.12.7",
    "@types/bcryptjs": "^2.4.6",
    "@types/lodash": "^4.17.0",
    "eslint": "^8.57.0",
    "prettier": "^3.3.0",
    "@typescript-eslint/eslint-plugin": "^7.7.0",
    "@typescript-eslint/parser": "^7.7.0",
    "autod": "^3.1.1"
  }
}

### 4.3.3 UMI 4.x规范配置

根据项目知识库中的UMI 4.x规范要求，需要确保以下配置：

1. **路由配置**：使用约定式路由
2. **useModel用法**：符合新规范
3. **目录结构**：遵循标准目录结构规范（src/components、src/pages、src/services、src/utils、src/models、src/styles等）
4. **JSX处理**：确保tsconfig.json正确配置JSX支持，所有JSX文件使用.tsx扩展名
5. **兼容性修复**：在UMI 4.x中，request和history需要通过插件启用或使用标准库替代实现

### 4.4 UMI配置

创建 `frontend/.umirc.ts` 文件：

```typescript
import { defineConfig } from '@umijs/max';

export default defineConfig({
  // 禁用MFSU以避免编译问题
  mfsu: false,
  
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
  
  // 启用的插件
  plugins: [
    '@umijs/plugins/dist/antd',
    '@umijs/plugins/dist/model',
    '@umijs/plugins/dist/access',
    '@umijs/plugins/dist/request',
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
      pathRewrite: { '^/api': '/api' }
    }
  },
  
  // 环境变量定义
  define: {
    'process.env.API_BASE_URL': JSON.stringify(
      process.env.NODE_ENV === 'production'
        ? 'https://api.example.com'
        : 'http://localhost:7001'
    )
  },
  
  // npm客户端配置
  npmClient: 'pnpm',
});
```

### 4.5 TypeScript配置

创建 `frontend/tsconfig.json` 文件：

```json
{
  "compilerOptions": {
    "target": "es2020",
    "module": "esnext",
    "moduleResolution": "node",
    "importHelpers": true,
    "jsx": "react-jsx",
    "esModuleInterop": true,
    "sourceMap": true,
    "baseUrl": "./",
    "strict": true,
    "paths": {
      "@/*": ["src/*"],
      "@@/*": ["src/.umi/*"]
    },
    "allowSyntheticDefaultImports": true,
    "skipLibCheck": true,
    "resolveJsonModule": true,
    "ignoreDeprecations": "6.0"
  },
  "include": [
    "src/**/*",
    "typings.d.ts"
  ]
}
```

### 4.6 ESLint配置

创建 `frontend/eslint.config.js` 文件：

```javascript
export default [
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: '@typescript-eslint/parser',
    },
    plugins: {
      '@typescript-eslint': '@typescript-eslint/eslint-plugin',
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: 'eslint-plugin-react',
      'react-hooks': 'eslint-plugin-react-hooks',
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: 'eslint-plugin-prettier',
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },
];
```

### 4.7 Prettier配置

创建 `frontend/.prettierrc.json` 文件：

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "endOfLine": "lf"
}
```

### 6.3.4 后端Egg.js配置

#### 6.3.4.1 插件配置

创建 `backend/config/plugin.js` 文件：

```javascript
module.exports = {
  sequelize: { enable: true, package: 'egg-sequelize' },
  validate: { enable: true, package: 'egg-validate' },
  cors: { enable: true, package: 'egg-cors' },
  jwt: { enable: true, package: 'egg-jwt' },
};
```

#### 6.3.4.2 基础配置

创建 `backend/config/config.default.js` 文件：

```javascript
module.exports = appInfo => {
  const config = exports = {};
  
  // Cookie签名密钥
  config.keys = appInfo.name + '_1693920000000_UG_SECRET_KEY';
  
  // 全局中间件链
  config.middleware = ['errorHandler', 'jwtAuth'];
  
  // 服务端口配置
  config.cluster = {
    listen: {
      port: 15001,
      hostname: 'localhost',
    },
  };
  
  // 安全配置
  config.security = {
    csrf: { enable: false },
    domainWhiteList: ['http://localhost:15000', 'http://127.0.0.1:15000']
  };
  
  // CORS配置
  config.cors = {
    origin: ['http://localhost:15000', 'http://127.0.0.1:15000'],
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
    credentials: true
  };
  
  // JWT认证配置
  config.jwt = {
    secret: 'UG_JWT_SECRET_KEY_2023',
    expiresIn: '24h'
  };
  
  config.jwtAuth = {
    ignore: [
      '/api/auth/login',
      '/api/auth/register',
      '/api/auth/refresh',
      '/api/health'
    ]
  };
  
  // 数据库配置
  config.sequelize = {
    dialect: 'mysql',
    host: 'localhost',
    port: 3306,
    database: 'ug',
    username: 'ug',
    password: 'zcn231101',
    timezone: '+08:00',
    define: {
      freezeTableName: true,
      underscored: true,
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
      deletedAt: 'deleted_at',
      paranoid: true
    },
    dialectOptions: {
      charset: 'utf8mb4',
      supportBigNumbers: true,
      bigNumberStrings: true,
    }
  };
  
  // 自定义配置
  config.userConfig = {
    pagination: { defaultPageSize: 20, maxPageSize: 100 },
    bcrypt: { saltRounds: 10 },
    upload: { maxFileSize: '10mb' }
  };
  
  return config;
};
```

#### 6.3.4.3 后端TypeScript配置

创建 `backend/tsconfig.json` 文件：

```json
{
  "extends": "../config/tsconfig/backend.json",
  "include": ["**/*.ts", "**/*.js", "../typings.d.ts"]
}
```

#### 6.3.4.4 后端入口文件

创建 `backend/app.js` 文件：

```javascript
module.exports = app => {
  app.beforeStart(async () => {
    console.log('🚀 UG Backend Server is starting...');
    console.log('✅ UG Backend Server started successfully!');
  });
};
```

#### 6.3.4.5 路由配置

创建 `backend/app/router.js` 文件：

```javascript
module.exports = app => {
  const { router, controller } = app;

  // 认证相关
  router.post('/api/auth/login', controller.auth.login);
  router.post('/api/auth/register', controller.auth.register);
  router.post('/api/auth/refresh', controller.auth.refresh);
  router.post('/api/auth/logout', controller.auth.logout);

  // 用户管理
  router.get('/api/users', controller.user.index);
  router.get('/api/users/:id', controller.user.show);
  router.post('/api/users', controller.user.create);
  router.put('/api/users/:id', controller.user.update);
  router.delete('/api/users/:id', controller.user.destroy);

  // 角色与权限
  router.get('/api/roles', controller.role.index);
  router.get('/api/permissions', controller.permission.index);
};
```

创建 `frontend/.prettierrc.json` 文件：

```json
{
  "printWidth": 80,
  "tabWidth": 2,
  "useTabs": false,
  "semi": true,
  "singleQuote": true,
  "quoteProps": "as-needed",
  "jsxSingleQuote": false,
  "trailingComma": "es5",
  "bracketSpacing": true,
  "bracketSameLine": false,
  "arrowParens": "avoid",
  "requirePragma": false,
  "insertPragma": false,
  "proseWrap": "preserve",
  "htmlWhitespaceSensitivity": "css",
  "endOfLine": "lf"
}
```

## 7. 代码规范和变量规范

### 7.1 代码规范

1. **文件命名规范**:
   - 组件文件使用PascalCase命名，如`UserProfile.tsx`
   - 工具文件使用camelCase命名，如`formatDate.ts`

2. **组件规范**:
   - 优先使用函数组件和Hooks
   - 组件文件应包含类型定义
   - 使用TypeScript进行类型检查

3. **样式规范**:
   - 使用CSS Modules或styled-components
   - 避免使用内联样式

4. **UMI 4.x特定规范**:
   - 遵循UMI 4.x的useModel新规范
   - 使用约定式路由配置
   - 遵循项目目录结构规范

### 7.2 变量命名规范

1. **变量命名**:
   - 使用camelCase，如`userInfo`
   - 常量使用UPPER_CASE，如`MAX_RETRY_COUNT`
   - 布尔值变量使用is、has、can等前缀，如`isLoading`

2. **函数命名**:
   - 使用动词开头，如`getUserInfo()`
   - 事件处理函数使用handle前缀，如`handleClick`

3. **类型和接口**:
   - 接口使用I前缀，如`IUser`
   - 类型别名使用T前缀，如`TUserStatus`

### 7.3 接口规范

1. **API接口设计**:
   - 使用RESTful风格
   - 统一返回格式
   - 错误处理机制

2. **请求封装**:
   - 使用umi-request或axios进行封装
   - 统一拦截器处理

### 7.4 UMI 4.x接口规范

1. **路由接口规范**:
   - 使用约定式路由配置
   - 页面组件放置在src/pages目录下
   - 组件文件使用.tsx扩展名

2. **状态管理接口规范**:
   - 使用UMI Model进行状态管理
   - 模型文件放置在src/models目录下
   - 遵循useModel新规范

3. **服务接口规范**:
   - API服务封装放置在src/services目录下
   - 使用UMI Request或axios进行HTTP请求
   - 统一错误处理机制

## 8. 构建和运行

### 8.1 开发环境运行

```bash
# 进入前端目录
cd frontend

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 8.2 生产环境构建

```bash
# 构建生产版本
pnpm build
```

### 8.3 代码检查和格式化

```bash
# 代码检查
pnpm lint

# 代码检查并自动修复
pnpm lint:fix

# 代码格式化
pnpm format
```

### 8.4 UMI 4.x特定构建配置

1. **MFSU配置**:
   - 确保在.umirc.ts中禁用MFSU以避免编译问题
   - 如遇到构建性能问题，可考虑启用并解决相关兼容性问题

2. **TypeScript配置**:
   - 确保tsconfig.json中设置ignoreDeprecations以避免弃用警告
   - 确保正确配置JSX支持

3. **UMI插件配置**:
   - 确保启用必要的UMI插件（antd、model、access、request等）
   - 检查插件版本与UMI版本的兼容性

### 8.5 前后端通信配置

#### 8.5.1 前端代理配置

在开发环境中，前端通过`.umirc.ts`中的proxy配置将API请求代理到后端服务：

```typescript
proxy: {
  '/api': {
    target: 'http://localhost:15001',
    changeOrigin: true,
    pathRewrite: { '^/api': '/api' }
  }
}
```

#### 8.5.2 后端CORS配置

后端通过CORS配置允许前端域名跨域访问：

```javascript
config.cors = {
  origin: ['http://localhost:15000', 'http://127.0.0.1:15000'],
  allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  credentials: true
};
```

#### 8.5.3 环境变量配置

前端通过环境变量管理API基础URL：

```typescript
define: {
  'process.env.API_BASE_URL': JSON.stringify(
    process.env.NODE_ENV === 'production'
      ? 'https://api.example.com'
      : 'http://localhost:15001'
  ),
}
```

### 8.6 项目启动流程

#### 8.6.1 开发环境启动

1. 启动数据库服务：
   ```bash
   # 如果使用Docker
   docker-compose up -d mysql
   ```

2. 启动后端服务：
   ```bash
   # 进入后端目录
   cd backend
   
   # 安装依赖
   pnpm install
   
   # 运行数据库迁移
   pnpm migrate:up
   
   # 启动开发服务器
   pnpm dev
   ```

3. 启动前端服务：
   ```bash
   # 进入前端目录
   cd frontend
   
   # 安装依赖
   pnpm install
   
   # 启动开发服务器
   pnpm dev
   ```

#### 8.6.2 生产环境部署

1. 构建前端项目：
   ```bash
   # 进入前端目录
   cd frontend
   
   # 构建生产版本
   pnpm build
   ```

2. 启动后端服务：
   ```bash
   # 进入后端目录
   cd backend
   
   # 安装生产依赖
   pnpm install --prod
   
   # 启动服务
   pnpm start
   ```

## 9. 验证配置

### 9.1 环境验证

1. 验证Node.js版本:
   ```bash
   node --version
   # 应该输出 v20.19.0
   ```

2. 验证pnpm版本:
   ```bash
   pnpm --version
   # 应该输出 8.15.8
   ```

### 9.2 配置文件验证

1. 检查`.umirc.ts`配置是否正确
2. 检查`tsconfig.json`配置是否正确
3. 检查ESLint和Prettier配置是否正确
4. 检查后端`config.default.js`配置是否正确
5. 检查后端`plugin.js`配置是否正确

### 9.3 功能验证

1. 启动开发服务器，检查是否能正常访问
2. 创建一个简单的组件，检查TypeScript类型检查是否正常工作
3. 运行代码检查，检查ESLint和Prettier是否正常工作
4. 执行构建命令，检查生产构建是否正常工作
5. 测试前后端通信，验证API接口是否正常工作

### 9.4 UMI 4.x特定验证

1. **路由验证**:
   - 验证约定式路由是否正常工作
   - 检查页面组件是否正确加载

2. **状态管理验证**:
   - 验证useModel是否正常工作
   - 检查状态更新和组件重渲染

3. **插件验证**:
   - 验证Ant Design组件是否正常加载
   - 检查UMI插件功能是否正常工作

### 9.5 数据库配置验证

1. 验证数据库连接：
   ```bash
   # 在后端目录中运行
   pnpm sequelize-cli db:migrate:status
   ```

2. 检查数据库表结构是否正确创建
3. 验证Sequelize模型是否能正常访问数据库

### 9.6 数据库配置注意事项

1. **MySQL 8.0兼容性**：
   - 确保使用MySQL 8.0或更高版本
   - 配置`--default-authentication-plugin=mysql_native_password`以确保与sequelize的兼容性

2. **字符集配置**：
   - 使用`utf8mb4`字符集以支持完整的Unicode字符，包括emoji
   - 确保数据库、表和列都使用相同的字符集

3. **时区设置**：
   - 配置正确的时区（+08:00）以确保时间戳的一致性
   - 在数据库连接配置中明确指定时区

4. **连接池配置**：
   - 生产环境应配置合适的连接池参数以优化性能
   - 设置最大连接数、最小连接数和超时参数

5. **安全配置**：
   - 不要在代码中硬编码数据库密码
   - 生产环境应通过环境变量提供敏感信息
   - 使用最小权限原则创建数据库用户

### 9.7 目录结构验证

### 9.8 TypeScript配置注意事项

1. **版本兼容性**：
   - 确保使用TypeScript 5.9.2版本，与项目要求保持一致
   - 避免使用过旧或过新的TypeScript版本，可能导致兼容性问题

2. **弃用警告处理**：
   - 在`tsconfig.json`中设置`"ignoreDeprecations": "5.0"`以忽略特定版本的弃用警告
   - 定期检查并更新TypeScript版本及配置以保持最佳实践

3. **严格模式配置**：
   - 启用`strictNullChecks`、`noImplicitAny`等严格类型检查选项
   - 确保类型安全，减少运行时错误

4. **模块解析配置**：
   - 使用正确的`moduleResolution`配置（如`node16`）
   - 确保模块路径解析正确，避免导入错误

5. **类型定义路径**：
   - 正确配置`typeRoots`以确保类型定义文件的正确解析
   - 避免类型解析混乱导致的编译错误

确保项目目录结构符合以下规范：

```
ug-project/
├── backend/
│   ├── app/
│   │   ├── controller/
│   │   ├── service/
│   │   ├── model/
│   │   ├── middleware/
│   │   └── router.js
│   ├── config/
│   │   ├── config.default.js
│   │   ├── plugin.js
│   │   └── config.local.js
│   ├── database/
│   │   ├── migrations/
│   │   └── seeders/
│   ├── app.js
│   ├── package.json
│   ├── tsconfig.json
│   └── typings.d.ts
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── utils/
│   │   ├── models/
│   │   ├── styles/
│   │   └── assets/
│   ├── config/
│   ├── public/
│   ├── package.json
│   ├── .umirc.ts
│   ├── tsconfig.json
│   ├── eslint.config.js
│   └── .prettierrc.json
├── scripts/
├── tools/
├── monitoring/
├── .vscode/
│   └── settings.json
└── package.json
```

1. 验证Node.js版本:
   ```bash
   node --version
   # 应该输出 v20.19.0
   ```

2. 验证pnpm版本:
   ```bash
   pnpm --version
   # 应该输出 8.15.8
   ```



## 10. 常见问题和解决方案

### 10.1 构建问题

1. **MFSU编译问题**:
   - 解决方案：在`.umirc.ts`中禁用MFSU
   
2. **TypeScript弃用警告**:
   - 解决方案：在`tsconfig.json`中设置`ignoreDeprecations`

3. **UMI 4.x兼容性问题**:
   - 解决方案：使用axios替代UMI的request，使用history库替代UMI的history实现

4. **Egg.js热更新问题**:
   - 解决方案：确保正确配置`egg-ts-helper`和`egg-bin`开发工具

### 10.2 依赖问题

1. **版本冲突**:
   - 解决方案：使用`resolutions`或`overrides`解决版本冲突

2. **缺失依赖**:
   - 解决方案：运行`pnpm install`安装缺失的依赖

### 10.3 配置问题

1. **ESLint配置问题**:
   - 解决方案：确保使用ESLint 8.x的扁平化配置格式

2. **VS Code配置问题**:
   - 解决方案：运行`fix-editor-consistency.bat`脚本修复配置

3. **UMI 4.x配置问题**:
   - 解决方案：检查并更新.umirc.ts配置文件，确保符合UMI 4.x规范

4. **Egg.js配置问题**:
   - 解决方案：检查config.default.js和plugin.js配置文件，确保插件正确启用
   - 确保数据库连接配置正确
   - 验证JWT和CORS配置是否符合安全要求