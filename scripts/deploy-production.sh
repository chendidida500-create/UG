# 生产环境部署脚本
#!/bin/bash

echo "=== UG管理系统 - 生产环境部署脚本 ==="
echo ""

# 设置变量
PROJECT_DIR="/opt/ug-management"
BACKUP_DIR="/opt/backups/ug-management"
LOG_FILE="/var/log/ug-deployment.log"
DOCKER_COMPOSE_FILE="docker-compose.prod.yml"

# 日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $1" | tee -a $LOG_FILE
}

# 错误处理
error_exit() {
    log "ERROR: $1"
    exit 1
}

# 检查权限
check_permissions() {
    if [ "$EUID" -ne 0 ]; then
        error_exit "请使用root权限运行此脚本"
    fi
}

# 检查系统要求
check_requirements() {
    log "检查系统要求..."
    
    # 检查Docker
    if ! command -v docker &> /dev/null; then
        error_exit "Docker未安装，请先安装Docker"
    fi
    
    # 检查Docker Compose
    if ! command -v docker-compose &> /dev/null; then
        error_exit "Docker Compose未安装，请先安装Docker Compose"
    fi
    
    # 检查磁盘空间 (至少需要5GB)
    available_space=$(df / | awk 'NR==2 {print $4}')
    required_space=5242880  # 5GB in KB
    
    if [ $available_space -lt $required_space ]; then
        error_exit "磁盘空间不足，至少需要5GB可用空间"
    fi
    
    log "系统要求检查通过"
}

# 创建目录结构
create_directories() {
    log "创建目录结构..."
    
    mkdir -p $PROJECT_DIR
    mkdir -p $BACKUP_DIR
    mkdir -p /var/log/ug-management
    mkdir -p /opt/ug-management/ssl
    mkdir -p /opt/ug-management/uploads
    mkdir -p /opt/ug-management/backups
    
    log "目录结构创建完成"
}

# 配置防火墙
configure_firewall() {
    log "配置防火墙..."
    
    # 开放必要端口
    ufw allow 22/tcp    # SSH
    ufw allow 80/tcp    # HTTP
    ufw allow 443/tcp   # HTTPS
    ufw allow 3000/tcp  # Grafana (可选)
    ufw allow 9090/tcp  # Prometheus (可选)
    
    # 启用防火墙
    ufw --force enable
    
    log "防火墙配置完成"
}

# 生成SSL证书 (自签名，生产环境建议使用Let's Encrypt)
generate_ssl_cert() {
    log "生成SSL证书..."
    
    SSL_DIR="/opt/ug-management/ssl"
    
    # 生成私钥
    openssl genrsa -out $SSL_DIR/key.pem 2048
    
    # 生成证书
    openssl req -new -x509 -key $SSL_DIR/key.pem -out $SSL_DIR/cert.pem -days 365 -subj "/C=CN/ST=Beijing/L=Beijing/O=UG Management/CN=localhost"
    
    # 设置权限
    chmod 600 $SSL_DIR/key.pem
    chmod 644 $SSL_DIR/cert.pem
    
    log "SSL证书生成完成"
}

# 部署应用
deploy_application() {
    log "部署应用..."
    
    cd $PROJECT_DIR
    
    # 停止现有服务
    if [ -f $DOCKER_COMPOSE_FILE ]; then
        docker-compose -f $DOCKER_COMPOSE_FILE down
    fi
    
    # 拉取最新镜像
    docker-compose -f $DOCKER_COMPOSE_FILE pull
    
    # 启动服务
    docker-compose -f $DOCKER_COMPOSE_FILE up -d
    
    log "应用部署完成"
}

# 数据库初始化
init_database() {
    log "初始化数据库..."
    
    # 等待数据库启动
    sleep 30
    
    # 执行数据库迁移
    docker-compose -f $DOCKER_COMPOSE_FILE exec backend npm run db:migrate
    
    # 执行种子数据
    docker-compose -f $DOCKER_COMPOSE_FILE exec backend npm run db:seed
    
    log "数据库初始化完成"
}

