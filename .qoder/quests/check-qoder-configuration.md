# Qoder环境配置检查与设置 - UMI 4前端开发

## 1. 概述

本文档旨在检查和配置Qoder开发环境，确保其符合UMI 4最新版前端开发的要求。我们将按照以下步骤进行：

1. 检查Qoder的设置、配置和插件是否符合UMI 4的最新版前端开发环境要求
2. 根据检测结果设置好开发工具
3. 确保所有开发都按照UMI最新版前端的代码规范、接口规范和变量规范进行
4. 构建UMI最新版前端并确保可以正常运行其多功能

## 2. Qoder环境配置目标

根据项目知识库中的信息，Qoder在UG项目中的配置需要满足以下目标：

1. **兼容性要求**：确保Qoder环境与UMI 4.x框架完全兼容
2. **一致性要求**：确保团队成员的开发环境配置一致
3. **自动化要求**：通过脚本化方式实现环境配置的自动化
4. **可维护性要求**：提供清晰的配置文档和检查机制

## 3. UMI 4.x框架特性

UMI 4.x是最新版的前端应用框架，具有以下特性：

1. **现代化技术栈**：基于React 18和TypeScript 5.x
2. **插件化架构**：通过插件扩展功能，如Ant Design、状态管理、权限控制等
3. **约定式路由**：自动根据目录结构生成路由配置
4. **构建优化**：支持MFSU等构建优化技术（但可能需要根据项目情况调整）
5. **开发体验**：热重载、代理配置、环境变量等开发便利功能

## 4. UMI 4前端开发环境要求

### 2.1 技术栈要求

根据项目知识库信息，UMI 4.x项目的技术栈要求如下：

- **Node.js**: 版本18或更高版本（推荐20.19.0）
- **包管理器**: pnpm 8.15.8
- **TypeScript**: 5.9.2版本
- **前端框架**: UMI 4.3+
- **React**: 18.x
- **UI组件库**: Ant Design 5.x
- **状态管理**: UMI Model或Zustand 4.5+
- **网络请求**: UMI Request或axios
- **代码质量工具**: ESLint 8.x, Prettier 3.x
- **数据库**: MySQL 8.x

### 2.2 Qoder特定要求

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

### 2.2 开发工具要求

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

### 3.1 当前环境状态检查

由于当前工作目录为空，我们需要从头开始配置环境。以下是需要检查和配置的项目：

1. **Node.js环境检查**
   - 检查Node.js版本是否为18+（推荐20.19.0）
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
   - 初始化前端项目结构
   - 配置UMI 4项目
   - 设置TypeScript配置
   - 配置ESLint和Prettier

### 3.2 环境配置问题识别

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

4. **代码质量工具配置问题**:
   - 需要使用ESLint 8.x的扁平化配置格式
   - 需要正确配置Prettier规则

5. **Qoder环境配置问题**:
   - VS Code设置不符合项目要求
   - 缺少自动化开发脚本
   - 未遵循UMI 4.x规范要求

## 6. Qoder环境配置设置

### 4.1 Node.js和包管理器配置

```bash
# 安装和使用指定版本的Node.js
nvm install 20.19.0
nvm use 20.19.0

# 启用Corepack并安装指定版本的pnpm
corepack enable
corepack prepare pnpm@8.15.8 --activate
```

### 4.2 VS Code配置

#### 4.2.1 必要插件安装

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

