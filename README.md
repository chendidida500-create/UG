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
├── .vscode/            # VSCode 配置
├── tsconfig.json       # TypeScript 配置
├── typings.d.ts        # 类型声明
└── README.md           # 项目说明
```

## 技术栈

### 前端
- **框架**: UMI 4.x + React 18 + TypeScript 5.x
- **UI库**: Ant Design 5.x
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

### 🔐 RBAC权限管理系统
- **三级权限控制**: 菜单权限 + 按钮权限 + API权限
- **用户管理**: 用户增删改查、状态管理、批量操作、密码重置
- **角色管理**: 角色配置、权限分配、用户关联
- **权限管理**: 树形结构、动态菜单、权限验证

### 🎨 响应式前端界面
- **动态组件**: 配置化表格、表单、CRUD组件
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

## TypeScript 版本统一

为了确保项目的一致性和兼容性，我们已将所有子项目的 TypeScript 版本统一为 `^5.2.2`：

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

## 核心特性

### 1. 动态权限控制
- **菜单权限**: 基于用户权限动态生成导航菜单
- **按钮权限**: 页面操作按钮的显示/隐藏控制
- **API权限**: 后端接口访问权限验证
- **路由守卫**: 前端路由级别的权限控制

### 2. 组件化设计
- **动态表格**: 配置化表格组件，支持搜索、分页、排序、批量操作
- **动态表单**: 基于配置的表单生成，支持验证、联动、条件显示
- **CRUD组件**: 一体化增删改查组件，大幅减少重复代码
- **权限组件**: 基于权限的组件显示控制

### 3. 用户体验优化
- **响应式设计**: 完美适配桌面端和移动端
- **加载状态**: 全局Loading、按钮Loading、骨架屏
- **错误处理**: 统一错误处理、友好错误提示
- **交互反馈**: 操作确认、成功提示、进度指示

## 部署

### 开发环境
```bash
# 后端
cd backend && npm run dev

# 前端
cd frontend && npm start
```

### 生产环境
```bash
# 后端构建
cd backend && npm install --production && npm start

# 前端构建
cd frontend && npm install && npm run build
```

### Docker部署
```bash
# 使用Docker Compose一键部署
docker-compose -f docker-compose.prod.yml up -d
```

## 默认账号

### 管理员账号
- **用户名**: admin
- **密码**: 123456
- **权限**: 超级管理员，拥有所有权限

### 普通用户账号
- **用户名**: user
- **密码**: 123456
- **权限**: 普通用户，基础权限

## 文档

- [部署文档](docs/DEPLOYMENT.md) - 详细的部署指南
- [开发环境配置](docs/DEVELOPMENT.md) - VSCode开发环境配置
- [项目完成报告](docs/PROJECT_COMPLETION.md) - 项目开发完成报告
- [最终完成报告](docs/FINAL_COMPLETION_REPORT.md) - 项目最终完成报告
- [代码索引](docs/CODE_INDEX.md) - 代码文件索引，方便开发时查找
- [数据库设计](docs/DATABASE.md) - 数据库表结构、接口和配置详细说明

## 许可证

MIT License