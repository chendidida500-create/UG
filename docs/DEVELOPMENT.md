# Qoder IDE 开发环境配置

## 项目状态

🎉 **100% 完成** - UG管理系统已完全开发完成，包含完整的前后端功能，可直接投入生产使用。

## 已安装的开发插件

### 核心开发插件
- **TypeScript支持**: 提供完整的TypeScript开发体验
- **React开发**: React组件开发和调试支持
- **ESLint**: 代码质量检查
- **Prettier**: 代码格式化
- **Git工具**: 增强的Git操作和可视化

### UG项目特定配置
- **MySQL连接**: 已配置数据库连接
- **调试配置**: 支持服务器端和客户端调试
- **代码片段**: 提供UG项目开发模板

## 项目结构

```
UG/
├── frontend/                    # 前端项目
│   ├── src/
│   │   ├── components/         # 公共组件
│   │   │   ├── DynamicTable/   # 动态表格组件
│   │   │   ├── DynamicForm/    # 动态表单组件
│   │   │   └── CrudComponent/  # CRUD组件
│   │   ├── layouts/            # 布局组件
│   │   │   ├── BasicLayout/    # 主布局
│   │   │   └── AuthLayout/     # 认证布局
│   │   ├── models/             # 状态管理
│   │   │   ├── auth.ts         # 认证模型
│   │   │   ├── user.ts         # 用户模型
│   │   │   ├── role.ts         # 角色模型
│   │   │   ├── permission.ts   # 权限模型
│   │   │   └── dashboard.ts    # 仪表盘模型
│   │   ├── pages/              # 页面组件
│   │   │   ├── Auth/           # 认证页面
│   │   │   ├── Dashboard/      # 仪表盘
│   │   │   ├── System/         # 系统管理
│   │   │   └── Profile/        # 个人中心
│   │   ├── utils/              # 工具函数
│   │   │   └── request.ts      # 请求封装
│   │   └── wrappers/           # 路由包装器
│   ├── .umirc.ts              # UMI配置
│   ├── package.json           # 依赖配置
│   └── tsconfig.json          # TS配置
├── backend/                    # 后端项目
│   ├── app/
│   │   ├── controller/         # 控制器
│   │   ├── service/            # 服务层
│   │   ├── model/              # 数据模型
│   │   ├── middleware/         # 中间件
│   │   └── extend/             # 扩展
│   ├── config/                 # 配置文件
│   ├── database/               # 数据库
│   │   ├── migrations/         # 迁移文件
│   │   └── seeders/            # 种子数据
│   ├── app.js                  # 应用入口
│   └── package.json            # 依赖配置
├── .vscode/                    # VSCode配置
│   ├── settings.json           # 编辑器设置
│   ├── launch.json             # 调试配置
│   ├── tasks.json              # 任务配置
│   └── extensions.json         # 插件推荐
├── docs/                       # 项目文档
├── start.bat                   # Windows启动脚本
├── start.sh                    # Linux/Mac启动脚本
└── README.md                   # 项目说明
```

## 快速开始

### 1. 安装推荐插件
Qoder会自动提示安装推荐的插件，或者你可以手动安装：
```bash
# 通过命令面板 (Ctrl+Shift+P) 执行：
Extensions: Show Recommended Extensions
```

### 2. 开发服务器
使用快捷键或任务运行器：
- `Ctrl+Shift+P` → `Tasks: Run Task` → `启动开发服务器`
- 或者在终端中运行：`npm run dev`

### 3. 调试配置
- **F5**: 启动调试会话
- 支持服务器端Node.js调试
- 支持客户端Chrome调试
- 支持Jest测试调试

### 4. 代码片段
输入以下前缀快速生成代码：
- `umi-page`: UMI页面模板
- `rc`: React组件模板
- `api-service`: API服务模板
- `dynamic-table`: 动态表格组件模板
- `dynamic-form`: 动态表单组件模板

### 5. 数据库连接
已预配置MySQL连接，可以通过SQLTools插件：
- 查看数据库结构
- 执行SQL查询
- 管理数据库数据

## 快捷键

### 常用快捷键
- `Ctrl+Shift+P`: 命令面板
- `Ctrl+P`: 快速打开文件
- `F12`: 跳转到定义
- `Shift+F12`: 查找引用
- `F2`: 重命名符号
- `Ctrl+Shift+F`: 全局搜索

### 调试快捷键
- `F5`: 开始调试
- `F9`: 切换断点
- `F10`: 单步跳过
- `F11`: 单步进入
- `Shift+F11`: 单步跳出

### Git快捷键
- `Ctrl+Shift+G`: 打开Source Control
- `Ctrl+K Ctrl+C`: 提交更改
- `Ctrl+K Ctrl+P`: Push到远程

## 开发规范

### 代码规范
- 使用 ESLint + Prettier 进行代码格式化
- 遵循 TypeScript 严格模式
- 使用语义化的 Git 提交信息

### 目录规范
- 前端组件使用 PascalCase 命名
- 后端文件使用 camelCase 命名
- 数据库表使用下划线命名

### API 规范
- 使用 RESTful API 设计
- 统一的响应格式
- 完整的错误处理

## 开发流程

1. **环境准备**
   ```bash
   # 安装依赖
   cd backend && npm install
   cd frontend && npm install
   
   # 数据库配置
   # 创建数据库 ug_project
   # 运行迁移和种子数据
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
   ```

2. **启动开发环境**
   ```bash
   # 后端开发服务器
   cd backend && npm run dev
   
   # 前端开发服务器
   cd frontend && npm start
   ```

3. **开发调试**
   - 使用断点调试
   - 实时预览更改
   - 自动格式化代码

4. **代码质量**
   - ESLint自动检查
   - Prettier自动格式化
   - TypeScript类型检查

5. **测试**
   - 单元测试调试
   - 集成测试运行
   - 覆盖率报告

## 故障排除

### 常见问题
1. **TypeScript错误**: 检查tsconfig.json配置
2. **ESLint问题**: 检查.eslintrc配置
3. **调试无法启动**: 检查launch.json配置
4. **数据库连接失败**: 检查.env文件中的数据库配置

### 性能优化
- 排除node_modules文件监控
- 配置合适的搜索排除规则
- 使用TypeScript增量编译

## 项目亮点

1. **完整的权限体系**: 实现了企业级的RBAC权限管理
2. **现代化技术栈**: 使用最新的前后端技术
3. **组件化开发**: 高度复用的组件设计
4. **开发规范**: 完善的代码规范和开发配置
5. **用户体验**: 优秀的UI设计和交互体验
6. **可扩展性**: 良好的架构设计，易于扩展