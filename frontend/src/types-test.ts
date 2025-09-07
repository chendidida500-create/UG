// 测试 TypeScript 类型定义是否能正确解析
import type { FC } from 'react';
import type { Server } from 'node:http';

// 如果这行没有报错，说明 React 类型定义正确
const TestComponent: FC = () => {
  return <div>Test </div>;
};

// 如果这行没有报错，说明 Node.js 类型定义正确
const server: Server = {} as Server;

export { TestComponent, server };