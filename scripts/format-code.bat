@echo off
echo Formatting code with Prettier in frontend...
cd /d e:\YSY\UG\frontend
npx prettier --write "src/**/*.{ts,tsx,js,jsx,json}"

echo.
echo Formatting code with Prettier in backend...
cd /d e:\YSY\UG\backend
npx prettier --write "app/**/*.{ts,js,json}"

echo.
echo Code formatting completed.
pause
