export default async () => {
  const config = {
    testEnvironment: 'jsdom',
    displayName: 'UNIT',
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  };

  // Since we're using Umi's built-in test configuration, we don't need to call configUmiAlias
  return config;
};