'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/user.test.js', () => {
  let adminToken;
  let testUserId;

  before(async () => {
    // 获取管理员token
    const loginResult = await app.httpRequest()
      .post('/api/auth/login')
      .send({
        username: 'admin',
        password: '123456',
      });
    adminToken = loginResult.body.data.token;
  });

  describe('GET /api/users', () => {
    it('should get user list successfully', async () => {
      const result = await app.httpRequest()
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      assert(result.body.success === true);
      assert(Array.isArray(result.body.data.list));
      assert(typeof result.body.data.total === 'number');
    });

    it('should get user list with pagination', async () => {
      const result = await app.httpRequest()
        .get('/api/users')
        .query({
          current: 1,
          pageSize: 10,
        })
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      assert(result.body.success === true);
      assert(result.body.data.list.length <= 10);
    });

    it('should search users by keyword', async () => {
      const result = await app.httpRequest()
        .get('/api/users')
        .query({
          keyword: 'admin',
        })
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      assert(result.body.success === true);
      assert(result.body.data.list.some(user =>
        user.username.includes('admin') || user.email.includes('admin')
      ));
    });

    it('should fail without authorization', async () => {
      await app.httpRequest()
        .get('/api/users')
        .expect(401);
    });
  });

  describe('POST /api/users', () => {
    it('should create user successfully', async () => {
      const uniqueUsername = `testuser_${Date.now()}`;
      const uniqueEmail = `test_${Date.now()}@example.com`;

      const result = await app.httpRequest()
        .post('/api/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          username: uniqueUsername,
          email: uniqueEmail,
          password: '123456',
          roles: ['USER'],
          status: 'active',
        })
        .expect(200);

      assert(result.body.success === true);
      assert(result.body.data.id);
      assert(result.body.data.username === uniqueUsername);

      testUserId = result.body.data.id;
    });

    it('should fail with duplicate username', async () => {
      const result = await app.httpRequest()
        .post('/api/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          username: 'admin',
          email: 'test@example.com',
          password: '123456',
          roles: ['USER'],
        })
        .expect(400);

      assert(result.body.success === false);
      assert(result.body.message.includes('用户名已存在'));
    });

    it('should fail with invalid data', async () => {
      await app.httpRequest()
        .post('/api/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          username: '',
          email: 'invalid-email',
          password: '123',
        })
        .expect(400);
    });
  });

  describe('GET /api/users/:id', () => {
    it('should get user detail successfully', async () => {
      const result = await app.httpRequest()
        .get(`/api/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      assert(result.body.success === true);
      assert(result.body.data.id === testUserId);
      assert(result.body.data.username);
      assert(result.body.data.email);
    });

    it('should fail with non-existent user id', async () => {
      const result = await app.httpRequest()
        .get('/api/users/non-existent-id')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);

      assert(result.body.success === false);
    });
  });

  describe('PUT /api/users/:id', () => {
    it('should update user successfully', async () => {
      const updatedData = {
        phone: '13800138000',
        status: 'active',
      };

      const result = await app.httpRequest()
        .put(`/api/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send(updatedData)
        .expect(200);

      assert(result.body.success === true);
      assert(result.body.data.phone === updatedData.phone);
    });

    it('should fail with invalid data', async () => {
      const result = await app.httpRequest()
        .put(`/api/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          email: 'invalid-email',
        })
        .expect(400);

      assert(result.body.success === false);
    });
  });

  describe('PUT /api/users/:id/status', () => {
    it('should update user status successfully', async () => {
      const result = await app.httpRequest()
        .put(`/api/users/${testUserId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          status: 'inactive',
        })
        .expect(200);

      assert(result.body.success === true);
    });

    it('should fail with invalid status', async () => {
      const result = await app.httpRequest()
        .put(`/api/users/${testUserId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          status: 'invalid_status',
        })
        .expect(400);

      assert(result.body.success === false);
    });
  });

  describe('POST /api/users/:id/reset-password', () => {
    it('should reset password successfully', async () => {
      const result = await app.httpRequest()
        .post(`/api/users/${testUserId}/reset-password`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          newPassword: 'newpassword123',
        })
        .expect(200);

      assert(result.body.success === true);
    });
  });

  describe('PUT /api/users/:id/roles', () => {
    it('should update user roles successfully', async () => {
      const result = await app.httpRequest()
        .put(`/api/users/${testUserId}/roles`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          roleIds: ['role-id-1', 'role-id-2'],
        })
        .expect(200);

      assert(result.body.success === true);
    });
  });

  describe('DELETE /api/users/:id', () => {
    it('should delete user successfully', async () => {
      const result = await app.httpRequest()
        .delete(`/api/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      assert(result.body.success === true);
    });

    it('should fail to delete non-existent user', async () => {
      const result = await app.httpRequest()
        .delete('/api/users/non-existent-id')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);

      assert(result.body.success === false);
    });
  });

  describe('DELETE /api/users/batch', () => {
    let batchTestUserIds = [];

    before(async () => {
      // 创建测试用户用于批量删除
      for (let i = 0; i < 3; i++) {
        const result = await app.httpRequest()
          .post('/api/users')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            username: `batchtest_${Date.now()}_${i}`,
            email: `batchtest_${Date.now()}_${i}@example.com`,
            password: '123456',
            roles: ['USER'],
          });
        batchTestUserIds.push(result.body.data.id);
      }
    });

    it('should batch delete users successfully', async () => {
      const result = await app.httpRequest()
        .delete('/api/users/batch')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          ids: batchTestUserIds,
        })
        .expect(200);

      assert(result.body.success === true);
    });
  });
});