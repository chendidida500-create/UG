'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/service/user.test.js', () => {
  let ctx;

  beforeEach(() => {
    ctx = app.mockContext();
  });

  describe('getUserList()', () => {
    it('should get user list successfully', async () => {
      const result = await ctx.service.user.getUserList({
        current: 1,
        pageSize: 10,
      });

      assert(result.success === true);
      assert(Array.isArray(result.data.list));
      assert(typeof result.data.total === 'number');
    });

    it('should search users by keyword', async () => {
      const result = await ctx.service.user.getUserList({
        keyword: 'admin',
      });

      assert(result.success === true);
      assert(result.data.list.some(user =>
        user.username.includes('admin') || user.email.includes('admin')
      ));
    });

    it('should filter users by status', async () => {
      const result = await ctx.service.user.getUserList({
        status: 'active',
      });

      assert(result.success === true);
      assert(result.data.list.every(user => user.status === 'active'));
    });
  });

  describe('createUser()', () => {
    it('should create user successfully', async () => {
      const userData = {
        username: `testuser_${Date.now()}`,
        email: `test_${Date.now()}@example.com`,
        password: '123456',
        roles: ['USER'],
        status: 'active',
      };

      const result = await ctx.service.user.createUser(userData);

      assert(result.success === true);
      assert(result.data.id);
      assert(result.data.username === userData.username);
      assert(result.data.email === userData.email);
      assert(!result.data.password); // 密码不应该返回
    });

    it('should fail with duplicate username', async () => {
      try {
        await ctx.service.user.createUser({
          username: 'admin',
          email: 'test@example.com',
          password: '123456',
          roles: ['USER'],
        });
        assert.fail('Should throw error for duplicate username');
      } catch (error) {
        assert(error.message.includes('用户名已存在'));
      }
    });

    it('should fail with duplicate email', async () => {
      try {
        await ctx.service.user.createUser({
          username: 'newuser',
          email: 'admin@example.com',
          password: '123456',
          roles: ['USER'],
        });
        assert.fail('Should throw error for duplicate email');
      } catch (error) {
        assert(error.message.includes('邮箱已存在'));
      }
    });
  });

  describe('updateUser()', () => {
    let testUserId;

    before(async () => {
      const user = await ctx.service.user.createUser({
        username: `updatetest_${Date.now()}`,
        email: `updatetest_${Date.now()}@example.com`,
        password: '123456',
        roles: ['USER'],
      });
      testUserId = user.data.id;
    });

    it('should update user successfully', async () => {
      const updateData = {
        phone: '13800138000',
        status: 'inactive',
      };

      const result = await ctx.service.user.updateUser(testUserId, updateData);

      assert(result.success === true);
      assert(result.data.phone === updateData.phone);
      assert(result.data.status === updateData.status);
    });

    it('should fail with non-existent user id', async () => {
      try {
        await ctx.service.user.updateUser('non-existent-id', {
          phone: '13800138000',
        });
        assert.fail('Should throw error for non-existent user');
      } catch (error) {
        assert(error.message.includes('用户不存在'));
      }
    });

    after(async () => {
      await ctx.service.user.deleteUser(testUserId);
    });
  });

  describe('deleteUser()', () => {
    let testUserId;

    before(async () => {
      const user = await ctx.service.user.createUser({
        username: `deletetest_${Date.now()}`,
        email: `deletetest_${Date.now()}@example.com`,
        password: '123456',
        roles: ['USER'],
      });
      testUserId = user.data.id;
    });

    it('should delete user successfully', async () => {
      const result = await ctx.service.user.deleteUser(testUserId);

      assert(result.success === true);
    });

    it('should fail with non-existent user id', async () => {
      try {
        await ctx.service.user.deleteUser('non-existent-id');
        assert.fail('Should throw error for non-existent user');
      } catch (error) {
        assert(error.message.includes('用户不存在'));
      }
    });
  });

  describe('getUserById()', () => {
    it('should get user by id successfully', async () => {
      // 假设admin用户存在
      const users = await ctx.service.user.getUserList({ keyword: 'admin' });
      const adminUser = users.data.list[0];

      if (adminUser) {
        const result = await ctx.service.user.getUserById(adminUser.id);

        assert(result.success === true);
        assert(result.data.id === adminUser.id);
        assert(result.data.username === adminUser.username);
        assert(!result.data.password); // 密码不应该返回
      }
    });

    it('should fail with non-existent user id', async () => {
      try {
        await ctx.service.user.getUserById('non-existent-id');
        assert.fail('Should throw error for non-existent user');
      } catch (error) {
        assert(error.message.includes('用户不存在'));
      }
    });
  });

  describe('updateUserStatus()', () => {
    let testUserId;

    before(async () => {
      const user = await ctx.service.user.createUser({
        username: `statustest_${Date.now()}`,
        email: `statustest_${Date.now()}@example.com`,
        password: '123456',
        roles: ['USER'],
      });
      testUserId = user.data.id;
    });

    it('should update user status successfully', async () => {
      const result = await ctx.service.user.updateUserStatus(testUserId, 'inactive');

      assert(result.success === true);
    });

    it('should fail with invalid status', async () => {
      try {
        await ctx.service.user.updateUserStatus(testUserId, 'invalid_status');
        assert.fail('Should throw error for invalid status');
      } catch (error) {
        assert(error.message.includes('无效的状态'));
      }
    });

    after(async () => {
      await ctx.service.user.deleteUser(testUserId);
    });
  });

  describe('resetUserPassword()', () => {
    let testUserId;

    before(async () => {
      const user = await ctx.service.user.createUser({
        username: `passwordtest_${Date.now()}`,
        email: `passwordtest_${Date.now()}@example.com`,
        password: '123456',
        roles: ['USER'],
      });
      testUserId = user.data.id;
    });

    it('should reset password successfully', async () => {
      const result = await ctx.service.user.resetUserPassword(testUserId, 'newpassword123');

      assert(result.success === true);
    });

    it('should fail with non-existent user id', async () => {
      try {
        await ctx.service.user.resetUserPassword('non-existent-id', 'newpassword123');
        assert.fail('Should throw error for non-existent user');
      } catch (error) {
        assert(error.message.includes('用户不存在'));
      }
    });

    after(async () => {
      await ctx.service.user.deleteUser(testUserId);
    });
  });

  describe('checkUsername()', () => {
    it('should return false for existing username', async () => {
      const result = await ctx.service.user.checkUsername('admin');

      assert(result === false);
    });

    it('should return true for non-existing username', async () => {
      const result = await ctx.service.user.checkUsername(`nonexistent_${Date.now()}`);

      assert(result === true);
    });
  });

  describe('checkEmail()', () => {
    it('should return false for existing email', async () => {
      const result = await ctx.service.user.checkEmail('admin@example.com');

      assert(result === false);
    });

    it('should return true for non-existing email', async () => {
      const result = await ctx.service.user.checkEmail(`nonexistent_${Date.now()}@example.com`);

      assert(result === true);
    });
  });
});