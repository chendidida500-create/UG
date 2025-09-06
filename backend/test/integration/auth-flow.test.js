const request = require('supertest');
const { app } = require('egg-mock/bootstrap');

describe('Integration Tests - Authentication Flow', () => {
  let userToken;
  let adminToken;
  let refreshToken;

  describe('Complete Authentication Flow', () => {
    it('should complete full authentication workflow', async () => {
      // 1. 注册新用户
      const uniqueUsername = `integrationtest_${Date.now()}`;
      const uniqueEmail = `integration_${Date.now()}@example.com`;

      const registerResponse = await request(app.callback())
        .post('/api/auth/register')
        .send({
          username: uniqueUsername,
          email: uniqueEmail,
          password: '123456',
        })
        .expect(200);

      expect(registerResponse.body.success).toBe(true);

      // 2. 用户登录
      const loginResponse = await request(app.callback())
        .post('/api/auth/login')
        .send({
          username: uniqueUsername,
          password: '123456',
        })
        .expect(200);

      expect(loginResponse.body.success).toBe(true);
      expect(loginResponse.body.data.token).toBeDefined();
      expect(loginResponse.body.data.refreshToken).toBeDefined();

      userToken = loginResponse.body.data.token;
      refreshToken = loginResponse.body.data.refreshToken;

      // 3. 获取用户信息
      const userInfoResponse = await request(app.callback())
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(userInfoResponse.body.success).toBe(true);
      expect(userInfoResponse.body.data.username).toBe(uniqueUsername);

      // 4. 刷新Token
      const refreshResponse = await request(app.callback())
        .post('/api/auth/refresh')
        .send({
          refreshToken,
        })
        .expect(200);

      expect(refreshResponse.body.success).toBe(true);
      expect(refreshResponse.body.data.token).toBeDefined();

      // 5. 退出登录
      const logoutResponse = await request(app.callback())
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(200);

      expect(logoutResponse.body.success).toBe(true);
    });

    it('should handle admin authentication and permissions', async () => {
      // 管理员登录
      const adminLoginResponse = await request(app.callback())
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: '123456',
        })
        .expect(200);

      adminToken = adminLoginResponse.body.data.token;

      // 获取管理员权限
      const permissionsResponse = await request(app.callback())
        .get('/api/auth/permissions')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(permissionsResponse.body.success).toBe(true);
      expect(Array.isArray(permissionsResponse.body.data)).toBe(true);
    });
  });

  describe('User Management Integration', () => {
    let testUserId;

    it('should complete user management workflow', async () => {
      // 1. 创建用户
      const createResponse = await request(app.callback())
        .post('/api/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          username: `testuser_${Date.now()}`,
          email: `testuser_${Date.now()}@example.com`,
          password: '123456',
          roles: ['USER'],
          status: 'active',
        })
        .expect(200);

      testUserId = createResponse.body.data.id;

      // 2. 获取用户列表
      const listResponse = await request(app.callback())
        .get('/api/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(listResponse.body.success).toBe(true);
      expect(Array.isArray(listResponse.body.data.list)).toBe(true);

      // 3. 获取用户详情
      const detailResponse = await request(app.callback())
        .get(`/api/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(detailResponse.body.success).toBe(true);
      expect(detailResponse.body.data.id).toBe(testUserId);

      // 4. 更新用户
      const updateResponse = await request(app.callback())
        .put(`/api/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          phone: '13800138000',
        })
        .expect(200);

      expect(updateResponse.body.success).toBe(true);

      // 5. 更新用户状态
      const statusResponse = await request(app.callback())
        .put(`/api/users/${testUserId}/status`)
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          status: 'inactive',
        })
        .expect(200);

      expect(statusResponse.body.success).toBe(true);

      // 6. 删除用户
      const deleteResponse = await request(app.callback())
        .delete(`/api/users/${testUserId}`)
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(200);

      expect(deleteResponse.body.success).toBe(true);
    });
  });

  describe('Permission Control Integration', () => {
    it('should enforce permission controls correctly', async () => {
      // 普通用户尝试访问管理功能应该被拒绝
      const unauthorizedResponse = await request(app.callback())
        .get('/api/users')
        .set('Authorization', `Bearer ${userToken}`)
        .expect(403);

      expect(unauthorizedResponse.body.success).toBe(false);
      expect(unauthorizedResponse.body.message).toContain('权限不足');
    });

    it('should allow admin to access all resources', async () => {
      // 管理员访问所有资源
      const responses = await Promise.all([
        request(app.callback())
          .get('/api/users')
          .set('Authorization', `Bearer ${adminToken}`),
        request(app.callback())
          .get('/api/roles')
          .set('Authorization', `Bearer ${adminToken}`),
        request(app.callback())
          .get('/api/permissions')
          .set('Authorization', `Bearer ${adminToken}`),
      ]);

      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
      });
    });
  });

  describe('Error Handling Integration', () => {
    it('should handle various error scenarios', async () => {
      // 无效token
      await request(app.callback())
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);

      // 缺失token
      await request(app.callback())
        .get('/api/users')
        .expect(401);

      // 无效的请求数据
      await request(app.callback())
        .post('/api/users')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({
          username: '',
          email: 'invalid-email',
        })
        .expect(400);

      // 不存在的资源
      await request(app.callback())
        .get('/api/users/non-existent-id')
        .set('Authorization', `Bearer ${adminToken}`)
        .expect(404);
    });
  });

  describe('Data Validation Integration', () => {
    it('should validate request data correctly', async () => {
      // 用户名格式验证
      await request(app.callback())
        .post('/api/auth/register')
        .send({
          username: 'a', // 太短
          email: 'test@example.com',
          password: '123456',
        })
        .expect(400);

      // 邮箱格式验证
      await request(app.callback())
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'invalid-email',
          password: '123456',
        })
        .expect(400);

      // 密码强度验证
      await request(app.callback())
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'test@example.com',
          password: '123', // 太短
        })
        .expect(400);
    });
  });

  describe('Concurrency and Race Conditions', () => {
    it('should handle concurrent requests correctly', async () => {
      // 并发创建用户
      const concurrentRequests = Array.from({ length: 5 }, (_, index) =>
        request(app.callback())
          .post('/api/users')
          .set('Authorization', `Bearer ${adminToken}`)
          .send({
            username: `concurrent_user_${Date.now()}_${index}`,
            email: `concurrent_${Date.now()}_${index}@example.com`,
            password: '123456',
            roles: ['USER'],
          })
      );

      const responses = await Promise.all(concurrentRequests);

      // 所有请求都应该成功
      responses.forEach(response => {
        expect(response.status).toBe(200);
        expect(response.body.success).toBe(true);
      });

      // 清理测试数据
      const userIds = responses.map(response => response.body.data.id);
      await request(app.callback())
        .delete('/api/users/batch')
        .set('Authorization', `Bearer ${adminToken}`)
        .send({ ids: userIds });
    });
  });
});