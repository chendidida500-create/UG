import { getUserList, getUserById, createUser, updateUser, deleteUser } from './user';

// Mock fetch
global.fetch = jest.fn();

describe('UserService', () => {
  beforeEach(() => {
    (fetch as jest.Mock).mockClear();
  });

  it('should get user list', async () => {
    const mockResponse = {
      success: true,
      data: [],
      pagination: {
        page: 1,
        pageSize: 10,
        total: 0,
        totalPages: 0,
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
      ok: true,
    });

    const result = await getUserList({ page: 1, pageSize: 10 });
    expect(result).toEqual(mockResponse);
    expect(fetch).toHaveBeenCalledWith('/api/users?page=1&pageSize=10', undefined);
  });

  it('should get user by id', async () => {
    const mockUser = {
      success: true,
      data: {
        id: 1,
        username: 'testuser',
        email: 'test@example.com',
        roles: [],
        createdAt: '2023-01-01',
        updatedAt: '2023-01-01',
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(mockUser),
      ok: true,
    });

    const result = await getUserById(1);
    expect(result).toEqual(mockUser);
    expect(fetch).toHaveBeenCalledWith('/api/users/1', undefined);
  });

  it('should create user', async () => {
    const newUser = {
      success: true,
      data: {
        id: 1,
        username: 'newuser',
        email: 'new@example.com',
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(newUser),
      ok: true,
    });

    const userData = {
      username: 'newuser',
      email: 'new@example.com',
      password: 'password123',
    };

    const result = await createUser(userData);
    expect(result).toEqual(newUser);
    expect(fetch).toHaveBeenCalledWith('/api/users', {
      method: 'POST',
      data: userData,
    });
  });

  it('should update user', async () => {
    const updatedUser = {
      success: true,
      data: {
        id: 1,
        username: 'updateduser',
        email: 'updated@example.com',
      },
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(updatedUser),
      ok: true,
    });

    const updateData = {
      username: 'updateduser',
      email: 'updated@example.com',
    };

    const result = await updateUser(1, updateData);
    expect(result).toEqual(updatedUser);
    expect(fetch).toHaveBeenCalledWith('/api/users/1', {
      method: 'PUT',
      data: updateData,
    });
  });

  it('should delete user', async () => {
    const deleteResponse = {
      success: true,
      message: '用户删除成功',
    };

    (fetch as jest.Mock).mockResolvedValueOnce({
      json: () => Promise.resolve(deleteResponse),
      ok: true,
    });

    const result = await deleteUser(1);
    expect(result).toEqual(deleteResponse);
    expect(fetch).toHaveBeenCalledWith('/api/users/1', {
      method: 'DELETE',
    });
  });
});