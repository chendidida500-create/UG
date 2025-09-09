@echo off
echo UG管理系统前端类型声明修复脚本
echo =========================

echo.
echo 1. 安装缺失的类型定义...
cd frontend
pnpm add -D @types/node

echo.
echo 2. 更新类型声明文件...
echo // 声明UMI相关模块 > typings.d.ts
echo declare module 'umi' { >> typings.d.ts
echo   export * from '@umijs/max'; >> typings.d.ts
echo } >> typings.d.ts
echo. >> typings.d.ts
echo declare module '@umijs/max' { >> typings.d.ts
echo   export * from 'umi'; >> typings.d.ts
echo. >> typings.d.ts
echo   // 导出UMI常用类型和函数 >> typings.d.ts
echo   export const history: any; >> typings.d.ts
echo   export const request: any; >> typings.d.ts
echo   export function useNavigate^(^): any; >> typings.d.ts
echo   export function useLocation^(^): any; >> typings.d.ts
echo   export function useParams^(^): any; >> typings.d.ts
echo   export function useModel^(namespace: string^): any; >> typings.d.ts
echo } >> typings.d.ts
echo. >> typings.d.ts
echo // 声明Node.js类型 >> typings.d.ts
echo /// ^<reference types="node" /^> >> typings.d.ts
echo. >> typings.d.ts
echo // 声明环境变量 >> typings.d.ts
echo declare namespace NodeJS { >> typings.d.ts
echo   interface ProcessEnv { >> typings.d.ts
echo     readonly NODE_ENV: 'development' ^| 'production' ^| 'test'; >> typings.d.ts
echo     readonly API_BASE_URL: string; >> typings.d.ts
echo     readonly PORT: string; >> typings.d.ts
echo   } >> typings.d.ts
echo. >> typings.d.ts
echo   interface Process { >> typings.d.ts
echo     env: ProcessEnv; >> typings.d.ts
echo   } >> typings.d.ts
echo } >> typings.d.ts
echo. >> typings.d.ts
echo // 声明process对象 >> typings.d.ts
echo declare var process: NodeJS.Process; >> typings.d.ts

echo.
echo 前端类型声明修复完成！
echo 请重新加载VS Code窗口以使更改生效。