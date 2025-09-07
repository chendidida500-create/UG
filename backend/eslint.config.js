// ESLint 配置文件 - 用于 ESLint v9+ (扁平配置格式)

module.exports = [
  {
    // 文件匹配规则
    files: ['**/*.{js,ts}'],

    // 忽略的文件和目录
    ignores: [
      'node_modules/',
      'logs/',
      'run/',
      'dist/'
    ],

    // 语言选项
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname
      },
      globals: {
        node: 'readonly',
        es6: 'readonly'
      }
    },

    // 插件
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin')
    },

    // 规则
    rules: {
      // TypeScript 规则
      '@typescript-eslint/no-unused-vars': 'error',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/prefer-optional-chain': 'error',
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      '@typescript-eslint/strict-boolean-expressions': 'error',
      '@typescript-eslint/no-floating-promises': 'error',
      '@typescript-eslint/prefer-readonly': 'warn',
      '@typescript-eslint/consistent-type-assertions': 'error',

      // 基础规则
      'no-console': 'off',
      'prefer-const': 'error',
      'no-var': 'error'
    }
  }
];