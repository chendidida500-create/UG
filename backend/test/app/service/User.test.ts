import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/User.test.ts', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  describe('index()', () => {
    it('should get user list', async () => {
      const result = await ctx.service.user.index(1, 10);
      assert(result.users);
      assert(result.pagination);
    });
  });

  describe('create()', () => {
    it('should create user', async () => {
      const user = await ctx.service.user.create({
        username: 'testuser',
        email: 'test@example.com',
        password: '123456',
      });
      
      assert(user);
      assert(user.username === 'testuser');
      assert(user.email === 'test@example.com');
    });

    it('should not create duplicate user', async () => {
      try {
        await ctx.service.user.create({
          username: 'testuser',
          email: 'test2@example.com',
          password: '123456',
        });
        assert.fail('Should throw error for duplicate username');
      } catch (err) {
        assert(err.message === '用户名或邮箱已存在');
      }
    });
  });

  describe('update()', () => {
    it('should update user', async () => {
      const user = await ctx.model.User.findOne({ where: { username: 'testuser' } });
      assert(user);

      const updatedUser = await ctx.service.user.update(user.id, {
        email: 'testupdated@example.com',
      });

      assert(updatedUser.email === 'testupdated@example.com');
    });
  });

  describe('show()', () => {
    it('should get user by id', async () => {
      const user = await ctx.model.User.findOne({ where: { username: 'testuser' } });
      assert(user);

      const result = await ctx.service.user.show(user.id);
      assert(result);
      assert(result.username === 'testuser');
    });
  });

  describe('destroy()', () => {
    it('should delete user', async () => {
      const user = await ctx.model.User.findOne({ where: { username: 'testuser' } });
      assert(user);

      const result = await ctx.service.user.destroy(user.id);
      assert(result);

      const deletedUser = await ctx.model.User.findByPk(user.id);
      assert(deletedUser === null);
    });
  });
});