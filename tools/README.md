# 工具脚本目录

此目录包含用于开发、调试和维护的工具脚本。

## 脚本说明

### 1. 数据库连接测试
- **文件**: `test-db-connection.js`
- **用途**: 测试数据库连接是否正常
- **使用方法**: 
  ```bash
  node test-db-connection.js
  ```
  或
  ```bash
  npm run test-connection
  ```

### 2. 权限插入测试
- **文件**: `test-permission-insert.js`
- **用途**: 测试权限数据插入功能
- **使用方法**: 
  ```bash
  node test-permission-insert.js
  ```
  或
  ```bash
  npm run test-permission-insert
  ```

### 3. 权限更新测试
- **文件**: `test-permission-update.js`
- **用途**: 测试权限数据更新功能
- **使用方法**: 
  ```bash
  node test-permission-update.js
  ```
  或
  ```bash
  npm run test-permission-update
  ```

### 4. 外键约束检查
- **文件**: `check-foreign-keys.js`
- **用途**: 检查数据库外键约束
- **使用方法**: 
  ```bash
  node check-foreign-keys.js
  ```
  或
  ```bash
  npm run check-foreign-keys
  ```

### 5. 权限结构检查
- **文件**: `check-permission-structure.js`
- **用途**: 检查权限数据结构和父子关系
- **使用方法**: 
  ```bash
  node check-permission-structure.js
  ```
  或
  ```bash
  npm run check-permission-structure
  ```

## 使用说明

所有脚本都会自动从项目配置文件中读取数据库连接信息，无需手动修改连接参数。

确保在项目根目录下运行这些脚本，因为它们依赖于相对路径引用的配置文件。

## 安装依赖

在tools目录下运行以下命令安装依赖：

```bash
npm install
```

## 快捷命令

可以使用npm脚本快速运行工具：

```bash
# 测试数据库连接
npm run test-connection

# 测试权限插入
npm run test-permission-insert

# 测试权限更新
npm run test-permission-update

# 检查外键约束
npm run check-foreign-keys

# 检查权限结构
npm run check-permission-structure
```