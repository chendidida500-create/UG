# WrenAI数据分析工具集成方案

## 工具简介

WrenAI是一个开源的生成式商业智能（GenBI）平台，允许用户通过自然语言与数据交互，生成SQL查询、构建图表和创建洞察。它简化了数据分析流程，使非技术用户也能轻松查询数据库并获得有价值的业务洞察。

## 功能特性

### 核心功能
1. **自然语言查询** - 用户可以通过自然语言提问来查询数据库
2. **SQL自动生成** - 基于自然语言输入自动生成准确的SQL查询语句
3. **数据可视化** - 自动生成图表和可视化报告
4. **语义层支持** - 通过建模定义语言（MDL）编码关系、计算和模式逻辑
5. **多数据库支持** - 支持多种流行数据库和数据仓库

### 技术优势
1. **开源免费** - 基于开源许可证，可自由使用和修改
2. **易于集成** - 提供API接口，便于集成到现有系统中
3. **持续学习** - 通过反馈循环不断优化查询结果
4. **安全性** - 支持本地部署，确保数据安全

## 集成方案

### 部署方式

#### 1. Docker部署（推荐）
```bash
# 拉取WrenAI镜像
docker pull canner/wrenai

# 运行WrenAI容器
docker run -d \
  --name wrenai \
  -p 3003:3000 \
  -e OPENAI_API_KEY=your_openai_api_key \
  canner/wrenai
```

#### 2. 本地部署
```bash
# 克隆项目
git clone https://github.com/Canner/WrenAI.git
cd WrenAI

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

# LLM API配置
OPENAI_API_KEY=your_openai_api_key
LLM_PROVIDER=openai

# 应用配置
PORT=3003
NODE_ENV=production
```

#### Docker Compose配置
```yaml
version: '3.8'
services:
  wrenai:
    image: canner/wrenai
    container_name: ug-wrenai
    restart: unless-stopped
    ports:
      - '3003:3000'
    environment:
      - DB_HOST=mysql
      - DB_PORT=3306
      - DB_NAME=ug_management
      - DB_USER=ug_user
      - DB_PASSWORD=ug_password
      - DB_TYPE=mysql
      - OPENAI_API_KEY=your_openai_api_key
      - LLM_PROVIDER=openai
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

#### 1. 智能数据查询
- 通过自然语言查询系统数据
- 自动生成SQL语句执行查询
- 支持复杂业务逻辑查询

#### 2. 数据可视化
- 自动生成图表和报表
- 支持多种图表类型（柱状图、折线图、饼图等）
- 可导出可视化结果

#### 3. 业务洞察
- 自动生成数据洞察报告
- 提供业务趋势分析
- 支持异常数据检测

### 集成计划

#### 第一阶段：基础集成（2024-12-01至2024-12-10）
1. 部署WrenAI服务
2. 配置数据库连接
3. 验证基本功能
4. 编写使用文档

#### 第二阶段：功能扩展（2024-12-11至2024-12-20）
1. 集成到UG管理系统
2. 添加权限控制
3. 实现数据可视化功能
4. 优化用户界面

### 技术实现

#### 1. 服务部署
在现有的docker-compose.yml中添加WrenAI服务：
```yaml
# WrenAI数据分析工具
wrenai:
  image: canner/wrenai
  container_name: ug-wrenai
  restart: unless-stopped
  ports:
    - '3003:3000'
  environment:
    - DB_HOST=mysql
    - DB_PORT=3306
    - DB_NAME=ug_management
    - DB_USER=ug_user
    - DB_PASSWORD=ug_password
    - DB_TYPE=mysql
    - OPENAI_API_KEY=your_openai_api_key
    - LLM_PROVIDER=openai
  networks:
    - ug-network
  depends_on:
    - mysql
```

#### 2. 前端集成
在UG管理系统的菜单中添加WrenAI入口：
```javascript
// 权限配置
{
  name: '数据分析',
  code: 'system:analytics',
  type: 'menu',
  path: '/system/analytics',
  icon: 'BarChartOutlined',
  children: [
    {
      name: '智能查询',
      code: 'system:analytics:wrenai',
      type: 'menu',
      path: '/system/analytics/wrenai',
      component: '@/pages/System/Analytics/WrenAI'
    }
  ]
}
```

#### 3. 权限控制
为WrenAI功能添加相应的权限控制：
- 管理员可访问完整功能
- 数据分析师可使用查询和可视化功能
- 普通用户仅可查看部分预设报表

## 使用指南

### 基本操作

1. **访问系统**
   - URL: http://localhost:3003
   - 使用数据库连接信息登录

2. **自然语言查询**
   - 在查询框中输入自然语言问题
   - 例如："显示最近一个月的用户注册数量"
   - 系统将自动生成SQL并执行查询

3. **查看结果**
   - 查看生成的查询结果
   - 系统自动创建可视化图表
   - 可导出结果为CSV或图片格式

4. **创建报表**
   - 保存常用查询为报表
   - 设置报表刷新频率
   - 分享报表给其他用户

### 最佳实践

1. **查询优化**
   - 使用明确的业务术语提问
   - 指定时间范围以提高查询效率
   - 避免过于复杂的查询需求

2. **数据安全**
   - 限制敏感数据的访问权限
   - 定期审查查询日志
   - 使用只读数据库连接进行查询

3. **团队协作**
   - 创建共享查询模板
   - 建立常见问题知识库
   - 定期培训团队成员使用

## 维护和监控

### 日常维护
1. 定期备份WrenAI配置
2. 监控服务运行状态
3. 更新到最新稳定版本

### 故障处理
1. **连接失败**
   - 检查数据库连接信息
   - 确认网络连通性
   - 验证数据库用户权限

2. **查询性能问题**
   - 检查生成的SQL语句
   - 优化数据库索引
   - 调整查询超时设置

## 扩展功能

### 未来规划
1. **自定义模型** - 支持训练自定义语言模型
2. **多语言支持** - 支持中文等多语言查询
3. **插件系统** - 支持第三方插件扩展
4. **移动端支持** - 提供移动端访问界面

### 与其他工具集成
1. **与UG系统深度集成** - 在系统内直接访问WrenAI功能
2. **BI工具集成** - 与Tableau、PowerBI等工具集成
3. **报表系统集成** - 自动生成定期报表并发送邮件

## 参考资源

- 官方网站: https://getwren.ai/
- GitHub仓库: https://github.com/Canner/WrenAI
- 文档地址: https://docs.getwren.ai/
- Docker镜像: https://hub.docker.com/r/canner/wrenai

---

_文档最后更新时间：2025-09-08_