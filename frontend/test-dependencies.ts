// 测试文件用于验证依赖是否正确安装
import '@testing-library/jest-dom';
import * as React from 'react';

// 简单的测试函数
const testFunction = () =>
{
  const element = React.createElement( 'div', { 'data-testid': 'test' }, 'Hello World' );
  return element;
};

// Jest 测试示例
describe( 'Dependency Test', () =>
{
  test( 'should render element', () =>
  {
    const element = testFunction();
    expect( element ).toBeDefined();
  } );
} );

console.log( 'Dependencies are correctly installed!' );