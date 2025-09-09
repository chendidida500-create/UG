import { exec } from 'child_process';
import { promisify } from 'util';

const execAsync = promisify(exec);

async function checkTypescriptErrors() {
  try {
    console.log('Checking TypeScript errors in frontend...');
    
    // 检查特定文件的TypeScript错误
    const { stdout, stderr } = await execAsync(
      'cd e:\\YSY\\UG\\frontend && npx tsc --noEmit --skipLibCheck src/pages/System/Role/index.tsx src/pages/System/Permission/index.tsx src/pages/System/User/index.tsx',
      { timeout: 30000 }
    );
    
    console.log('STDOUT:', stdout);
    console.log('STDERR:', stderr);
    
    if (stdout.includes('error')) {
      console.log('TypeScript errors found:');
      console.log(stdout);
    } else {
      console.log('No TypeScript errors found.');
    }
  } catch (error: any) {
    console.log('Error checking TypeScript:', error.message);
    if (error.stdout) {
      console.log('STDOUT:', error.stdout);
    }
    if (error.stderr) {
      console.log('STDERR:', error.stderr);
    }
  }
}

checkTypescriptErrors();