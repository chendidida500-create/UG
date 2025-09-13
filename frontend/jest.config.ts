import { Config, configUmiAlias, createConfig } from '@umijs/max/test';

export default async () => {
  const config: Config = {
    ...createConfig({
      jsTransformer: 'esbuild',
      displayName: 'UNIT',
    }),
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  };

  return configUmiAlias(config);
};