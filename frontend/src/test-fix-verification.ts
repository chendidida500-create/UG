// 测试文件：验证类型修复是否正确
import type { User } from './types';

// 测试1：验证User类型是否正确
const testUser: User = {
  id: '1',
  username: 'admin',
  email: 'admin@example.com',
  status: 1, // 应该是数字类型，不是字符串
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
  roles: [
    {
      id: '1',
      name: '管理员',
      code: 'admin',
      status: 1, // 应该是数字类型
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      permissions: [
        {
          id: '1',
          name: '用户管理',
          code: 'system:user:manage',
          type: 'button',
          sort: 1,
          status: 1, // 应该是数字类型
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      ],
    },
  ],
};

// 测试2：验证access模型中的currentUser.status访问
function testAccessModel() {
  // 这个函数模拟useAccessModel的使用
  // 确保currentUser.status可以正确访问
  const mockCurrentUser = testUser;

  // 这应该不会报错
  const canUser = !!mockCurrentUser && mockCurrentUser.status === 1;

  return canUser;
}

// 测试3：验证类型兼容性
function testTypeCompatibility() {
  // 测试User类型与后端API响应的兼容性
  const apiResponse = {
    id: '1',
    username: 'test',
    email: 'test@example.com',
    status: 1 as 0 | 1, // 明确指定类型
    created_at: '2023-01-01T00:00:00.000Z',
    updated_at: '2023-01-01T00:00:00.000Z',
    roles: [],
  };

  // 这应该可以正确赋值
  const user: User = apiResponse;

  return user;
}

export { testAccessModel, testTypeCompatibility, testUser };

