# 开发指南

## 目录结构

```
UG/
├── backend/              # 后端服务
│   ├── app/              # 应用代码
│   ├── config/           # 配置文件
│   ├── database/         # 数据库迁移和种子数据
│   └── test/             # 测试文件
├── frontend/             # 前端应用
│   ├── src/              # 源代码
│   ├── layouts/          # 布局组件
│   ├── pages/            # 页面组件
│   ├── components/       # 通用组件
│   ├── models/           # 状态管理
│   ├── services/         # API服务
│   └── utils/            # 工具函数
├── docs/                 # 文档
├── scripts/              # 脚本文件
├── tools/                # 工具集
└── run/                  # 运行时文件
```

## 环境要求

- Node.js 20.19.0 (已在 package.json 中指定)
- pnpm 8.x (推荐使用 8.15.8，已在 package.json 中指定)

## 包管理器

本项目统一使用 Umi 官方推荐的 pnpm 包管理器，版本为 8.15.8。

详细信息请参考 [PNPM 迁移指南](PNPM_MIGRATION.md)。

### 依赖管理策略

为了更好地统一依赖管理，项目采用以下策略：

1. **根目录统一管理共享依赖**：
   - 将前后端共同使用的依赖包（如 `@types/node`、`typescript` 等）提升到根目录 [package.json](file:///e:/YSY/UG/package.json)
   - 利用 pnpm workspace 的依赖提升机制，减少重复安装

2. **子项目管理特定依赖**：
   - 前端特定依赖保留在 [frontend/package.json](file:///e:/YSY/UG/frontend/package.json)
   - 后端特定依赖保留在 [backend/package.json](file:///e:/YSY/UG/backend/package.json)

3. **版本一致性**：
   - 通过根目录 [package.json](file:///e:/YSY/UG/package.json) 的 `overrides` 和 `resolutions` 字段确保依赖版本一致性

### 安装依赖

```bash
# 在项目根目录安装所有依赖（推荐）
pnpm install

# 或者分别安装前后端依赖
pnpm setup
```

### 添加新依赖

```bash
# 添加项目共享依赖到根目录
pnpm add -w <package-name>

# 添加开发依赖到根目录
pnpm add -wD <package-name>

# 添加前端依赖
pnpm add --filter frontend <package-name>

# 添加后端依赖
pnpm add --filter backend <package-name>

# 添加开发依赖
pnpm add -D --filter <project> <package-name>
```

## 依赖管理

#### 清理和重新安装依赖

如果遇到依赖问题，可以使用以下方法清理并重新安装依赖：

##### 自动化脚本方式（推荐）

项目根目录提供了 [reinstall-deps.bat](file:///e:/YSY/UG/reinstall-deps.bat) 脚本，可以自动清理并重新安装所有依赖：

```bash
# 运行清理和重新安装脚本
./reinstall-deps.bat
```

项目还提供了专门的清理脚本和 Umi 构建工具修复脚本：

```bash
# 清理所有依赖文件
./scripts/clean-deps.bat

# 修复 Umi 构建工具问题
./scripts/fix-umi-build.bat

# 诊断依赖问题
./scripts/diagnose-dependencies.bat
```

#### 手动方式

如果需要手动清理依赖，可以按照以下步骤操作：

```bash
# 1. 清理根目录依赖
rm -rf node_modules pnpm-lock.yaml

# 2. 清理前端依赖
cd frontend
rm -rf node_modules pnpm-lock.yaml
cd ..

# 3. 清理后端依赖
cd backend
rm -rf node_modules pnpm-lock.yaml
cd ..

# 4. 重新安装所有依赖
pnpm install
```

### 依赖更新

项目定期更新依赖以获取最新功能和安全修复。最近一次更新已将以下依赖升级到最新版本：

- 根目录依赖：
  - `@types/node`: 24.3.1
  - `typescript`: 5.9.2
  - `concurrently`: 9.2.1
  - `rimraf`: 6.0.1

- 前端依赖：
  - `@ant-design/icons`: 6.0.1
  - `react`: 18.3.1
  - `react-dom`: 18.3.1
  - `@types/react`: 18.3.24
  - `@types/react-dom`: 18.3.1
  - `@typescript-eslint/eslint-plugin`: 8.42.0
  - `@typescript-eslint/parser`: 8.42.0
  - `eslint`: 9.35.0
  - `eslint-config-prettier`: 10.1.8
  - `eslint-plugin-react-hooks`: 5.2.0

- 后端依赖：
  - `bcryptjs`: 3.0.2
  - `egg-bin`: 6.13.0
  - `egg-cors`: 3.0.1
  - `egg-scripts`: 3.1.0
  - `eslint-config-egg`: 14.1.0
  - `uuid`: 12.0.0

定期检查和更新项目依赖：

```bash
# 检查过时的依赖
pnpm outdated

# 更新依赖到最新版本
pnpm update
```

### 依赖问题排查

如果遇到依赖相关问题，可以尝试以下解决方案：

1. 清理 pnpm 缓存：

   ```bash
   pnpm store prune
   ```

2. 强制重新安装依赖：

   ```bash
   pnpm install --force
   ```

3. 检查依赖树：
   ```bash
   pnpm list
   ```

## 开发流程

### 启动开发服务器

```bash
# 同时启动前后端开发服务器
pnpm dev

# 只启动后端开发服务器
pnpm dev:backend

# 只启动前端开发服务器
pnpm dev:frontend
```

### 构建项目

```bash
# 构建前端项目
pnpm build

# 构建前端项目（完整命令）
pnpm build:frontend
```

### 运行测试

```bash
# 运行所有测试
pnpm test

# 只运行后端测试
pnpm test:backend

# 只运行前端测试
pnpm test:frontend
```

### 代码检查

```bash
# 运行所有代码检查
pnpm lint

# 只运行后端代码检查
pnpm lint:backend

# 只运行前端代码检查
pnpm lint:frontend
```

## 数据库操作

```bash
# 运行数据库迁移
pnpm db:migrate

# 运行数据库种子数据
pnpm db:seed
```

## 清理操作

```bash
# 清理所有 node_modules
pnpm clean

# 只清理后端 node_modules
pnpm clean:backend

# 只清理前端 node_modules
pnpm clean:frontend
```

## 项目配置

### 环境变量

项目使用 `.env` 文件管理环境变量。可以创建以下文件：

- `.env`: 默认环境变量
- `.env.local`: 本地环境变量（不会被提交到版本控制）
- `.env.development`: 开发环境变量
- `.env.production`: 生产环境变量

### 配置文件

- 后端配置: [backend/config/config.default.js](file:///e:/YSY/UG/backend/config/config.default.js)
- 前端配置: [frontend/.umirc.ts](file:///e:/YSY/UG/frontend/.umirc.ts)
- 数据库配置: [backend/database/config.js](file:///e:/YSY/UG/backend/database/config.js)

## 数据库配置统一

为了确保开发、测试和生产环境的一致性，项目已统一数据库配置：

- 所有环境的数据库名统一为：`ug`
- 所有环境的用户名统一为：`ug`
- 密码：`zcn231101`
- 主机：`localhost`
- 端口：`3306`
- 类型：MySQL

生产环境支持通过环境变量覆盖配置：

- `DB_USERNAME` - 数据库用户名
- `DB_PASSWORD` - 数据库密码
- `DB_DATABASE` - 数据库名
- `DB_HOST` - 数据库主机
- `DB_PORT` - 数据库端口

详细信息请参考 [DATABASE.md](DATABASE.md)。

## 代码规范

项目使用 ESLint 和 Prettier 进行代码规范检查和格式化。

### 运行代码检查

```bash
# 检查代码规范
pnpm lint

# 自动修复代码规范问题
pnpm lint:fix

# 格式化代码
pnpm format
```

### TypeScript 类型检查

```bash
# 运行 TypeScript 类型检查
pnpm tsc
```

## 自动化功能

项目实现了全面的自动化功能，提高开发效率：

### 编辑器自动化

项目配置了 VS Code 编辑器自动保存功能：

- 焦点离开编辑器时自动保存文件
- 保存时自动格式化代码
- 保存时自动执行 ESLint 修复和导入组织

### 任务自动化

通过 VS Code 任务系统，可以快速执行：

- 自动格式化和检查 ([scripts/auto-format-and-lint.bat](file:///e:/YSY/UG/scripts/auto-format-and-lint.bat))
- 自动类型检查 ([scripts/auto-type-check.bat](file:///e:/YSY/UG/scripts/auto-type-check.bat))
- 自动构建项目 ([scripts/auto-build.bat](file:///e:/YSY/UG/scripts/auto-build.bat))
- 启动开发服务器 ([scripts/auto-dev-server.bat](file:///e:/YSY/UG/scripts/auto-dev-server.bat))

详细信息请参考 [AUTOMATION.md](AUTOMATION.md)。

### 脚本自动化

项目提供了多个自动化脚本：

- [install-deps.bat](file:///e:/YSY/UG/install-deps.bat) - 安装依赖
- [reinstall-deps.bat](file:///e:/YSY/UG/reinstall-deps.bat) - 重新安装依赖
- [start.bat](file:///e:/YSY/UG/start.bat) - 启动生产环境
- [start-dev.bat](file:///e:/YSY/UG/start-dev.bat) - 启动开发环境

## 诊断和调试

为了更快速地发现问题和解决问题，项目提供了丰富的诊断和调试工具：

### 快速诊断工具

使用 [scripts/quick-diagnosis.bat](file:///e:/YSY/UG/scripts/quick-diagnosis.bat) 可以一键运行多项检查：

- 环境变量验证
- 依赖过时检查
- TypeScript类型检查
- 代码规范检查
- 数据库连接测试

### 性能分析工具

使用 [scripts/analyze-bundle.bat](file:///e:/YSY/UG/scripts/analyze-bundle.bat) 可以分析前端构建包的大小和组成。

### 安全检查工具

使用 [scripts/security-scan.bat](file:///e:/YSY/UG/scripts/security-scan.bat) 可以扫描项目依赖的安全漏洞。

### 中间件调试

使用 [scripts/debug-middleware.bat](file:///e:/YSY/UG/scripts/debug-middleware.bat) 可以调试 Egg.js 中间件的执行过程。

详细信息请参考 [AUTOMATION.md](AUTOMATION.md)。

## UMI构建工具问题解决

项目在使用UMI构建工具时可能会遇到一些问题，我们提供了以下解决方案：

### 常见问题及解决方案

1. **UMI命令无法运行**：
   - 确保依赖已正确安装：`pnpm install`
   - 检查前端package.json中是否包含正确的依赖项
   - 运行配置检查脚本：`./scripts/check-umi-config.bat`
   - 运行配置修复脚本：`./scripts/fix-umi-config.bat`

2. **依赖冲突问题**：
   - 确保package.json中不同时包含`@umijs/max`和`umi`依赖
   - 移除重复的`@umijs/plugins`依赖
   - 使用`resolutions`和`overrides`字段统一依赖版本

3. **构建工具配置问题**：
   - 检查`.umirc.ts`文件中的配置是否正确
   - 确保`npmClient`设置为`pnpm`
   - 配置MFSU以提升编译速度

### 诊断和修复脚本

项目提供了专门的脚本来诊断和修复UMI构建工具问题：

- [scripts/check-umi-config.js](file:///e:/YSY/UG/scripts/check-umi-config.js) - 检查UMI配置
- [scripts/fix-umi-config.js](file:///e:/YSY/UG/scripts/fix-umi-config.js) - 修复UMI配置
- [scripts/verify-all-fixes.bat](file:///e:/YSY/UG/scripts/verify-all-fixes.bat) - 验证所有修复

### 手动修复步骤

如果自动化脚本无法解决问题，可以尝试以下手动步骤：

1. 清理所有依赖：
   ```bash
   # 清理根目录依赖
   rm -rf node_modules pnpm-lock.yaml
   
   # 清理前端依赖
   cd frontend
   rm -rf node_modules pnpm-lock.yaml
   cd ..
   
   # 清理后端依赖
   cd backend
   rm -rf node_modules pnpm-lock.yaml
   cd ..
   ```

2. 重新安装依赖：
   ```bash
   pnpm install --force
   ```

3. 验证UMI是否正常工作：
   ```bash
   cd frontend
   npx @umijs/max -v
   ```

4. 如果仍然有问题，检查前端package.json文件：
   - 确保包含`react`和`react-dom`依赖
   - 确保不包含重复的UMI相关依赖
   - 确保`@umijs/max`版本正确

## 提交代码

在提交代码之前，请确保：

1. 通过所有测试：`pnpm test`
2. 通过代码检查：`pnpm lint`
3. 通过类型检查：`pnpm tsc`
4. 代码格式化：`pnpm format`

## 常见问题

### 1. 依赖安装问题

如果遇到依赖安装问题，可以尝试：

```bash
# 清理缓存并重新安装
pnpm store prune
pnpm clean
pnpm install
```

### 2. 端口冲突

如果遇到端口冲突，可以修改以下配置文件：

- 前端端口: [frontend/.umirc.ts](file:///e:/YSY/UG/frontend/.umirc.ts) 中的 `devServer.port`
- 后端端口: [backend/config/config.default.js](file:///e:/YSY/UG/backend/config/config.default.js) 中的 `cluster.listen.port`

### 3. 数据库连接问题

确保数据库服务正在运行，并且配置文件中的数据库连接信息正确。

### 4. Umi 构建工具问题

如果遇到 Umi 构建工具无法正常运行的问题，通常是由于依赖安装过程中的一些问题导致的。可以使用以下方法解决：

```cmd
# 运行修复脚本
./scripts/fix-umi-build.bat
```

或者手动执行以下步骤：

1. 删除所有 `node_modules` 文件夹和 `pnpm-lock.yaml` 文件
2. 运行 `pnpm install` 安装根目录依赖
3. 进入 `frontend` 目录，运行 `pnpm install`
4. 进入 `backend` 目录，运行 `pnpm install`
5. 在 `frontend` 目录下运行 `pnpm run setup`

### 5. 构建工具配置问题

如果遇到构建工具配置问题，可以使用以下脚本进行检查和修复：

```cmd
# 检查构建工具配置
./scripts/check-umi-config.bat

# 修复构建工具配置
./scripts/fix-umi-config.bat
```

## 文件编码标准

项目中所有文件必须使用 UTF-8 编码。详细信息请参考 [ENCODING_STANDARD.md](ENCODING_STANDARD.md)。

## 贡献指南

1. Fork 项目
2. 创建功能分支
3. 提交更改
4. 推送到分支
5. 创建 Pull Request