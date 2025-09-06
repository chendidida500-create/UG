# UG 管理系统工具集

该目录包含用于项目开发、测试和部署的各种工具脚本。

## 脚本说明

### 环境检测工具

- `check-environment.js` - Node.js 环境检测工具
- `check-environment.bat` - Windows 环境检测脚本

### 启动脚本

- `start-all.bat` - 启动前后端服务
- `start-backend.bat` - 启动后端服务
- `start-frontend.bat` - 启动前端服务
- `start-with-check.bat` - 带环境检测的启动脚本
- `smart-start.bat` - 智能启动脚本（检查进程、环境并启动）

### 测试脚本

- `test-auth.js` - 认证接口测试
- `test-db-connection.js` - 数据库连接测试
- `test-permission-insert.js` - 权限插入测试
- `test-permission-update.js` - 权限更新测试

### 检查脚本

- `check-foreign-keys.js` - 外键检查
- `check-passwords.js` - 密码检查
- `check-permission-structure.js` - 权限结构检查
- `check-table-structure.js` - 表结构检查
- `check-user-roles-table.js` - 用户角色表检查
- `check-users.js` - 用户数据检查

## 使用方法

### 环境检测

```cmd
# 检查环境
tools\check-environment.bat

# 带环境检测的启动
tools\start-with-check.bat

# 智能启动（推荐）
tools\smart-start.bat
```

### 分别启动服务

```cmd
# 启动后端
tools\start-backend.bat

# 启动前端
tools\start-frontend.bat

# 启动全部
tools\start-all.bat
```

### 测试脚本

```cmd
# 测试认证
node tools/test-auth.js

# 测试数据库连接
node tools/test-db-connection.js
```

## 注意事项

1. 所有脚本应在项目根目录下运行
2. 确保已安装 Node.js 和 npm
3. 确保数据库服务已启动并可访问
4. 部分脚本可能需要先运行 `npm install` 安装依赖
