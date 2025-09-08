// UMI项目ESLint配置 - 适配ESLint 8.x扁平配置格式
export default [
  // JavaScript/TypeScript基础配置
  {
    files: [ '**/*.{js,mjs,cjs,ts,jsx,tsx}' ],
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

  // TypeScript特定配置
  {
    files: [ '**/*.{ts,tsx}' ],
    languageOptions: {
      parser: '@typescript-eslint/parser',
    },
    plugins: {
      '@typescript-eslint': '@typescript-eslint/eslint-plugin',
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
      react: 'eslint-plugin-react',
      'react-hooks': 'eslint-plugin-react-hooks',
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
      prettier: 'eslint-plugin-prettier',
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