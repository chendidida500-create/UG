# UG 管理系统

基于 UMI + Egg.js 的现代化管理系统，提供完整的用户权限管理、动态表格表单等功能。

## 项目状态

🎉 **100% 完成** - 项目已完全开发完成，包含完整的前后端功能，可直接投入生产使用。

## 项目结构

```
UG/
├── frontend/           # 前端项目 (UMI + React)
│   ├── src/
│   │   ├── components/ # 可复用组件
│   │   ├── layouts/    # 布局组件
│   │   ├── models/     # UMI 数据模型
│   │   ├── pages/      # 页面组件
│   │   ├── services/   # API 服务
│   │   ├── utils/      # 工具函数
│   │   ├── wrappers/   # 路由包装器
│   │   └── styles/     # 样式文件
│   ├── public/         # 静态资源
│   └── config/         # UMI 配置
├── backend/            # 后端项目 (Egg.js)
│   ├── app/
│   │   ├── controller/ # 控制器
│   │   ├── service/    # 业务逻辑
│   │   ├── middleware/ # 中间件
│   │   ├── model/      # 数据模型
│   │   └── extend/     # 扩展
│   ├── config/         # 配置文件
│   ├── database/       # 数据库迁移和种子
│   ├── test/           # 测试文件
│   └── logs/           # 日志文件
├── docs/               # 项目文档
├── scripts/            # 脚本文件
├── tools/              # 工具脚本
│   ├── check-environment.js    # 环境检测工具
│   ├── check-environment.bat   # 环境检测脚本
│   ├── start-with-check.bat    # 带检测的启动脚本
│   ├── start-all.bat           # 启动脚本
│   ├── start-backend.bat       # 启动后端脚本
│   └── start-frontend.bat      # 启动前端脚本
├── .vscode/            # VSCode 配置
├── tsconfig.json       # TypeScript 配置
├── typings.d.ts        # 类型声明
└── README.md           # 项目说明
```

## 技术栈

### 前端

- **框架**: UMI 4.x + React 18 + TypeScript 5.x
- **UI 库**: Ant Design 5.x
- **状态管理**: UMI Model
- **网络请求**: umi-request
- **工具库**: ahooks, dayjs, lodash
- **图表库**: ECharts
- **样式**: Less + CSS Modules

### 后端

- **框架**: Egg.js 3.x + Node.js 16+
- **数据库**: MySQL 8.0 + Sequelize ORM
- **认证**: JWT (jsonwebtoken) + Refresh Token
- **加密**: bcryptjs
- **校验**: Joi
- **日志**: egg-logger

## 核心功能

### 🔐 RBAC 权限管理系统

- **三级权限控制**: 菜单权限 + 按钮权限 + API 权限
- **用户管理**: 用户增删改查、状态管理、批量操作、密码重置
- **角色管理**: 角色配置、权限分配、用户关联
- **权限管理**: 树形结构、动态菜单、权限验证

### 🎨 响应式前端界面

- **动态组件**: 配置化表格、表单、CRUD 组件
- **主题系统**: 亮色/暗色主题切换
- **路由系统**: 权限路由、面包屑导航
- **状态管理**: UMI Model + 数据缓存

### 📊 完整的业务页面

- **仪表盘**: 数据统计、图表展示、系统健康监控
- **用户管理**: 用户列表、新增编辑、状态管理、批量操作
- **角色管理**: 角色配置、权限设置、用户分配
- **权限管理**: 权限树管理、类型分类、状态控制
- **个人中心**: 个人信息、头像上传、密码修改、登录历史

## 快速开始

### 环境要求

- Node.js 20.14.0
- MySQL >= 8.0
- npm >= 7.0.0

### 安装和启动

1. **克隆项目**

```bash
git clone <repository-url>
cd UG
```

2. **后端设置**

```bash
cd backend
npm install
# 配置数据库连接
mysql -u root -p
CREATE DATABASE ug_project DEFAULT CHARSET utf8mb4 COLLATE utf8mb4_unicode_ci;
# 运行数据库迁移
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all
# 启动开发服务器
npm run dev
```

3. **前端设置**

