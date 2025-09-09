// UMI项目ESLint配置 - 适配ESLint 8.x扁平配置格式
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  // JavaScript/TypeScript基础配置
  {
    files: [ '**/*.{js,mjs,cjs,ts,jsx,tsx}' ],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      parser: tsparser,
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: process.cwd(),
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

  // TypeScript特定配置
  {
    files: [ '**/*.{ts,tsx}' ],
    languageOptions: {
      parser: tsparser,
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
    },
  },

  // React特定配置
  {
    files: [ '**/*.{js,jsx,ts,tsx}' ],
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
    },
  },

  // Prettier配置（确保与ESLint规则不冲突）
  {
    files: [ '**/*.{js,jsx,ts,tsx}' ],
    plugins: {
      prettier: prettier,
    },
    rules: {
      'prettier/prettier': 'error',
    },
  },

  // 忽略目录
  {
    ignores: [ 'dist', 'build', '.umi', 'node_modules', '.umi-production' ],
  },
];
