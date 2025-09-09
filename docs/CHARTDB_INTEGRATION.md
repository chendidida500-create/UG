# ChartDB数据库可视化工具集成方案

## 工具简介

ChartDB是一个免费开源的数据库图表可视化工具，可以帮助开发者和数据库管理员可视化数据库模式并生成富有洞察力的图表。它支持通过单个查询即时可视化数据库架构，支持多种流行的数据库管理系统。

## 功能特性

### 核心功能
1. **数据库模式可视化** - 通过SQL查询即时生成数据库ER图
2. **Web界面操作** - 基于Web的图形化界面，易于使用
3. **多数据库支持** - 支持MySQL、PostgreSQL、SQLite等多种数据库
4. **实时编辑** - 可视化编辑数据库结构
5. **导出功能** - 支持导出为PNG、SVG、JSON等格式

### 技术优势
1. **开源免费** - 基于MIT许可证，可自由使用和修改
2. **易于集成** - 提供Docker镜像和npm包，便于集成到现有项目中
3. **响应式设计** - 支持各种设备屏幕尺寸
4. **协作功能** - 支持团队协作和分享

## 集成方案

### 部署方式

#### 1. Docker部署（推荐）
```bash
# 拉取ChartDB镜像
docker pull chartdb/chartdb

# 运行ChartDB容器
docker run -d \
  --name chartdb \
  -p 3002:3000 \
  chartdb/chartdb
```

#### 2. 本地部署
```bash
# 克隆项目
git clone https://github.com/chartdb/chartdb.git
cd chartdb

# 安装依赖
npm install

# 启动服务
npm run dev
```

### 配置说明

#### 环境变量配置
```bash
# 数据库连接配置
DB_HOST=localhost
DB_PORT=3306
DB_NAME=ug
DB_USER=ug
DB_PASSWORD=zcn231101
DB_TYPE=mysql

# 应用配置
PORT=3002
NODE_ENV=production
```

#### Docker Compose配置
```yaml
version: '3.8'
services:
  chartdb:
    image: chartdb/chartdb
    container_name: ug-chartdb
    restart: unless-stopped
    ports:
      - '3002:3000'
    environment:
      - DB_HOST=mysql
      - DB_PORT=3306
      - DB_NAME=ug
      - DB_USER=ug
      - DB_PASSWORD=zcn231101
      - DB_TYPE=mysql
    networks:
      - ug-network
    depends_on:
      - mysql

networks:
  ug-network:
    external: true
```

## 在UG系统中的应用

### 功能规划

#### 1. 数据库设计辅助
- 通过ChartDB可视化现有数据库结构
- 辅助新功能模块的数据库设计
- 生成ER图用于文档说明

#### 2. 团队协作
- 分享数据库结构图给团队成员
- 在线协作编辑数据库设计
- 版本控制和变更追踪

#### 3. 文档生成
- 自动生成数据库结构文档
- 导出图表用于技术文档
- 与现有文档系统集成

### 集成计划

#### 第一阶段：基础集成（2024-11-15至2024-11-20）
1. 部署ChartDB服务
2. 配置数据库连接
3. 验证基本功能
4. 编写使用文档

#### 第二阶段：功能扩展（2024-11-21至2024-11-30）
1. 集成到UG管理系统
2. 添加权限控制
3. 实现导出功能
4. 优化用户界面

### 技术实现

#### 1. 服务部署
在现有的docker-compose.yml中添加ChartDB服务：
```yaml
# ChartDB数据库可视化工具
chartdb:
  image: chartdb/chartdb
  container_name: ug-chartdb
  restart: unless-stopped
  ports:
    - '3002:3000'
  environment:
    - DB_HOST=mysql
    - DB_PORT=3306
    - DB_NAME=ug
    - DB_USER=ug
    - DB_PASSWORD=zcn231101
    - DB_TYPE=mysql
  networks:
    - ug-network
  depends_on:
    - mysql
```

#### 2. 前端集成
在UG管理系统的菜单中添加ChartDB入口：
```javascript
// 权限配置
{
  name: '数据库工具',
  code: 'system:database',
  type: 'menu',
  path: '/system/database',
  icon: 'DatabaseOutlined',
  children: [
    {
      name: '结构可视化',
      code: 'system:database:chartdb',
      type: 'menu',
      path: '/system/database/chartdb',
      component: '@/pages/System/Database/ChartDB'
    }
  ]
}
```

#### 3. 权限控制
为ChartDB功能添加相应的权限控制：
- 管理员可访问完整功能
- 开发者可查看和导出
- 普通用户无访问权限

## 使用指南

### 基本操作

1. **访问系统**
   - URL: http://localhost:3002
   - 使用数据库连接信息登录

2. **导入数据库结构**
   - 选择数据库类型
   - 输入连接信息
   - 点击"导入"按钮

3. **编辑图表**
   - 拖拽表结构调整位置
   - 双击表名编辑表信息
   - 右键表名添加新表

4. **导出图表**
   - 点击"导出"按钮
   - 选择导出格式（PNG/SVG/JSON）
   - 保存到本地

### 最佳实践

1. **定期更新**
   - 数据库结构变更后及时更新图表
   - 保持图表与实际结构一致

2. **团队协作**
   - 使用共享链接进行团队讨论
   - 导出图表作为文档附件

3. **文档整合**
   - 将生成的图表整合到技术文档中
   - 使用导出的JSON文件进行版本控制

## 维护和监控

### 日常维护
1. 定期备份ChartDB配置
2. 监控服务运行状态
3. 更新到最新稳定版本

### 故障处理
1. **连接失败**
   - 检查数据库连接信息
   - 确认网络连通性
   - 验证数据库用户权限

2. **性能问题**
   - 检查服务器资源使用情况
   - 优化数据库查询
   - 调整Docker资源配置

## 扩展功能

### 未来规划
1. **自定义模板** - 支持自定义图表样式模板
2. **API集成** - 提供REST API接口
3. **插件系统** - 支持第三方插件扩展
4. **多语言支持** - 支持中文等多语言界面

### 与其他工具集成
1. **与UG系统深度集成** - 在系统内直接访问ChartDB功能
2. **CI/CD集成** - 在部署流程中自动生成数据库图表
3. **文档系统集成** - 自动生成技术文档中的数据库部分

## 参考资源

- 官方网站: https://chartdb.io/
- GitHub仓库: https://github.com/chartdb/chartdb
- 文档地址: https://docs.chartdb.io/
- Docker镜像: https://hub.docker.com/r/chartdb/chartdb

---

_文档最后更新时间：2025-09-08_