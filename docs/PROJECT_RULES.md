# UG管理系统 - 开发与运行规则

## 一、运行脚本规则

### 1. 安装与启动脚本
1. `pnpm install` - 安装依赖
2. `pnpm dev` - 启动开发环境，默认在 `http://localhost:8000`
3. `pnpm build` - 构建项目，构建文件在 `dist` 目录
4. `pnpm start` - 启动生产环境，默认在 `http://localhost:8000`

### 2. 测试与质量检查脚本
5. `pnpm test` - 运行所有测试用例
6. `pnpm lint` - 运行代码规范检查
7. `pnpm tsc` - 运行 TypeScript 类型检查
8. `pnpm format` - 运行代码格式化

### 3. 依赖管理脚本
9. `pnpm update` - 升级依赖
10. `pnpm outdated` - 检查依赖更新
11. `pnpm reinstall-deps` - 重新安装依赖
12. `pnpm clean` - 清除缓存

### 4. UMI项目修复脚本
13. `pnpm fix-umi-build` - 修复 UMI 构建问题
14. `pnpm fix-umi-dev` - 修复 UMI 开发问题
15. `pnpm fix-umi-deps` - 修复 UMI 依赖问题
16. `pnpm fix-umi-lint` - 修复 UMI 代码规范问题
17. `pnpm fix-umi-ts` - 修复 UMI TypeScript 问题
18. `pnpm fix-umi-tsc` - 修复 UMI TypeScript 类型检查问题
19. `pnpm fix-umi-format` - 修复 UMI 代码格式化问题
20. `pnpm fix-umi-test` - 修复 UMI 测试问题
21. `pnpm fix-umi-all` - 修复 UMI 所有问题

### 5. Egg.js项目修复脚本
22. `pnpm fix-egg-build` - 修复 Egg 构建问题
23. `pnpm fix-egg-dev` - 修复 Egg 开发问题
24. `pnpm fix-egg-deps` - 修复 Egg 依赖问题
25. `pnpm fix-egg-lint` - 修复 Egg 代码规范问题
26. `pnpm fix-egg-ts` - 修复 Egg TypeScript 问题
27. `pnpm fix-egg-tsc` - 修复 Egg TypeScript 类型检查问题
28. `pnpm fix-egg-format` - 修复 Egg 代码格式化问题
29. `pnpm fix-egg-test` - 修复 Egg 测试问题
30. `pnpm fix-egg-all` - 修复 Egg 所有问题

### 6. 综合检查与修复脚本
31. `pnpm fix-all` - 修复所有问题
32. `pnpm check-db-config` - 检查数据库配置
33. `pnpm check-db-connection` - 检查数据库连接
34. `pnpm check-db-schema` - 检查数据库结构
35. `pnpm check-db-data` - 检查数据库数据
36. `pnpm check-db-all` - 检查所有数据库问题
37. `pnpm check-all` - 检查所有问题

### 7. 文件操作规则
38. 修改更新文件时不用确认，直接提交即可
39. 新增文件时不用确认，直接提交即可

## 二、项目基础规则

1. **将项目的开发文档作为首要规则**，严格遵循docs目录下的各类文档指导
2. 项目采用 **UMI 4.4.12** 作为前端框架，**Egg.js** 作为后端框架
3. 使用 **pnpm 8.15.8** 作为包管理器，详见 [PNPM_MIGRATION.md](PNPM_MIGRATION.md)

## 三、UMI 4.x 开发规则

1. **严格遵循UMI 4.x官方规范**进行前端开发
2. 使用 `.umirc.ts` 作为项目配置文件，不要创建重复的配置文件
3. 路由配置统一在 `.umirc.ts` 的 `routes` 字段中管理
4. 组件开发遵循UMI推荐的文件结构和命名规范
5. 使用 `@umijs/max` 提供的所有增强功能
6. 配置 `npmClient` 为 `pnpm` 以确保依赖安装一致性

## 四、Trae CN 开发环境规则

1. **使用推荐的开发插件**，详见 `.vscode/extensions.json` 文件
2. 保持编辑器设置与项目配置一致，特别是代码格式化、ESLint和TypeScript配置
3. 使用Trae CN提供的智能开发功能提升开发效率
4. 遵循项目的编码标准和文件命名规范

## 五、依赖管理规则

1. 所有依赖安装必须使用 `pnpm` 命令
2. 共享依赖提升到根目录管理，特定依赖保留在子项目中
3. 定期运行 `pnpm outdated` 和 `pnpm update` 保持依赖更新
4. 遇到依赖问题时，使用项目提供的 `reinstall-deps.bat` 脚本

## 六、代码质量规则

1. 提交代码前必须通过以下检查：
   - `pnpm test`：运行所有测试
   - `pnpm lint`：代码规范检查
   - `pnpm tsc`：TypeScript类型检查
   - `pnpm format`：代码格式化

## 七、开发工具使用规则

1. 调试工具统一放在根目录的 `tools` 路径下
2. 调试和设置脚本统一放在根目录的 `scripts` 路径下
3. 使用项目提供的自动化脚本提高开发效率

## 八、文档管理规则

1. 所有项目文档统一放在根目录的 `docs` 路径下
2. 保持文档更新与代码同步，确保文档的准确性
3. 新增功能或修改现有功能后，及时更新相关文档