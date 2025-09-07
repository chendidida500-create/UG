@echo on
echo Checking project dependency versions...
echo ======================================

echo 1. Checking Node.js version...
node --version

echo.
echo 2. Checking pnpm version...
pnpm --version

echo.
echo 3. Checking root dependencies...
cd /d e:\YSY\UG
pnpm list typescript @types/node --depth 0

echo.
echo 4. Checking frontend dependencies...
cd /d e:\YSY\UG\frontend
pnpm list react react-dom umi @umijs/max @umijs/plugins @types/react @types/react-dom --depth 0

echo.
echo 5. Checking backend dependencies...
cd /d e:\YSY\UG\backend
pnpm list egg --depth 0

echo.
echo Dependency version check complete!
pause