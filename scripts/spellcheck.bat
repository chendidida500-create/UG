@echo off
echo Running spell check for the project...

REM Check if cspell is installed
npm list cspell >nul 2>&1
if %errorlevel% neq 0 (
    echo Installing cspell...
    npm install cspell
)

REM Run spell check on frontend and backend source files
echo Checking frontend files...
npx cspell "frontend/src/**/*.{js,ts,jsx,tsx,json,md}" --exclude "node_modules" --exclude "dist" --exclude "logs" --exclude "run" --exclude "coverage" --exclude ".umi" --exclude ".umi-production"
if %errorlevel% neq 0 (
    echo Error checking frontend files
    exit /b %errorlevel%
)

echo Checking backend files...
npx cspell "backend/app/**/*.{js,ts,json,md}" "backend/config/**/*.{js,ts,json,md}" --exclude "node_modules" --exclude "dist" --exclude "logs" --exclude "run" --exclude "coverage"
if %errorlevel% neq 0 (
    echo Error checking backend files
    exit /b %errorlevel%
)

echo Spell check completed successfully!