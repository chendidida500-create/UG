@echo off
chcp 65001 >nul 2>&1
cls
echo ================================================
echo ChartDB数据库可视化工具设置脚本
echo ================================================
echo.

echo 正在检查Docker环境...
docker --version >nul 2>&1
if %errorlevel% neq 0 (
    echo 错误：未检测到Docker环境，请先安装Docker Desktop
    echo 下载地址：https://www.docker.com/products/docker-desktop
    pause
    exit /b 1
)

echo Docker环境检查通过
echo.

echo 正在启动ChartDB服务...
cd /d "%~dp0.."
docker-compose up -d chartdb >nul 2>&1

if %errorlevel% neq 0 (
    echo 错误：启动ChartDB服务失败
    pause
    exit /b 1
)

echo ChartDB服务启动成功
echo.

echo 正在检查服务状态...
timeout /t 10 /nobreak >nul

echo.
echo ================================================
echo ChartDB服务信息
echo ================================================
echo 访问地址：http://localhost:3002
echo 数据库连接信息：
echo   主机：localhost
echo   端口：3306
echo   数据库名：ug_management
echo   用户名：ug_user
echo   密码：ug_password
echo   类型：MySQL
echo.

echo 使用说明：
echo 1. 打开浏览器访问 http://localhost:3002
echo 2. 在ChartDB界面中输入上述数据库连接信息
echo 3. 点击"导入"按钮即可生成数据库ER图
echo 4. 可以拖拽调整表位置，导出图表等
echo.

echo 如需停止ChartDB服务，请运行 stop-chartdb.bat 脚本
echo.

echo 按任意键退出...
pause >nul