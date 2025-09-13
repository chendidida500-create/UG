import * as assert from 'assert';
import { Context } from 'egg';
import { app } from 'egg-mock/bootstrap';

describe('test/app/service/Permission.test.ts', () => {
  let ctx: Context;

  before(async () => {
    ctx = app.mockContext();
  });

  describe('index()', () => {
    it('should get permission list', async () => {
      const result = await ctx.service.permission.index(1, 10);
      assert(result.permissions);
      assert(result.pagination);
    });
  });

  describe('create()', () => {
    it('should create permission', async () => {
      const permission = await ctx.service.permission.create({
        name: 'testpermission',
        description: 'Test permission for unit test',
        action: 'read',
        resource: 'test',
      });
      
      assert(permission);
      assert(permission.name === 'testpermission');
      assert(permission.action === 'read');
      assert(permission.resource === 'test');
    });

    it('should not create duplicate permission', async () => {
      try {
        await ctx.service.permission.create({
          name: 'testpermission',
          description: 'Another test permission',
          action: 'read',
          resource: 'test',
        });
        assert.fail('Should throw error for duplicate permission');
      } catch (err) {
        assert(err.message === '权限名或操作资源组合已存在');
      }
    });
  });

  describe('update()', () => {
    it('should update permission', async () => {
      const permission = await ctx.model.Permission.findOne({ where: { name: 'testpermission' } });
      assert(permission);

      const updatedPermission = await ctx.service.permission.update(permission.id, {
        description: 'Updated test permission',
      });

      assert(updatedPermission.description === 'Updated test permission');
    });
  });

  describe('show()', () => {
    it('should get permission by id', async () => {
      const permission = await ctx.model.Permission.findOne({ where: { name: 'testpermission' } });
      assert(permission);

      const result = await ctx.service.permission.show(permission.id);
      assert(result);
      assert(result.name === 'testpermission');
    });
  });

  describe('destroy()', () => {
    it('should delete permission', async () => {
      const permission = await ctx.model.Permission.findOne({ where: { name: 'testpermission' } });
      assert(permission);

      const result = await ctx.service.permission.destroy(permission.id);
      assert(result);

      const deletedPermission = await ctx.model.Permission.findByPk(permission.id);
      assert(deletedPermission === null);
    });
  });
});