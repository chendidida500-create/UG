import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/Role.test.ts', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  describe('index()', () => {
    it('should get role list', async () => {
      const result = await ctx.service.role.index(1, 10);
      assert(result.roles);
      assert(result.pagination);
    });
  });

  describe('create()', () => {
    it('should create role', async () => {
      const role = await ctx.service.role.create({
        name: 'testrole',
        description: 'Test role for unit test',
      });
      
      assert(role);
      assert(role.name === 'testrole');
      assert(role.description === 'Test role for unit test');
    });

    it('should not create duplicate role', async () => {
      try {
        await ctx.service.role.create({
          name: 'testrole',
          description: 'Another test role',
        });
        assert.fail('Should throw error for duplicate role name');
      } catch (err) {
        assert(err.message === '角色名已存在');
      }
    });
  });

  describe('update()', () => {
    it('should update role', async () => {
      const role = await ctx.model.Role.findOne({ where: { name: 'testrole' } });
      assert(role);

      const updatedRole = await ctx.service.role.update(role.id, {
        description: 'Updated test role',
      });

      assert(updatedRole.description === 'Updated test role');
    });
  });

  describe('show()', () => {
    it('should get role by id', async () => {
      const role = await ctx.model.Role.findOne({ where: { name: 'testrole' } });
      assert(role);

      const result = await ctx.service.role.show(role.id);
      assert(result);
      assert(result.name === 'testrole');
    });
  });

  describe('destroy()', () => {
    it('should delete role', async () => {
      const role = await ctx.model.Role.findOne({ where: { name: 'testrole' } });
      assert(role);

      const result = await ctx.service.role.destroy(role.id);
      assert(result);

      const deletedRole = await ctx.model.Role.findByPk(role.id);
      assert(deletedRole === null);
    });
  });
});