#### 4.2.2 VS Code设置配置

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
  "editor.defaultFormatter": "esbenp.prettier-vscode"
}
```

### 4.2.3 Qoder自动化脚本配置

根据项目要求，创建以下自动化开发脚本：

1. **auto-format-and-lint.bat** - 自动格式化和检查代码脚本
2. **auto-type-check.bat** - 自动类型检查脚本
3. **auto-build.bat** - 自动构建项目脚本
4. **auto-dev-server.bat** - 自动启动开发服务器脚本

这些脚本应该放在项目的`scripts/`目录下，以便团队成员可以轻松使用。

### 4.3 项目结构初始化

#### 4.3.1 创建前端项目结构

```
frontend/
├── src/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── utils/
│   ├── models/
│   ├── styles/
│   └── assets/
├── config/
├── public/
└── package.json
```

#### 4.3.2 初始化package.json

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

## 7. 代码规范和变量规范

### 5.1 代码规范

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

### 5.2 变量命名规范

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

### 5.3 接口规范

1. **API接口设计**:
   - 使用RESTful风格
   - 统一返回格式
   - 错误处理机制

2. **请求封装**:
   - 使用umi-request或axios进行封装
   - 统一拦截器处理

### 5.4 UMI 4.x接口规范

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

### 6.1 开发环境运行

```bash
# 进入前端目录
cd frontend

# 安装依赖
pnpm install

# 启动开发服务器
pnpm dev
```

### 6.2 生产环境构建

```bash
# 构建生产版本
pnpm build
```

### 6.3 代码检查和格式化

```bash
# 代码检查
pnpm lint

# 代码检查并自动修复
pnpm lint:fix

# 代码格式化
pnpm format
```

### 6.4 UMI 4.x特定构建配置

1. **MFSU配置**:
   - 确保在.umirc.ts中禁用MFSU以避免编译问题
   - 如遇到构建性能问题，可考虑启用并解决相关兼容性问题

2. **TypeScript配置**:
   - 确保tsconfig.json中设置ignoreDeprecations以避免弃用警告
   - 确保正确配置JSX支持

3. **UMI插件配置**:
   - 确保启用必要的UMI插件（antd、model、access、request等）
   - 检查插件版本与UMI版本的兼容性

## 9. 验证配置

### 7.1 环境验证

1. 验证Node.js版本:
   ```bash
   node --version
   # 应该输出 v20.14.0
   ```

2. 验证pnpm版本:
   ```bash
   pnpm --version
   # 应该输出 8.15.8
   ```

### 7.2 配置文件验证

1. 检查`.umirc.ts`配置是否正确
2. 检查`tsconfig.json`配置是否正确
3. 检查ESLint和Prettier配置是否正确

### 7.3 功能验证

1. 启动开发服务器，检查是否能正常访问
2. 创建一个简单的组件，检查TypeScript类型检查是否正常工作
3. 运行代码检查，检查ESLint和Prettier是否正常工作
4. 执行构建命令，检查生产构建是否正常工作

### 7.4 UMI 4.x特定验证

1. **路由验证**:
   - 验证约定式路由是否正常工作
   - 检查页面组件是否正确加载

2. **状态管理验证**:
   - 验证useModel是否正常工作
   - 检查状态更新和组件重渲染

3. **插件验证**:
   - 验证Ant Design组件是否正常加载
   - 检查UMI插件功能是否正常工作

## 10. 常见问题和解决方案

### 8.1 构建问题

1. **MFSU编译问题**:
   - 解决方案：在`.umirc.ts`中禁用MFSU
   
2. **TypeScript弃用警告**:
   - 解决方案：在`tsconfig.json`中设置`ignoreDeprecations`

3. **UMI 4.x兼容性问题**:
   - 解决方案：使用axios替代UMI的request，使用history库替代UMI的history实现

### 8.2 依赖问题

1. **版本冲突**:
   - 解决方案：使用`resolutions`或`overrides`解决版本冲突

2. **缺失依赖**:
   - 解决方案：运行`pnpm install`安装缺失的依赖

### 8.3 配置问题

1. **ESLint配置问题**:
   - 解决方案：确保使用ESLint 8.x的扁平化配置格式

2. **VS Code配置问题**:
   - 解决方案：运行`fix-editor-consistency.bat`脚本修复配置

3. **UMI 4.x配置问题**:
   - 解决方案：检查并更新.umirc.ts配置文件，确保符合UMI 4.x规范