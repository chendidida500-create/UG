module.exports = {
  root: true,
  ignorePatterns: [
    'node_modules/',
    'dist/',
    'build/',
    'frontend/dist/',
    'frontend/.umi/',
    'frontend/.umi-production/',
    '.qoder/',
    'monitoring/',
    'tools/',
  ],
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx'],
      env: {
        node: true,
        es6: true,
      },
      extends: ['eslint:recommended'],
      rules: {
        'no-console': 'warn',
        'prefer-const': 'error',
        'no-var': 'error',
      },
    },
    {
      files: ['**/*.ts', '**/*.tsx'],
      env: {
        node: true,
        es6: true,
      },
      parser: '@typescript-eslint/parser',
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
        project: [
          './tsconfig.json',
          './frontend/tsconfig.json',
          './backend/tsconfig.json',
        ],
      },
      plugins: ['@typescript-eslint'],
      extends: ['eslint:recommended'],
      rules: {
        'no-console': 'warn',
        'prefer-const': 'error',
        'no-var': 'error',
        '@typescript-eslint/no-unused-vars': [
          'error',
          { argsIgnorePattern: '^_' },
        ],
        '@typescript-eslint/no-explicit-any': 'error',
      },
    },
  ],
};
