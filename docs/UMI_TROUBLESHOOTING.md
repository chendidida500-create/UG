# UMI构建工具问题排查与解决指南

本文档详细说明了在使用UG管理系统项目中的UMI构建工具时可能遇到的常见问题及其解决方案。

## 目录

1. [常见问题](#常见问题)
2. [诊断工具](#诊断工具)
3. [修复工具](#修复工具)
4. [手动解决步骤](#手动解决步骤)
5. [依赖管理](#依赖管理)
6. [配置检查](#配置检查)

## 常见问题

### 1. UMI命令无法运行

**问题描述**：
运行 `npx @umijs/max -v` 或其他UMI命令时出现错误，如：
```
Error: Cannot find module 'react-dom/package.json' from 'e:\YSY\UG\frontend'
```

**可能原因**：
1. 依赖未正确安装
2. react-dom依赖缺失
3. 依赖冲突问题
4. 缓存问题

**解决方案**：
1. 确保依赖已正确安装：`pnpm install`
2. 检查前端package.json中是否包含react和react-dom依赖
3. 清理缓存并重新安装：`pnpm install --force`
4. 运行配置检查脚本：`./scripts/check-umi-config.bat`

### 2. 依赖冲突问题

**问题描述**：
项目中同时存在`@umijs/max`和`umi`依赖，或者存在重复的`@umijs/plugins`依赖。

**可能原因**：
1. package.json中同时声明了`@umijs/max`和`umi`依赖
2. 重复添加了`@umijs/plugins`依赖

**解决方案**：
1. 确保package.json中只包含`@umijs/max`依赖，移除`umi`依赖
2. 移除重复的`@umijs/plugins`依赖
3. 使用`resolutions`和`overrides`字段统一依赖版本

### 3. 构建工具配置问题

**问题描述**：
UMI构建工具配置不正确，导致无法正常启动开发服务器或构建项目。

**可能原因**：
1. .umirc.ts文件中的配置错误
2. npmClient未设置为pnpm
3. MFSU配置问题

**解决方案**：
1. 检查`.umirc.ts`文件中的配置是否正确
2. 确保`npmClient`设置为`pnpm`
3. 正确配置MFSU以提升编译速度

## 诊断工具

项目提供了专门的诊断工具来帮助识别UMI构建工具问题：

### 1. 配置检查脚本

```cmd
./scripts/check-umi-config.bat
```

该脚本会检查以下内容：
- .umirc.ts配置文件
- package.json配置
- TypeScript配置
- ESLint配置
- Prettier配置

### 2. 验证脚本

```cmd
./scripts/verify-all-fixes.bat
```

该脚本会验证以下修复是否正确应用：
- 拼写问题修复
- MFSU配置
- 依赖配置
- 文件结构

## 修复工具

项目提供了专门的修复工具来解决UMI构建工具问题：

### 1. 配置修复脚本

```cmd
./scripts/fix-umi-config.bat
```

该脚本会自动修复以下问题：
- .umirc.ts配置文件中的npmClient设置
- package.json中的packageManager配置
- TypeScript配置
- ESLint配置

### 2. 构建工具修复脚本

```cmd
./scripts/fix-umi-build.bat
```

该脚本会修复由于依赖问题导致的UMI构建工具无法正常运行的问题。

## 手动解决步骤

如果自动化脚本无法解决问题，可以尝试以下手动步骤：

### 1. 清理所有依赖

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

### 2. 重新安装依赖

```bash
pnpm install --force
```

### 3. 验证UMI是否正常工作

```bash
cd frontend
npx @umijs/max -v
```

### 4. 检查前端package.json文件

确保前端package.json文件包含以下内容：
- `react`和`react-dom`依赖
- 不包含重复的UMI相关依赖
- `@umijs/max`版本正确

## 依赖管理

### 1. 依赖冲突解决

确保package.json中不同时包含以下依赖：
- `@umijs/max` 和 `umi`
- 重复的`@umijs/plugins`

正确的前端依赖配置示例：
```json
{
  "dependencies": {
    "@ant-design/icons": "^6.0.1",
    "@ant-design/pro-components": "^2.6.43",
    "@umijs/max": "4.4.12",
    "ahooks": "^3.7.8",
    "antd": "^5.8.6",
    "axios": "^1.5.0",
    "dayjs": "^1.11.9",
    "lodash": "^4.17.21",
    "react": "^18.3.1",
    "react-dom": "^18.3.1"
  }
}
```

### 2. 版本统一

使用根目录package.json中的`resolutions`和`overrides`字段统一依赖版本：
```json
{
  "resolutions": {
    "undici": "^5.28.4",
    "antd": "^5.8.6",
    "eslint": "^9.35.0"
  },
  "overrides": {
    "undici": "^5.28.4",
    "antd": "^5.8.6",
    "eslint": "^9.35.0"
  }
}
```

## 配置检查

### 1. .umirc.ts配置

确保[frontend/.umirc.ts](file:///e:/YSY/UG/frontend/.umirc.ts)文件包含正确的配置：
```typescript
export default defineConfig({
  npmClient: 'pnpm',
  mfsu: {
    strategy: 'normal',
    mfName: 'mf',
    cacheDirectoryPath: './node_modules/.cache/mfsu',
  },
  // 其他配置...
});
```

### 2. package.json配置

确保[frontend/package.json](file:///e:/YSY/UG/frontend/package.json)文件包含正确的配置：
```json
{
  "packageManager": "pnpm@8.15.8",
  // 其他配置...
}
```

## 常见错误及解决方案

### 1. MODULE_NOT_FOUND错误

**错误信息**：
```
Error: Cannot find module 'react-dom/package.json' from 'e:\YSY\UG\frontend'
```

**解决方案**：
1. 确保react-dom已正确安装：`pnpm add react-dom@^18.3.1`
2. 检查node_modules目录中是否存在react-dom文件夹
3. 清理缓存并重新安装：`pnpm install --force`

### 2. 依赖版本冲突

**错误信息**：
```
ERR_PNPM_PEER_DEP_ISSUES  Unmet peer dependencies
```

**解决方案**：
1. 使用resolutions和overrides字段统一依赖版本
2. 移除重复的依赖项
3. 更新依赖到兼容版本

### 3. 配置文件错误

**错误信息**：
```
ValidationError: "npmClient" must be one of [npm, yarn, pnpm]
```

**解决方案**：
1. 检查.umirc.ts文件中的npmClient配置
2. 确保值为'pnpm'（小写）
3. 运行配置修复脚本：`./scripts/fix-umi-config.bat`

## 预防措施

为了预防UMI构建工具问题，建议采取以下措施：

1. **定期更新依赖**：
   ```bash
   pnpm update
   ```

2. **检查依赖过时情况**：
   ```bash
   pnpm outdated
   ```

3. **定期清理缓存**：
   ```bash
   pnpm store prune
   ```

4. **使用正确的包管理器**：
   - 确保使用pnpm而不是npm或yarn
   - 确保版本为8.15.8

5. **定期运行诊断工具**：
   ```cmd
   ./scripts/quick-diagnosis.bat
   ```

## 支持和帮助

如果以上解决方案都无法解决问题，请：

1. 查看UMI官方文档：https://umijs.org
2. 在GitHub上提交issue：https://github.com/umijs/umi/issues
3. 查看项目中的其他文档：
   - [DEVELOPMENT.md](DEVELOPMENT.md) - 开发指南
   - [AUTOMATION.md](AUTOMATION.md) - 自动化指南
   - [DEPENDENCY_UPDATES.md](DEPENDENCY_UPDATES.md) - 依赖更新日志

4. 联系项目维护团队