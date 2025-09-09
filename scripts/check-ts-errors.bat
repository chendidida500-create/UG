@echo off
echo Checking TypeScript errors in frontend...
cd /d "e:\YSY\UG\frontend"
if exist node_modules (
  echo Running tsc to check for TypeScript errors...
  npx tsc --noEmit --project tsconfig.json
) else (
  echo Frontend node_modules not found. Please install dependencies first.
)
echo Done.