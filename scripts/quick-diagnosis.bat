@echo off
echo 正在运行快速诊断...
cd /d "%~dp0.."

echo ================================
echo UG 管理系统快速诊断工具
echo ================================

echo.
echo 1. 检查Node.js版本...
node --version

echo.
echo 2. 检查pnpm版本...
pnpm --version

echo.
echo 3. 检查环境变量...
call scripts\validate-env.bat

echo.
echo 4. 检查依赖过时情况...
call scripts\check-dependencies.bat

echo.
echo 5. 检查TypeScript类型...
call scripts\auto-type-check.bat

echo.
echo 6. 检查代码规范...
call scripts\auto-format-and-lint.bat

echo.
echo 7. 测试数据库连接...
call scripts\test-db-connection.bat

echo.
echo 快速诊断完成！
pause