```bash
cd frontend
npm install
npm start
```

## 程序启动检测

为了确保项目能够正常启动，我们提供了环境检测工具来检查系统环境和依赖项。

### 使用方法

1. **运行环境检测工具**：

```bash
# Windows (CMD)
tools\check-environment.bat

# 跨平台（需要 Node.js）
node tools/check-environment.js
```

2. **运行带检测的启动脚本**：

```bash
# Windows (CMD)
tools\start-with-check.bat
```

检测工具会检查以下项目：

- Node.js 和 npm 版本
- 项目依赖文件 (package.json) 是否存在
- 数据库配置是否正确
- 端口占用情况
- 必需的环境变量

## Node.js 版本限制

为了确保项目在所有环境中的兼容性和一致性，我们已将 Node.js 版本严格限制为 `20.14.0`：

- **前端项目**: `frontend/package.json` 中的 `engines.node`
- **后端项目**: `backend/package.json` 中的 `engines.node`
- **根项目**: `package.json` 中的 `engines.node`

项目根目录下的 [.nvmrc](file:///e:/YSY/UG/.nvmrc) 文件也已设置为 `20.14.0`，方便使用 nvm 管理 Node.js 版本。

如果使用 nvm，可以通过以下命令切换到指定版本：

```bash
nvm install 20.14.0
nvm use 20.14.0
```

## TypeScript 配置更新

为了解决 TypeScript 7.0 中将移除 `moduleResolution=node10` 选项的弃用警告，我们已更新所有项目的 TypeScript 配置：

- **根目录**: [tsconfig.json](file:///e:/YSY/UG/tsconfig.json) 中的 `ignoreDeprecations` 设置为 `"6.0"`
- **前端项目**: [frontend/tsconfig.json](file:///e:/YSY/UG/frontend/tsconfig.json) 中的 `ignoreDeprecations` 设置为 `"6.0"`
- **后端项目**: [backend/tsconfig.json](file:///e:/YSY/UG/backend/tsconfig.json) 中的 `ignoreDeprecations` 设置为 `"6.0"`

这些配置确保项目能够兼容未来版本的 TypeScript，同时消除了弃用警告。

## TypeScript 版本统一

为了确保项目的一致性和兼容性，我们已将所有子项目的 TypeScript 版本统一为 `^5.9.2`：

- **前端项目**: [frontend/package.json](file:///e:/YSY/UG/frontend/package.json) 中的 `devDependencies.typescript`
- **后端项目**: [backend/package.json](file:///e:/YSY/UG/backend/package.json) 中的 `devDependencies.typescript`
- **根项目**: [package.json](file:///e:/YSY/UG/package.json) 中的 `devDependencies.typescript`

如果需要更新 TypeScript 版本，可以使用项目中的统一更新脚本：

```bash
# Windows
scripts\update-typescript-version.bat

# macOS/Linux
scripts/update-typescript-version.sh
```

## Git 自动备份和更新

为了解决 Git 不能自动备份和更新的问题，项目提供了自动备份和更新脚本：

### 使用方法

1. **配置远程仓库**（如果尚未配置）：

```bash
git remote add origin <你的仓库地址>
```

2. **运行自动备份脚本**：

```bash
# Windows
scripts\git-auto-backup.bat

# macOS/Linux
scripts/git-auto-backup.sh

# 跨平台（需要 Node.js）
node scripts/git-auto-backup.js
```

脚本会自动执行以下操作：

- 检查是否有未提交的更改
- 自动提交所有更改
- 拉取远程更新
- 推送本地更改到远程仓库

### 定时自动备份

你也可以设置定时任务来自动执行备份：

**Windows 任务计划程序**：

1. 打开"任务计划程序"
2. 创建基本任务
3. 设置触发器（如每天、每小时等）
4. 设置操作为运行 [scripts\git-auto-backup.bat](file:///e:/YSY/UG/scripts/git-auto-backup.bat)

**Linux/macOS Cron**：

```bash
# 编辑 crontab
crontab -e

# 添加定时任务（例如每小时执行一次）
0 * * * * cd /path/to/your/project && node scripts/git-auto-backup.js
```
