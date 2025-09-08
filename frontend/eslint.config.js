// UMI项目ESLint配置 - 使用UMI官方推荐配置

// 尝试不同的导入方式
let umiLintConfig = [];
try
{
  umiLintConfig = require( '@umijs/lint/dist/config/eslint' ).default;
} catch ( error )
{
  console.warn( '无法加载UMI ESLint配置:', error.message );
}

// UMI项目ESLint配置 - 简化版配置用于测试
export default [
  // 基础配置
  {
    files: [ '**/*.{js,jsx,ts,tsx}' ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
    },
  },

  // 忽略目录
  {
    ignores: [ 'dist', 'build', '.umi', 'node_modules', '.umi-production' ],
  },
];