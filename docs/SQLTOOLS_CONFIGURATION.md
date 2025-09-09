# SQLTools 数据库连接配置指南

本文档提供了如何在项目中配置 SQLTools 插件连接数据库的详细指南。

## 配置不一致说明

在项目中发现了数据库配置的不一致情况：

1. **Docker Compose 配置** (docker-compose.yml):
   - 数据库名: `ug_management`
   - 用户名: `ug_user`
   - 密码: `ug_password`

2. **项目文档和配置文件** (DATABASE.md, DATABASE_CONFIG_UPDATES.md, backend/database/config.js):
   - 数据库名: `ug`
   - 用户名: `ug`
   - 密码: `zcn231101`

根据最新的配置更新日志，**项目已统一使用文档和配置文件中的数据库配置**。下面将提供详细的配置步骤。

## SQLTools 配置步骤

### 1. 打开 SQLTools 连接管理器

在 VS Code 中打开 SQLTools 扩展面板，点击 "Add New Connection" 按钮。

### 2. 选择数据库驱动

在第一步中，选择 "MySQL/MariaDB" 作为数据库驱动。

### 3. 填写连接设置

在 Connection Assistant 的第二步中，填写以下连接信息：

#### 基础配置

| 字段名 | 值 | 备注 |
|-------|-----|------|
| Connection name | UG Database | 连接名称（可自定义） |
| Connection group | Default | 连接组（可自定义） |
| Connect using | Server and Port | 连接方式 |
| Server Address | localhost | 数据库主机 |
| Port | 3306 | 数据库端口 |
| Database | ug | 数据库名（注意：不是ug_management） |
| Username | ug | 用户名（注意：不是ug_user） |
| Password mode | SQLTools Driver Credentials | 密码模式 |

#### 高级配置

展开 "MySQL driver specific options" 部分，设置：

| 字段名 | 值 | 备注 |
|-------|-----|------|
| Authentication Protocol | default | 认证协议 |
| SSL | Disabled | SSL设置（开发环境通常禁用） |
| Over SSH | Disabled | SSH设置（开发环境通常禁用） |
| Connection Timeout | 30 | 连接超时时间（秒） |
| Show records default limit | 50 | 默认记录显示数量 |

### 4. 测试连接

点击 "TEST CONNECTION" 按钮验证连接是否成功。如果连接失败，请检查以下几点：

1. 确保 MySQL 服务已启动
2. 确认使用的是文档中指定的 `ug` 数据库和 `ug` 用户
3. 验证密码是否为 `zcn231101`
4. 检查主机和端口设置是否正确

### 5. 保存连接配置

连接测试成功后，点击 "SAVE CONNECTION" 按钮保存配置。

## Docker 环境中的特殊配置

如果您使用 Docker Compose 运行项目，请注意以下几点：

1. **Docker 内部连接**：
   - 服务间连接（如 backend 连接 mysql）使用服务名作为主机名：`mysql`
   - 端口仍为 `3306`

2. **主机连接**：
   - 从主机连接到 Docker 中的 MySQL 服务使用 `localhost` 作为主机名
   - 端口映射为 `3306:3306`（主机端口:容器端口）

3. **使用 Docker Compose 配置**：
   如果您需要使用 docker-compose.yml 中的配置（ug_management 数据库，ug_user 用户，ug_password 密码），请在配置 SQLTools 时相应修改这些字段的值。

## 常见问题排查

### 连接失败

- **问题**: 无法连接到数据库
- **解决方案**:
  1. 确认 MySQL 服务正在运行: `docker-compose up mysql -d`
  2. 检查连接参数是否正确
  3. 验证密码是否正确
  4. 查看 Docker 日志: `docker logs ug-mysql`

### 权限问题

- **问题**: 连接成功但无法访问数据库
- **解决方案**:
  1. 确认用户 `ug` 有足够的权限访问 `ug` 数据库
  2. 在 MySQL 控制台中运行: `GRANT ALL PRIVILEGES ON ug.* TO 'ug'@'%'; FLUSH PRIVILEGES;`

### 字符集问题

- **问题**: 数据显示乱码
- **解决方案**:
  1. 确认数据库字符集设置为 utf8mb4
  2. 在 SQLTools 连接设置中确保字符集配置正确

## 自动化连接脚本

项目提供了数据库连接检查脚本：

```bash
# 运行数据库连接检查脚本
./scripts/check-db-config.js
```

该脚本可以帮助验证数据库配置是否正确，并提供连接测试。

## 注意事项

1. **安全性**：请勿在代码或配置文件中硬编码数据库密码
2. **配置一致性**：开发团队成员应使用相同的数据库配置
3. **环境变量**：生产环境中使用环境变量覆盖默认配置
4. **定期备份**：定期备份数据库以防止数据丢失

---

本文档最后更新: 2025-09-09