# 配置定时备份
setup_backup() {
    log "配置定时备份..."
    
    # 创建备份脚本
    cat > /opt/ug-management/backup.sh << 'EOF'
#!/bin/bash
BACKUP_DIR="/opt/backups/ug-management"
DATE=$(date +%Y%m%d_%H%M%S)

# 数据库备份
docker exec ug-mysql mysqldump -u root -proot123456 ug_management > $BACKUP_DIR/db_$DATE.sql

# 文件备份
tar -czf $BACKUP_DIR/uploads_$DATE.tar.gz /opt/ug-management/uploads

# 删除7天前的备份
find $BACKUP_DIR -name "*.sql" -mtime +7 -delete
find $BACKUP_DIR -name "*.tar.gz" -mtime +7 -delete

echo "备份完成: $DATE"
EOF

    chmod +x /opt/ug-management/backup.sh
    
    # 添加到crontab (每天凌晨2点备份)
    (crontab -l 2>/dev/null; echo "0 2 * * * /opt/ug-management/backup.sh >> /var/log/ug-backup.log 2>&1") | crontab -
    
    log "定时备份配置完成"
}

# 配置日志轮转
setup_log_rotation() {
    log "配置日志轮转..."
    
    cat > /etc/logrotate.d/ug-management << 'EOF'
/var/log/ug-management/*.log {
    daily
    missingok
    rotate 30
    compress
    delaycompress
    notifempty
    create 644 root root
    postrotate
        docker-compose -f /opt/ug-management/docker-compose.prod.yml restart backend
    endscript
}
EOF
    
    log "日志轮转配置完成"
}

# 健康检查
health_check() {
    log "执行健康检查..."
    
    # 等待服务启动
    sleep 60
    
    # 检查后端健康状态
    if curl -f http://localhost:15001/api/health > /dev/null 2>&1; then
        log "后端服务健康检查通过"
    else
        error_exit "后端服务健康检查失败"
    fi
    
    # 检查前端服务
    if curl -f http://localhost > /dev/null 2>&1; then
        log "前端服务健康检查通过"
    else
        error_exit "前端服务健康检查失败"
    fi
    
    log "所有服务健康检查通过"
}

# 显示部署信息
show_deployment_info() {
    log "部署完成！"
    echo ""
    echo "=== 部署信息 ==="
    echo "项目目录: $PROJECT_DIR"
    echo "备份目录: $BACKUP_DIR"
    echo "日志文件: $LOG_FILE"
    echo ""
    echo "=== 访问地址 ==="
    echo "前端: https://localhost"
    echo "后端API: https://localhost/api"
    echo "Grafana监控: http://localhost:3000 (admin/admin123456)"
    echo "Prometheus: http://localhost:9090"
    echo ""
    echo "=== 默认账号 ==="
    echo "管理员: admin / 123456"
    echo "普通用户: user / 123456"
    echo ""
    echo "=== 管理命令 ==="
    echo "查看服务状态: docker-compose -f $PROJECT_DIR/$DOCKER_COMPOSE_FILE ps"
    echo "查看日志: docker-compose -f $PROJECT_DIR/$DOCKER_COMPOSE_FILE logs -f"
    echo "重启服务: docker-compose -f $PROJECT_DIR/$DOCKER_COMPOSE_FILE restart"
    echo "停止服务: docker-compose -f $PROJECT_DIR/$DOCKER_COMPOSE_FILE down"
    echo "备份数据: /opt/ug-management/backup.sh"
}

# 主函数
main() {
    log "开始生产环境部署..."
    
    check_permissions
    check_requirements
    create_directories
    configure_firewall
    generate_ssl_cert
    deploy_application
    init_database
    setup_backup
    setup_log_rotation
    health_check
    show_deployment_info
    
    log "生产环境部署完成！"
}

# 执行主函数
main "$@"