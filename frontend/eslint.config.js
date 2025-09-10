import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';

export default [
  {
    ignores: [
      'node_modules/**/*',
      'dist/**/*',
      '.umi/**/*',
      '.umi-production/**/*',
      // 忽略所有第三方依赖的错误
      'node_modules/.pnpm/**/*',
      'node_modules/@umijs/**/*',
      'node_modules/umi/**/*',
      // 忽略类型定义文件的检查
      'typings.d.ts',
      'src/**/*.d.ts',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      // 添加环境定义，告诉 ESLint console 是全局可用的
      globals: {
        console: 'readonly',
        // 其他浏览器全局对象
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        history: 'readonly',
        localStorage: 'readonly',
        sessionStorage: 'readonly',
      },
    },
    rules: {
      'no-console': 'off', // 允许使用console
      'prefer-const': 'error',
      'no-var': 'error',
      // UMI 编码规范相关规则
      'no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      'no-undef': 'error',
      'no-empty': 'error',
      'no-duplicate-case': 'error',
      'no-extra-semi': 'error',
      'no-fallthrough': 'error',
      'no-irregular-whitespace': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        warnOnUnsupportedTypeScriptVersion: false, // 忽略 TypeScript 版本警告
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      // TypeScript 相关规则
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      react: react,
      'react-hooks': reactHooks,
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
    rules: {
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
      // React 相关规则
      'react/jsx-uses-react': 'error',
      'react/jsx-uses-vars': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-pascal-case': 'error',
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    plugins: {
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': [
        'error',
        {
          // 确保使用 UTF-8 编码
          endOfLine: 'lf',
          // 其他 Prettier 规则
        },
      ],
    },
  },
];
