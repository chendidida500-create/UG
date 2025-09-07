// ESLint 配置文件 - 用于 ESLint v9+ (扁平配置格式)

module.exports = [
  {
    // 文件匹配规则
    files: ['**/*.{js,jsx,ts,tsx}'],

    // 忽略的文件和目录
    ignores: [
      'dist/',
      'build/',
      '.umi/',
      'node_modules/'
    ],

    // 语言选项
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: '@typescript-eslint/parser',
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: __dirname,
        ecmaFeatures: {
          jsx: true
        }
      },
      globals: {
        browser: 'readonly',
        es2021: 'readonly',
        node: 'readonly'
      }
    },

    // 插件
    plugins: {
      '@typescript-eslint': {},
      'react': {},
      'react-hooks': {},
      'prettier': {}
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

      // React 规则
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',

      // 基础规则
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',

      // 格式化规则
      'prettier/prettier': 'error'
    },

    // 设置
    settings: {
      react: {
        version: 'detect'
      }
    }
  }
];