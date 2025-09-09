# UG管理系统

这是一个基于 UMI + Egg.js 的全栈管理系统。

## 技术栈

### 前端
- UMI 4.x
- React 18
- Ant Design 5.x
- TypeScript

### 后端
- Egg.js 3.x
- MySQL 8.0
- Sequelize 6.x
- JWT认证

## 环境要求
- Node.js 20.19.0
- pnpm 8.15.8
- MySQL 8.0+

## 快速开始

### 1. 环境设置
```bash
# 克隆项目后，运行环境设置脚本
scripts\setup-environment.bat
```

或者分步执行：
```bash
# 安装前端依赖
cd frontend && pnpm install

# 安装后端依赖
cd ../backend && pnpm install

# 初始化数据库
cd ../scripts && init-database.bat
```

### 2. 数据库配置
1. 确保 MySQL 服务正在运行
2. 修改 `backend/.env` 文件中的数据库连接信息：
   ```
   MYSQL_HOST=127.0.0.1
   MYSQL_PORT=3306
   MYSQL_DATABASE=ug_development
   MYSQL_USERNAME=your_username
   MYSQL_PASSWORD=your_password
   ```

### 3. 启动开发服务器
```bash
# 使用自动化脚本启动前后端开发服务器
scripts\auto-dev-server.bat
```

或者分别启动：
```bash
# 启动后端开发服务器
cd backend && pnpm dev

# 启动前端开发服务器
cd frontend && pnpm dev
```

## 项目结构
```
UG/
├── backend/          # 后端服务
│   ├── app/          # 应用代码
│   ├── config/       # 配置文件
│   └── logs/         # 日志文件
├── frontend/         # 前端应用
│   ├── src/          # 源代码
│   └── public/       # 静态资源
├── scripts/          # 自动化脚本
└── docs/             # 文档
```

## 自动化脚本

- `scripts/auto-dev-server.bat` - 启动开发服务器
- `scripts/auto-build.bat` - 构建项目
- `scripts/auto-format-and-lint.bat` - 格式化和检查代码
- `scripts/auto-type-check.bat` - 类型检查
- `scripts/setup-environment.bat` - 环境设置
- `scripts/init-database.bat` - 数据库初始化

## VS Code 任务

项目配置了以下 VS Code 任务，可通过 `Ctrl+Shift+P` → `Tasks: Run Task` 运行：

- 自动格式化和检查
- 自动类型检查
- 自动构建项目
- 启动开发服务器
- 环境设置
- 数据库初始化

## 环境变量

### 后端 (`backend/.env`)
```
MYSQL_HOST=127.0.0.1
MYSQL_PORT=3306
MYSQL_DATABASE=ug_development
MYSQL_USERNAME=root
MYSQL_PASSWORD=password
JWT_SECRET=ug-jwt-secret-here
PORT=7001
```

### 前端 (`frontend/.env`)
```
API_BASE_URL=http://localhost:7001
PORT=8000
```