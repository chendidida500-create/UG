import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import prettier from 'eslint-plugin-prettier';

// Umi 官方推荐的 ESLint 配置
export default [
  {
    ignores: [
      'node_modules/**/*',
      'dist/**/*',
      '.umi/**/*',
      '.umi-production/**/*',
      'typings.d.ts',
      'src/**/*.d.ts',
    ],
  },
  {
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    // 排除 .umi 目录中的文件
    ignores: ['.umi/**/*', '.umi-production/**/*'],
    rules: {
      'no-console': 'warn',
      'prefer-const': 'error',
      'no-var': 'error',
      'no-unused-vars': 'error',
      'no-undef': 'off',
      'no-empty': 'error',
      'no-duplicate-case': 'error',
      'no-extra-semi': 'error',
      'no-fallthrough': 'error',
      'no-irregular-whitespace': 'error',
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    // 排除 .umi 目录中的文件
    ignores: ['.umi/**/*', '.umi-production/**/*'],
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
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-explicit-any': 'error',
      // TypeScript 相关规则
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-parameter-properties': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      'no-unused-vars': 'off', // 禁用基础规则，使用@typescript-eslint/no-unused-vars替代
    },
  },
  {
    files: ['**/*.{js,jsx,ts,tsx}'],
    // 排除 .umi 目录中的文件
    ignores: ['.umi/**/*', '.umi-production/**/*'],
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
    // 排除 .umi 目录中的文件
    ignores: ['.umi/**/*', '.umi-production/**/*'],
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
