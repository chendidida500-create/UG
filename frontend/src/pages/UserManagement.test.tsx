import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { UserManagement } from './UserManagement'; // 注意：需要导出UserManagement组件才能测试
import * as userServices from '@/services/user';

// Mock用户服务
jest.mock('@/services/user', () => ({
  getUserList: jest.fn(),
  getUserById: jest.fn(),
  createUser: jest.fn(),
  updateUser: jest.fn(),
  deleteUser: jest.fn(),
  assignRolesToUser: jest.fn(),
}));

describe('UserManagement Page', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should render user management page', async () => {
    // Mock getUserList 返回空数据
    (userServices.getUserList as jest.Mock).mockResolvedValue({
      success: true,
      data: [],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0,
      },
    });

    // 由于UserManagement是默认导出，我们需要动态导入
    const UserManagementComponent = (await import('./UserManagement')).default;
    
    render(<UserManagementComponent />);
    
    // 等待数据加载
    await waitFor(() => {
      expect(screen.getByText('用户管理')).toBeInTheDocument();
    });
  });

  it('should display user list', async () => {
    // Mock getUserList 返回模拟数据
    (userServices.getUserList as jest.Mock).mockResolvedValue({
      success: true,
      data: [
        {
          id: 1,
          username: 'testuser',
          email: 'test@example.com',
          roles: [{ id: 1, name: 'admin' }],
          createdAt: '2023-01-01',
          updatedAt: '2023-01-01',
        },
      ],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 1,
        totalPages: 1,
      },
    });

    const UserManagementComponent = (await import('./UserManagement')).default;
    
    render(<UserManagementComponent />);
    
    // 等待数据加载并检查用户是否显示
    await waitFor(() => {
      expect(screen.getByText('testuser')).toBeInTheDocument();
      expect(screen.getByText('test@example.com')).toBeInTheDocument();
    });
  });
});