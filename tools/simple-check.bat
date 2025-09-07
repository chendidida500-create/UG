@echo off
echo Node.js version:
node --version

echo.
echo pnpm version:
pnpm --version

echo.
echo Root dependencies:
cd /d e:\YSY\UG
pnpm list typescript @types/node --depth 0

echo.
echo Frontend dependencies:
cd /d e:\YSY\UG\frontend
pnpm list react react-dom umi @umijs/max @umijs/plugins --depth 0

echo.
echo Frontend type dependencies:
pnpm list @types/react @types/react-dom --depth 0

echo.
echo Backend dependencies:
cd /d e:\YSY\UG\backend
pnpm list egg --depth 0

pause