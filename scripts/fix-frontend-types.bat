@echo off
echo UG管理系统前端TypeScript问题修复脚本
echo =========================

echo.
echo 1. 安装缺失的类型定义...
cd frontend
pnpm add -D @types/node

echo.
echo 2. 创建类型声明文件...
echo // 声明UMI相关模块 > typings.d.ts
echo declare module '@umijs/max' { >> typings.d.ts
echo   export * from 'umi'; >> typings.d.ts
echo } >> typings.d.ts
echo. >> typings.d.ts
echo // 声明环境变量 >> typings.d.ts
echo declare namespace NodeJS { >> typings.d.ts
echo   interface ProcessEnv { >> typings.d.ts
echo     readonly NODE_ENV: 'development' ^| 'production' ^| 'test'; >> typings.d.ts
echo     readonly API_BASE_URL: string; >> typings.d.ts
echo     readonly PORT: string; >> typings.d.ts
echo   } >> typings.d.ts
echo } >> typings.d.ts
echo. >> typings.d.ts
echo // 声明process对象 >> typings.d.ts
echo declare var process: NodeJS.Process; >> typings.d.ts

echo.
echo 3. 更新tsconfig.json...
powershell -Command "(Get-Content tsconfig.json) -replace '\"include\": \[$', '\"include\": [' -replace '\"src/\*\*/\*\"', '\"src/**/*\", \"typings.d.ts\"' | Set-Content tsconfig.json"

echo.
echo 前端TypeScript问题修复完成！
echo 请重新加载VS Code窗口以使更改生效。