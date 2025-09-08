# 完整的项目部署文档

# UG管理系统 - 部署指南

## 项目状态

🎉 **100% 完成** - UG管理系统已完全开发完成，包含完整的前后端功能，可直接投入生产使用。

## 目录

1. [系统要求](#系统要求)
2. [开发环境部署](#开发环境部署)
3. [生产环境部署](#生产环境部署)
4. [Docker部署](#docker部署)
5. [监控配置](#监控配置)
6. [维护指南](#维护指南)
7. [故障排除](#故障排除)

## 系统要求

### 最低配置

- **CPU**: 2核心
- **内存**: 4GB RAM
- **存储**: 20GB 可用空间
- **操作系统**: Ubuntu 20.04 LTS / CentOS 8 / Docker

### 推荐配置

- **CPU**: 4核心以上
- **内存**: 8GB RAM以上
- **存储**: 50GB SSD
- **网络**: 100Mbps带宽

### 软件依赖

- **Node.js**: 20.19.0 或更高版本
- **MySQL**: 8.0 或更高版本
- **Redis**: 6.x 或更高版本
- **Docker**: 20.10 或更高版本
- **Docker Compose**: 1.29 或更高版本

## 开发环境部署

### 1. 环境准备

```bash
# 安装 Node.js (使用 NodeSource 仓库确保版本正确)
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装 MySQL
sudo apt update
sudo apt install mysql-server

# 安装 Redis
sudo apt install redis-server

# 验证安装
node --version  # 应该显示 v20.19.0 或更高版本
npm --version
mysql --version
redis-server --version
```

### 2. 项目部署

```bash
# 克隆项目 (请将 <repository-url> 替换为实际的仓库地址)
git clone <repository-url>
cd ug-management

# 后端部署
cd backend
npm install

# 复制配置文件并根据环境修改
cp config/config.default.js config/config.local.js
# 修改 config/config.local.js 中的数据库配置

# 执行数据库迁移和种子数据 (使用 sequelize-cli)
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# 启动后端开发服务器
npm run dev

# 前端部署
cd ../frontend
npm install
npm run dev
```

### 3. 访问地址

- 前端: http://localhost:8000
- 后端: http://localhost:7001

## 生产环境部署

### 方式一: 手动部署

#### 1. 系统环境配置

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装必要软件
sudo apt install -y nginx mysql-server redis-server nodejs npm git curl

# 配置防火墙
sudo ufw allow 22
sudo ufw allow 80
sudo ufw allow 443
sudo ufw enable
```

#### 2. 数据库配置

```bash
# MySQL 安全配置
sudo mysql_secure_installation

# 创建数据库和用户 (请将 'your_secure_password_here' 替换为强密码)
sudo mysql -u root -p
CREATE DATABASE ug_management CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
CREATE USER 'ug_user'@'%' IDENTIFIED BY 'your_secure_password_here';
GRANT ALL PRIVILEGES ON ug_management.* TO 'ug_user'@'%';
FLUSH PRIVILEGES;
EXIT;

# Redis 配置
sudo systemctl enable redis-server
sudo systemctl start redis-server
```

#### 3. 应用部署

```bash
# 创建应用目录
sudo mkdir -p /opt/ug-management
sudo chown -R $USER:$USER /opt/ug-management
cd /opt/ug-management

# 克隆项目到新目录 (避免覆盖现有文件)
cd /opt
git clone <repository-url> ug-management
sudo chown -R $USER:$USER ug-management
cd ug-management

# 部署后端
cd backend
npm ci --production

# 复制并配置生产环境参数
cp config/config.default.js config/config.prod.js
# 修改 config/config.prod.js 中的数据库配置，使用环境变量管理敏感信息

# 执行数据库迁移和种子数据
npx sequelize-cli db:migrate
npx sequelize-cli db:seed:all

# 使用 PM2 管理进程
npm install -g pm2
pm2 start ecosystem.config.js --env production
pm2 save
pm2 startup

# 部署前端
cd ../frontend
npm ci
npm run build

# 配置 Nginx (nginx.conf 文件位于项目根目录)
sudo cp nginx.conf /etc/nginx/sites-available/ug-management
sudo ln -s /etc/nginx/sites-available/ug-management /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 方式二: 使用自动化脚本

```bash
# 下载并执行部署脚本 (请将 URL 替换为实际的脚本地址)
wget https://raw.githubusercontent.com/your-repo/ug-management/main/scripts/deploy-production.sh
chmod +x deploy-production.sh

# 在执行前检查脚本内容，确保符合您的环境要求
cat deploy-production.sh

# 执行部署脚本
sudo ./deploy-production.sh
```

## Docker部署

### 1. 快速启动

```bash
# 克隆项目 (请将 <repository-url> 替换为实际的仓库地址)
git clone <repository-url>
cd ug-management

# 启动所有服务
docker-compose up -d

# 查看服务状态
docker-compose ps

# 查看日志
docker-compose logs -f
```

### 2. 生产环境Docker部署

```bash
# 使用生产环境配置
docker-compose -f docker-compose.prod.yml up -d

# 初始化数据库 (确保后端容器已安装依赖)
docker-compose exec backend npx sequelize-cli db:migrate
docker-compose exec backend npx sequelize-cli db:seed:all
```

### 3. 常用Docker命令

```bash
# 停止服务
docker-compose down

# 重启服务
docker-compose restart

# 更新镜像
docker-compose pull
docker-compose up -d

# 查看资源使用
docker stats

# 进入容器
docker-compose exec backend bash
docker-compose exec frontend sh
```

## 监控配置

### 1. Prometheus + Grafana

```bash
# 启动监控服务
docker-compose up -d prometheus grafana

# 访问监控面板
# Grafana: http://localhost:3000 (admin/admin123456)
# Prometheus: http://localhost:9090
```

### 2. 告警配置

```bash
# 配置邮件告警
cp monitoring/alertmanager.yml.example monitoring/alertmanager.yml
# 修改邮件配置，避免在配置文件中硬编码密码，建议使用环境变量

# 重启告警服务
docker-compose restart alertmanager
```

### 3. 日志收集 (ELK Stack)

```bash
# 启动日志收集服务
docker-compose up -d elasticsearch logstash kibana

# 访问日志面板
# Kibana: http://localhost:5601
```

## 维护指南

### 1. 日常维护任务

#### 数据备份

```bash
# 数据库备份 (避免在命令行中暴露密码，建议使用 .my.cnf 配置文件)
# 首先创建 ~/.my.cnf 文件:
# [client]
# user=root
# password=your_secure_password_here

docker exec ug-mysql mysqldump ug_management > backup_$(date +%Y%m%d).sql

# 文件备份 (使用相对路径避免绝对路径问题)
cd /opt/ug-management
tar -czf ~/uploads_backup_$(date +%Y%m%d).tar.gz uploads/
```

#### 日志管理

```bash
# 查看应用日志
docker-compose logs backend
docker-compose logs frontend

# 清理日志
docker-compose exec backend npm run logs:clean

# 日志轮转 (已在logrotate中配置)
sudo logrotate -f /etc/logrotate.d/ug-management
```

#### 性能监控

```bash
# 系统资源监控
htop
iotop
docker stats

# 数据库性能
docker-compose exec mysql mysql -u root -p -e "SHOW PROCESSLIST;"
docker-compose exec mysql mysql -u root -p -e "SHOW ENGINE INNODB STATUS\G"

# 应用性能
curl http://localhost:7001/metrics
```

### 2. 更新部署

#### 应用更新

```bash
# 拉取最新代码
git pull origin main

# 更新后端
cd backend
npm ci
npx sequelize-cli db:migrate

# 重启后端服务
docker-compose restart backend

# 更新前端
cd frontend
npm ci
npm run build

# 重启前端服务
docker-compose restart frontend
```

#### 系统更新

```bash
# 更新系统包
sudo apt update && sudo apt upgrade -y

# 更新Docker镜像
docker-compose pull
docker-compose up -d

# 清理无用镜像
docker system prune -a
```

### 3. 安全维护

#### SSL证书更新

```bash
# 使用 Let's Encrypt
sudo certbot --nginx -d yourdomain.com

# 自动续期
sudo crontab -e
0 12 * * * /usr/bin/certbot renew --quiet
```

#### 安全扫描

```bash
# 漏洞扫描 (建议先在开发/测试环境运行和测试)
# 1. 在开发环境运行 `npm audit`
# 2. 全面测试
# 3. 将更新后的 package-lock.json 部署到生产环境
# 4. 在生产环境运行 `npm ci` (而不是 `npm audit fix`)

npm audit

# 依赖更新
npm update

# 容器安全扫描
docker scout cves ug-backend:latest
```

## 故障排除

### 1. 常见问题

#### 服务无法启动

```bash
# 检查端口占用
netstat -tlnp | grep :7001
netstat -tlnp | grep :3306

# 检查服务状态
docker-compose ps
systemctl status nginx mysql redis

# 查看错误日志
docker-compose logs backend
tail -f /var/log/nginx/error.log
```

#### 数据库连接问题

```bash
# 测试数据库连接
docker-compose exec backend npm run test:db

# 检查数据库状态
docker-compose exec mysql mysql -u root -p -e "SHOW VARIABLES LIKE 'max_connections';"

# 重置数据库密码 (在 Docker 环境中，用户主机名通常是 %)
docker-compose exec mysql mysql -u root -p
CREATE USER 'ug_user'@'%' IDENTIFIED BY 'your_new_secure_password_here';
GRANT ALL PRIVILEGES ON ug_management.* TO 'ug_user'@'%';
FLUSH PRIVILEGES;
```

#### 内存不足

```bash
# 检查内存使用
free -h
docker stats

# 清理缓存
echo 3 | sudo tee /proc/sys/vm/drop_caches

# 重启服务
docker-compose restart
```

### 2. 性能优化

#### 数据库优化

```sql
-- 查看慢查询
SHOW VARIABLES LIKE 'slow_query_log';
SHOW VARIABLES LIKE 'long_query_time';

-- 分析查询
EXPLAIN SELECT * FROM users WHERE username = 'admin';

-- 添加索引
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_status ON users(status);
```

#### 应用优化

```bash
# Node.js 内存优化
export NODE_OPTIONS="--max-old-space-size=4096"

# 开启 Nginx gzip
# 已在 nginx.conf 中配置

# Redis 内存优化
docker-compose exec redis redis-cli CONFIG SET maxmemory 1gb
docker-compose exec redis redis-cli CONFIG SET maxmemory-policy allkeys-lru
```

### 3. 灾难恢复

#### 数据恢复

```bash
# 恢复数据库 (从 .my.cnf 文件读取密码)
docker-compose exec mysql mysql ug_management < backup_20240906.sql

# 恢复文件
tar -xzf ~/uploads_backup_20240906.tar.gz -C /opt/ug-management/

# 重启服务
docker-compose restart
```

#### 系统恢复

```bash
# 完整系统重建
sudo ./scripts/deploy-production.sh

# 恢复数据
# (执行数据恢复步骤)

# 验证服务
curl -f http://localhost/api/health
```

## 重要提醒

⚠️ **注意**: 请将文档中所有的 `<repository-url>`、`yourdomain.com`、`example.com` 等占位符替换为你实际的配置信息。
⚠️ **安全**: 避免在命令行或配置文件中硬编码密码，推荐使用环境变量或配置文件管理敏感信息。
⚠️ **测试**: 在生产环境中执行任何操作前，请先在开发/测试环境中验证。

## 联系支持

如果遇到问题，请联系技术支持:

- 邮箱: support@example.com
- 文档: https://docs.example.com
- 仓库: https://github.com/your-org/ug-management

---

_本文档最后更新: 2024-09-06_