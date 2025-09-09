// Type definitions for Node.js
declare var process: {
  env: {
    [key: string]: string | undefined;
    NODE_ENV: 'development' | 'production' | 'test';
    API_BASE_URL?: string;
  };
  cwd(): string;
};

declare var require: {
  (module: string): any;
  resolve(module: string): string;
};
