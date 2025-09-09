# UG管理系统 - 数据库设计文档

## 项目状态

🎉 **100% 完成** - 数据库设计和实现已完全完成，包含完整的表结构、索引、约束和初始数据。

## 目录

1. [数据库配置](#数据库配置)
2. [数据表结构](#数据表结构)
3. [表关系图](#表关系图)
4. [索引设计](#索引设计)
5. [约束设计](#约束设计)
6. [初始数据](#初始数据)
7. [数据库操作接口](#数据库操作接口)
8. [维护指南](#维护指南)
9. [数据库可视化工具](#数据库可视化工具)
10. [智能数据分析工具](#智能数据分析工具)

## 数据库配置

### 连接信息

- **数据库类型**: MySQL 8.0
- **字符集**: utf8mb4
- **排序规则**: utf8mb4_unicode_ci
- **时区**: +08:00 (Asia/Shanghai)

### 连接参数

```
{
  host: process.env.DB_HOST || 'localhost',
  port: parseInt(process.env.DB_PORT) || 3306,
  database: process.env.DB_DATABASE || 'ug',
  username: process.env.DB_USERNAME || 'ug',
  password: process.env.DB_PASSWORD || 'zcn231101',
  dialect: 'mysql',
  timezone: '+08:00',
  dialectOptions: {
    charset: 'utf8mb4',
    supportBigNumbers: true,
    bigNumberStrings: true,
  },
  define: {
    freezeTableName: true,
    underscored: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    deletedAt: 'deleted_at',
    paranoid: true,
  },
  logging: false,
  pool: {
    max: 20,
    min: 5,
    acquire: 30000,
    idle: 10000,
  }
}
```

### 环境变量配置

```
DB_HOST=localhost
DB_PORT=3306
DB_DATABASE=ug
DB_USERNAME=ug
DB_PASSWORD=zcn231101
DB_DIALECT=mysql
TZ=Asia/Shanghai
DB_LOGGING=off
DB_UNDERSCORED=true
```

## 数据表结构

### users 表 - 用户信息表

存储系统用户的基本信息和状态

| 字段名        | 类型         | 约束                    | 描述                     |
| ------------- | ------------ | ----------------------- | ------------------------ |
| id            | VARCHAR(36)  | PRIMARY KEY, NOT NULL   | 用户唯一标识UUID         |
| username      | VARCHAR(50)  | UNIQUE, NOT NULL        | 用户名，唯一             |
| email         | VARCHAR(100) | UNIQUE, NOT NULL        | 邮箱地址，唯一           |
| password      | VARCHAR(255) | NOT NULL                | 密码（bcrypt加密）       |
| nickname      | VARCHAR(50)  | NULL                    | 用户昵称                 |
| avatar        | VARCHAR(255) | NULL                    | 头像URL                  |
| phone         | VARCHAR(20)  | NULL                    | 手机号码                 |
| status        | TINYINT(1)   | NOT NULL, DEFAULT 1     | 用户状态：0-禁用，1-启用 |
| last_login_at | DATETIME     | NULL                    | 最后登录时间             |
| created_at    | DATETIME     | NOT NULL, DEFAULT NOW() | 创建时间                 |
| updated_at    | DATETIME     | NOT NULL, DEFAULT NOW() | 更新时间                 |
| deleted_at    | DATETIME     | NULL                    | 删除时间（软删除）       |

### roles 表 - 角色信息表

存储系统角色信息和状态

| 字段名      | 类型        | 约束                    | 描述                                           |
| ----------- | ----------- | ----------------------- | ---------------------------------------------- |
| id          | VARCHAR(36) | PRIMARY KEY, NOT NULL   | 角色唯一标识UUID                               |
| name        | VARCHAR(50) | NOT NULL                | 角色名称                                       |
| code        | VARCHAR(50) | UNIQUE, NOT NULL        | 角色编码，唯一                                 |
| description | TEXT        | NULL                    | 角色描述                                       |
| status      | TINYINT(1)  | NOT NULL, DEFAULT 1     | 角色状态：0-禁用，1-启用                       |
| is_system   | TINYINT(1)  | NOT NULL, DEFAULT 0     | 是否为系统角色：0-否，1-是（系统角色不可删除） |
| sort        | INTEGER     | NOT NULL, DEFAULT 0     | 排序权重                                       |
| created_at  | DATETIME    | NOT NULL, DEFAULT NOW() | 创建时间                                       |
| updated_at  | DATETIME    | NOT NULL, DEFAULT NOW() | 更新时间                                       |
| deleted_at  | DATETIME    | NULL                    | 删除时间（软删除）                             |

### permissions 表 - 权限信息表

存储系统权限信息，支持树形结构

| 字段名      | 类型                        | 约束                     | 描述                                       |
| ----------- | --------------------------- | ------------------------ | ------------------------------------------ |
| id          | VARCHAR(36)                 | PRIMARY KEY, NOT NULL    | 权限唯一标识UUID                           |
| name        | VARCHAR(50)                 | NOT NULL                 | 权限名称                                   |
| code        | VARCHAR(100)                | UNIQUE, NOT NULL         | 权限编码，唯一                             |
| type        | ENUM('menu','button','api') | NOT NULL, DEFAULT 'menu' | 权限类型：menu-菜单，button-按钮，api-接口 |
| parent_id   | VARCHAR(36)                 | NULL                     | 父权限ID                                   |
| path        | VARCHAR(255)                | NULL                     | 路由路径（菜单权限使用）                   |
| component   | VARCHAR(255)                | NULL                     | 组件路径（菜单权限使用）                   |
| icon        | VARCHAR(50)                 | NULL                     | 图标名称                                   |
| sort        | INTEGER                     | NOT NULL, DEFAULT 0      | 排序权重                                   |
| status      | TINYINT(1)                  | NOT NULL, DEFAULT 1      | 权限状态：0-禁用，1-启用                   |
| description | TEXT                        | NULL                     | 权限描述                                   |
| created_at  | DATETIME                    | NOT NULL, DEFAULT NOW()  | 创建时间                                   |
| updated_at  | DATETIME                    | NOT NULL, DEFAULT NOW()  | 更新时间                                   |
| deleted_at  | DATETIME                    | NULL                     | 删除时间（软删除）                         |

### user_roles 表 - 用户角色关联表

存储用户和角色的多对多关系

| 字段名     | 类型        | 约束                    | 描述             |
| ---------- | ----------- | ----------------------- | ---------------- |
| id         | VARCHAR(36) | PRIMARY KEY, NOT NULL   | 关联唯一标识UUID |
| user_id    | VARCHAR(36) | NOT NULL                | 用户ID           |
| role_id    | VARCHAR(36) | NOT NULL                | 角色ID           |
| created_at | DATETIME    | NOT NULL, DEFAULT NOW() | 创建时间         |
| updated_at | DATETIME    | NOT NULL, DEFAULT NOW() | 更新时间         |

### role_permissions 表 - 角色权限关联表

存储角色和权限的多对多关系

| 字段名        | 类型        | 约束                    | 描述             |
| ------------- | ----------- | ----------------------- | ---------------- |
| id            | VARCHAR(36) | PRIMARY KEY, NOT NULL   | 关联唯一标识UUID |
| role_id       | VARCHAR(36) | NOT NULL                | 角色ID           |
| permission_id | VARCHAR(36) | NOT NULL                | 权限ID           |
| created_at    | DATETIME    | NOT NULL, DEFAULT NOW() | 创建时间         |
| updated_at    | DATETIME    | NOT NULL, DEFAULT NOW() | 更新时间         |

## 表关系图

```
erDiagram
    users ||--o{ user_roles : has
    roles ||--o{ user_roles : includes
    roles ||--o{ role_permissions : has
    permissions ||--o{ role_permissions : includes
    permissions ||--o{ permissions : "parent-child"

    users {
        string id PK
        string username UK
        string email UK
        string password
        string nickname
        string avatar
        string phone
        tinyint status
        datetime last_login_at
        datetime created_at
        datetime updated_at
        datetime deleted_at
    }

    roles {
        string id PK
        string name
        string code UK
        text description
        tinyint status
        tinyint is_system
        integer sort
        datetime created_at
        datetime updated_at
        datetime deleted_at
    }

    permissions {
        string id PK
        string name
        string code UK
        enum type
        string parent_id FK
        string path
        string component
        string icon
        integer sort
        tinyint status
        text description
        datetime created_at
        datetime updated_at
        datetime deleted_at
    }

    user_roles {
        string id PK
        string user_id FK
        string role_id FK
        datetime created_at
        datetime updated_at
    }

    role_permissions {
        string id PK
        string role_id FK
        string permission_id FK
        datetime created_at
        datetime updated_at
    }
```

## 索引设计

### users 表索引

- `PRIMARY KEY (id)` - 主键索引
- `UNIQUE KEY idx_username (username)` - 用户名唯一索引
- `UNIQUE KEY idx_email (email)` - 邮箱唯一索引
- `KEY idx_status_created (status, created_at)` - 状态和创建时间复合索引
- `KEY idx_deleted_at (deleted_at)` - 软删除时间索引

### roles 表索引

- `PRIMARY KEY (id)` - 主键索引
- `UNIQUE KEY uk_code (code)` - 角色编码唯一索引
- `KEY idx_status_sort (status, sort)` - 状态和排序复合索引
- `KEY idx_is_system (is_system)` - 系统角色索引
- `KEY idx_deleted_at (deleted_at)` - 软删除时间索引

### permissions 表索引

- `PRIMARY KEY (id)` - 主键索引
- `UNIQUE KEY uk_code (code)` - 权限编码唯一索引
- `KEY idx_parent_id (parent_id)` - 父权限ID索引
- `KEY idx_type_status (type, status)` - 类型和状态复合索引
- `KEY idx_sort (sort)` - 排序索引
- `KEY idx_deleted_at (deleted_at)` - 软删除时间索引

### user_roles 表索引

- `PRIMARY KEY (id)` - 主键索引
- `UNIQUE KEY uk_user_role (user_id, role_id)` - 用户角色唯一复合索引
- `KEY idx_user_id (user_id)` - 用户ID索引
- `KEY idx_role_id (role_id)` - 角色ID索引

### role_permissions 表索引

- `PRIMARY KEY (id)` - 主键索引
- `UNIQUE KEY uk_role_permission (role_id, permission_id)` - 角色权限唯一复合索引
- `KEY idx_role_id (role_id)` - 角色ID索引
- `KEY idx_permission_id (permission_id)` - 权限ID索引

## 约束设计

### 外键约束

#### user_roles 表外键约束

- `fk_user_roles_user` - user_id 引用 users.id (CASCADE DELETE/UPDATE)
- `fk_user_roles_role` - role_id 引用 roles.id (CASCADE DELETE/UPDATE)

#### role_permissions 表外键约束

- `fk_role_permissions_role` - role_id 引用 roles.id (CASCADE DELETE/UPDATE)
- `fk_role_permissions_permission` - permission_id 引用 permissions.id (CASCADE DELETE/UPDATE)

#### permissions 表外键约束

- `fk_permissions_parent` - parent_id 引用 permissions.id (SET NULL DELETE, CASCADE UPDATE)

## 初始数据

### 管理员用户

- **用户名**: admin
- **邮箱**: admin@ug-system.com
- **密码**: admin123456 (bcrypt加密)
- **昵称**: 系统管理员
- **状态**: 启用 (1)

### 演示用户

- **用户名**: demo
- **邮箱**: demo@ug-system.com
- **密码**: admin123456 (bcrypt加密)
- **昵称**: 演示用户
- **状态**: 启用 (1)

### 系统角色

1. **超级管理员角色**
   - **名称**: 超级管理员
   - **编码**: super_admin
   - **描述**: 系统超级管理员，拥有所有权限
   - **状态**: 启用 (1)
   - **系统角色**: 是 (1)
   - **排序**: 1

2. **管理员角色**
   - **名称**: 管理员
   - **编码**: admin
   - **描述**: 系统管理员，拥有大部分管理权限
   - **状态**: 启用 (1)
   - **系统角色**: 是 (1)
   - **排序**: 2

3. **普通用户角色**
   - **名称**: 普通用户
   - **编码**: user
   - **描述**: 普通用户，拥有基础功能权限
   - **状态**: 启用 (1)
   - **系统角色**: 是 (1)
   - **排序**: 3

### 核心权限

系统包含完整的菜单、按钮和API权限，覆盖以下功能模块：

#### 系统管理模块

- **系统管理菜单** (system)
  - **用户管理菜单** (system:user)
    - 查看用户 (system:user:view)
    - 创建用户 (system:user:create)
    - 编辑用户 (system:user:update)
    - 删除用户 (system:user:delete)
    - 用户管理API (system:user:manage)
  - **角色管理菜单** (system:role)
    - 查看角色 (system:role:view)
    - 创建角色 (system:role:create)
    - 编辑角色 (system:role:update)
    - 删除角色 (system:role:delete)
    - 角色管理API (system:role:manage)
  - **权限管理菜单** (system:permission)
    - 查看权限 (system:permission:view)
    - 创建权限 (system:permission:create)
    - 编辑权限 (system:permission:update)
    - 删除权限 (system:permission:delete)
    - 权限管理API (system:permission:manage)

#### 其他功能模块

- **工作台菜单** (dashboard)
- **个人中心菜单** (profile)

## 数据库操作接口

### 用户相关操作

#### 创建用户

```
INSERT INTO users (id, username, email, password, nickname, status, created_at, updated_at)
VALUES (?, ?, ?, ?, ?, 1, NOW(), NOW());
```

#### 查询用户

```
-- 根据用户名或邮箱查询
SELECT * FROM users WHERE (username = ? OR email = ?) AND deleted_at IS NULL;

-- 查询用户列表（分页）
SELECT * FROM users WHERE deleted_at IS NULL
ORDER BY created_at DESC
LIMIT ? OFFSET ?;

-- 查询用户详情
SELECT * FROM users WHERE id = ? AND deleted_at IS NULL;
```

#### 更新用户

```
-- 更新用户信息
UPDATE users SET nickname = ?, phone = ?, updated_at = NOW() WHERE id = ?;

-- 更新用户状态
UPDATE users SET status = ?, updated_at = NOW() WHERE id = ?;

-- 更新密码
UPDATE users SET password = ?, updated_at = NOW() WHERE id = ?;
```

#### 删除用户（软删除）

```
UPDATE users SET deleted_at = NOW(), updated_at = NOW() WHERE id = ?;
```

### 角色相关操作

#### 创建角色

```
INSERT INTO roles (id, name, code, description, status, is_system, sort, created_at, updated_at)
VALUES (?, ?, ?, ?, 1, 0, 0, NOW(), NOW());
```

#### 查询角色

```
-- 查询角色列表
SELECT * FROM roles WHERE deleted_at IS NULL ORDER BY sort ASC;

-- 查询角色详情
SELECT * FROM roles WHERE id = ? AND deleted_at IS NULL;

-- 查询用户的角色
SELECT r.* FROM roles r
JOIN user_roles ur ON r.id = ur.role_id
WHERE ur.user_id = ? AND r.deleted_at IS NULL;
```

#### 更新角色

```
-- 更新角色信息
UPDATE roles SET name = ?, description = ?, sort = ?, updated_at = NOW() WHERE id = ?;

-- 更新角色状态
UPDATE roles SET status = ?, updated_at = NOW() WHERE id = ?;
```

#### 删除角色（软删除）

```
UPDATE roles SET deleted_at = NOW(), updated_at = NOW() WHERE id = ?;
```

### 权限相关操作

#### 创建权限

```
INSERT INTO permissions (id, name, code, type, parent_id, path, component, icon, sort, status, description, created_at, updated_at)
VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, 1, ?, NOW(), NOW());
```

#### 查询权限

```
-- 查询所有权限（树形结构）
SELECT * FROM permissions WHERE deleted_at IS NULL ORDER BY sort ASC;

-- 查询角色的权限
SELECT p.* FROM permissions p
JOIN role_permissions rp ON p.id = rp.permission_id
WHERE rp.role_id = ? AND p.deleted_at IS NULL;

-- 查询用户的权限（通过角色）
SELECT DISTINCT p.* FROM permissions p
JOIN role_permissions rp ON p.id = rp.permission_id
JOIN user_roles ur ON rp.role_id = ur.role_id
WHERE ur.user_id = ? AND p.deleted_at IS NULL;
```

#### 更新权限

```
-- 更新权限信息
UPDATE permissions SET name = ?, path = ?, component = ?, icon = ?, sort = ?, updated_at = NOW() WHERE id = ?;

-- 更新权限状态
UPDATE permissions SET status = ?, updated_at = NOW() WHERE id = ?;
```

#### 删除权限（软删除）

```
UPDATE permissions SET deleted_at = NOW(), updated_at = NOW() WHERE id = ?;
```

### 关联操作

#### 用户角色关联

```
-- 分配角色给用户
INSERT INTO user_roles (id, user_id, role_id, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW());

-- 移除用户角色
DELETE FROM user_roles WHERE user_id = ? AND role_id = ?;

-- 查询用户的所有角色
SELECT r.* FROM roles r
JOIN user_roles ur ON r.id = ur.role_id
WHERE ur.user_id = ? AND r.deleted_at IS NULL;
```

#### 角色权限关联

```
-- 分配权限给角色
INSERT INTO role_permissions (id, role_id, permission_id, created_at, updated_at) VALUES (?, ?, ?, NOW(), NOW());

-- 移除角色权限
DELETE FROM role_permissions WHERE role_id = ? AND permission_id = ?;

-- 查询角色的所有权限
SELECT p.* FROM permissions p
JOIN role_permissions rp ON p.id = rp.permission_id
WHERE rp.role_id = ? AND p.deleted_at IS NULL;
```

## 维护指南

### 数据库备份

```
# 备份整个数据库
mysqldump -u root -pzcn231101 ug_project > backup_$(date +%Y%m%d_%H%M%S).sql

# 备份特定表
mysqldump -u root -pzcn231101 ug_project users roles permissions > backup_tables_$(date +%Y%m%d_%H%M%S).sql
```

### 数据库恢复

```
# 恢复数据库
mysql -u root -pzcn231101 ug_project < backup_20240906_120000.sql
```

### 性能优化

#### 查询优化

```
-- 为常用查询字段添加索引
CREATE INDEX idx_users_status ON users(status);
CREATE INDEX idx_roles_code ON roles(code);
CREATE INDEX idx_permissions_type ON permissions(type);

-- 分析查询性能
EXPLAIN SELECT * FROM users WHERE username = 'admin';
```

#### 连接池配置

```
// 后端连接池配置
pool: {
  max: 20,        // 最大连接数
  min: 5,         // 最小连接数
  acquire: 30000, // 获取连接超时时间(ms)
  idle: 10000     // 空闲连接释放时间(ms)
}
```

### 监控和日志

#### 慢查询日志

```
-- 启用慢查询日志
SET GLOBAL slow_query_log = 'ON';
SET GLOBAL long_query_time = 2;

-- 查看慢查询
SHOW VARIABLES LIKE 'slow_query_log%';
SHOW VARIABLES LIKE 'long_query_time';
```

#### 数据库状态监控

```
-- 查看连接数
SHOW STATUS LIKE 'Threads_connected';

-- 查看查询统计
SHOW STATUS LIKE 'Questions';
SHOW STATUS LIKE 'Slow_queries';

-- 查看表状态
SHOW TABLE STATUS LIKE 'users';
```

### 安全维护

#### 定期更新

```
-- 更新用户密码
UPDATE users SET password = ? WHERE id = ?;

-- 禁用长期未登录用户
UPDATE users SET status = 0
WHERE last_login_at < DATE_SUB(NOW(), INTERVAL 180 DAY)
AND status = 1;
```

#### 权限审计

```
-- 查看用户角色分配
SELECT u.username, r.name as role_name
FROM users u
JOIN user_roles ur ON u.id = ur.user_id
JOIN roles r ON ur.role_id = r.id
WHERE u.deleted_at IS NULL AND r.deleted_at IS NULL;

-- 查看角色权限分配
SELECT r.name as role_name, p.name as permission_name
FROM roles r
JOIN role_permissions rp ON r.id = rp.role_id
JOIN permissions p ON rp.permission_id = p.id
WHERE r.deleted_at IS NULL AND p.deleted_at IS NULL;
```

## 数据库可视化工具

### ChartDB工具介绍

ChartDB是一个免费开源的数据库图表可视化工具，可以帮助开发者和数据库管理员：
- 可视化数据库模式并生成富有洞察力的图表
- 通过单个查询即时可视化数据库架构
- 支持多种流行的数据库管理系统

### 部署和访问

1. **部署方式**：已集成到项目的docker-compose.yml中，作为chartdb服务运行
2. **访问地址**：http://localhost:3002
3. **连接配置**：
   - 数据库主机：mysql
   - 端口：3306
   - 数据库名：ug_management
   - 用户名：ug_user
   - 密码：ug_password
   - 数据库类型：MySQL

### 使用说明

1. **导入数据库结构**：
   - 访问ChartDB界面
   - 输入数据库连接信息
   - 点击"导入"按钮自动生成ER图

2. **编辑和导出**：
   - 可拖拽调整表位置
   - 支持导出为PNG、SVG、JSON等格式
   - 可保存项目以便后续编辑

3. **在UG系统中使用**：
   - 通过系统菜单访问ChartDB功能
   - 查看和编辑数据库结构
   - 导出图表用于文档说明

## 智能数据分析工具

### WrenAI工具介绍

WrenAI是一个开源的生成式商业智能（GenBI）平台，允许用户通过自然语言与数据交互，生成SQL查询、构建图表和创建洞察。它简化了数据分析流程，使非技术用户也能轻松查询数据库并获得有价值的业务洞察。

### 功能特性

1. **自然语言查询** - 用户可以通过自然语言提问来查询数据库
2. **SQL自动生成** - 基于自然语言输入自动生成准确的SQL查询语句
3. **数据可视化** - 自动生成图表和可视化报告
4. **语义层支持** - 通过建模定义语言（MDL）编码关系、计算和模式逻辑
5. **多数据库支持** - 支持多种流行数据库和数据仓库

### 部署和访问

1. **部署方式**：已集成到项目的docker-compose.yml中，作为wrenai服务运行
2. **访问地址**：http://localhost:3003
3. **连接配置**：
   - 数据库主机：mysql
   - 端口：3306
   - 数据库名：ug_management
   - 用户名：ug_user
   - 密码：ug_password
   - 数据库类型：MySQL
   - LLM提供商：OpenAI（需要配置API密钥）

### 使用说明

1. **自然语言查询**：
   - 访问WrenAI界面
   - 在查询框中输入自然语言问题，如"显示最近一个月的用户注册数量"
   - 系统将自动生成SQL并执行查询

2. **查看结果**：
   - 查看生成的查询结果
   - 系统自动创建可视化图表
   - 可导出结果为CSV或图片格式

3. **在UG系统中使用**：
   - 通过系统菜单访问WrenAI功能
   - 进行数据分析和可视化
   - 创建和分享数据报表

---

_本文档最后更新: 2025-09-08_