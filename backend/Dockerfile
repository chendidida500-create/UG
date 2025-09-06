# 后端 Dockerfile
FROM node:20.14.0-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json (如果存在)
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production && npm cache clean --force

# 复制应用代码
COPY . .

# 创建非root用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S eggjs -u 1001

# 更改文件所有权
RUN chown -R eggjs:nodejs /app
USER eggjs

# 暴露端口
EXPOSE 7001

# 健康检查
HEALTHCHECK --interval=30s --timeout=10s --start-period=5s --retries=3 \
  CMD curl -f http://localhost:7001/api/health || exit 1

# 启动应用
CMD ["npm", "run", "start"]