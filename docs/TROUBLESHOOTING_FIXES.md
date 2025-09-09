# UG管理系统 - 常见问题解决方案

本文档提供了项目中遇到的常见问题的解决方案，包括MySQL连接、VS Code命令和Git推送等问题。

## 问题一：mysql.addConnection 命令未找到

### 问题描述
运行命令 `mysql.addConnection` 时出现错误：`command 'mysql.addConnection' not found`。这是由于缺少正确的MySQL连接配置或相关扩展未正确安装导致的。

### 解决方案

1. **确保安装了推荐的数据库插件**：
   - 确保在VS Code中安装了 `mtxr.sqltools` 和 `mtxr.sqltools-driver-mysql` 插件
   - 这些插件已在 `.vscode/extensions.json` 文件中列为推荐插件

2. **配置正确的数据库连接**：
   - 项目已创建专用的SQLTools连接配置文件：`.vscode/sqltools.connections.json`
   - 配置使用了 `docker-compose.yml` 中定义的数据库连接信息：
     - 数据库名：`ug_management`
     - 用户名：`ug_user` / `root`
     - 密码：`ug_password` / `root123456`
     - 主机：`localhost`
     - 端口：`3306`

3. **使用SQLTools管理连接**：
   - 使用快捷键 `Ctrl+Shift+C` 可以快速打开SQLTools连接管理器
   - 在VS Code中，可以通过命令面板 (`Ctrl+Shift+P`) 搜索 "SQLTools: Connections" 来管理连接

## 问题二：workbench.action.openWalkthrough 命令未找到

### 问题描述
运行命令 `workbench.action.openWalkthrough` 时出现错误：`command 'workbench.action.openWalkthrough' not found`。

### 解决方案

1. **命令重定向**：
   - 项目已在 `.vscode/keybindings.json` 中添加了命令重定向
   - 将 `workbench.action.openWalkthrough` 命令重定向到 `workbench.action.openHelp`
   - 使用快捷键 `Ctrl+Shift+H` 可以访问帮助文档

2. **替代方案**：
   - 可以使用VS Code的内置帮助菜单 (`Help > Welcome`) 来访问欢迎页面和指南
   - 或通过命令面板 (`Ctrl+Shift+P`) 搜索 "Welcome" 来访问欢迎页面

## 问题三：无法将分支 'main' 推送到 origin

### 问题描述
尝试推送到远程仓库时出现错误：`Unable to push branch 'main' to origin`。

### 解决方案

1. **修复Git配置**：
   - 已修复 `.git/config` 文件中重复的 `vscode-merge-base` 配置项
   - 确保远程仓库配置正确，URL为：`https://github.com/chendidida500-create/UG.git`

2. **推送前的准备步骤**：
   - 确保已添加所有更改：`git add .`
   - 提交更改：`git commit -m "Your commit message"`
   - 拉取最新代码：`git pull origin main --rebase`
   - 推送到远程仓库：`git push origin main`

3. **Git凭证问题**：
   - 如果出现凭证问题，请确保已在VS Code中登录GitHub账号
   - 或使用Git命令行输入用户名和密码/令牌

4. **使用VS Code Git工具**：
   - 使用快捷键 `Ctrl+Shift+G` 可以快速刷新Git状态
   - 使用VS Code的源代码管理面板可以方便地管理和推送更改

## 额外建议

1. **使用项目提供的脚本**：
   - 项目的 `scripts` 目录中提供了各种自动化脚本，可以帮助解决常见问题
   - 特别是 `reinstall-deps.bat`、`fix-umi-build.bat` 和 `check-db-config.js` 等脚本

2. **定期更新依赖**：
   - 定期运行 `pnpm outdated` 和 `pnpm update` 以保持依赖更新
   - 运行 `pnpm lint` 和 `pnpm tsc` 检查代码质量和类型错误

3. **使用Docker运行服务**：
   - 项目提供了完整的Docker配置，可以使用 `docker-compose up -d` 一键启动所有服务
   - 确保Docker Desktop已正确安装并运行

4. **保持配置一致性**：
   - 不要随意修改项目的核心配置文件
   - 如有特殊需求，请在团队内讨论并记录变更

---

本文档最后更新: 2025-09-09