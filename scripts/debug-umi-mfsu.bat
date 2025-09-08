@echo off
echo 正在为 Umi 4 项目创建 MFSU 问题排查脚本...

echo.
echo 1. 备份当前 .umirc.ts 配置文件...
copy "frontend\.umirc.ts" "frontend\.umirc.ts.bak" >nul

echo.
echo 2. 创建禁用 MFSU 的配置文件...
powershell -Command "(Get-Content 'frontend\.umirc.ts') -replace 'mfsu: {', 'mfsu: false, // 禁用 MFSU 以排查问题' | Set-Content 'frontend\.umirc.ts.no-mfsu'"

echo.
echo 3. 替换配置文件...
move /Y "frontend\.umirc.ts.no-mfsu" "frontend\.umirc.ts" >nul

echo.
echo 4. 重新安装依赖...
cd frontend
pnpm install --force
cd ..

echo.
echo 5. 验证修复结果...
echo 如果项目能正常启动，说明问题与 MFSU 处理依赖的方式有关

echo.
echo 如需恢复原始配置，可执行以下命令：
echo move /Y frontend\.umirc.ts.bak frontend\.umirc.ts

echo.
echo MFSU 问题排查脚本执行完成！