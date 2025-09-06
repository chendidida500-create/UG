'use strict';

const { app, assert } = require('egg-mock/bootstrap');

describe('test/app/controller/auth.test.js', () => {
  describe('POST /api/auth/login', () => {
    it('should login successfully with correct credentials', async () => {
      const result = await app.httpRequest()
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: '123456',
        })
        .expect(200);

      assert(result.body.success === true);
      assert(result.body.data.token);
      assert(result.body.data.refreshToken);
      assert(result.body.data.user);
      assert(result.body.data.user.username === 'admin');
    });

    it('should fail with incorrect password', async () => {
      const result = await app.httpRequest()
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: 'wrongpassword',
        })
        .expect(400);

      assert(result.body.success === false);
      assert(result.body.message.includes('密码错误'));
    });

    it('should fail with non-existent user', async () => {
      const result = await app.httpRequest()
        .post('/api/auth/login')
        .send({
          username: 'nonexistentuser',
          password: '123456',
        })
        .expect(400);

      assert(result.body.success === false);
      assert(result.body.message.includes('用户不存在'));
    });

    it('should fail with missing credentials', async () => {
      await app.httpRequest()
        .post('/api/auth/login')
        .send({})
        .expect(400);
    });
  });

  describe('POST /api/auth/register', () => {
    it('should register successfully with valid data', async () => {
      const uniqueUsername = `testuser_${Date.now()}`;
      const uniqueEmail = `test_${Date.now()}@example.com`;

      const result = await app.httpRequest()
        .post('/api/auth/register')
        .send({
          username: uniqueUsername,
          email: uniqueEmail,
          password: '123456',
        })
        .expect(200);

      assert(result.body.success === true);
      assert(result.body.message.includes('注册成功'));
    });

    it('should fail with duplicate username', async () => {
      const result = await app.httpRequest()
        .post('/api/auth/register')
        .send({
          username: 'admin',
          email: 'test@example.com',
          password: '123456',
        })
        .expect(400);

      assert(result.body.success === false);
      assert(result.body.message.includes('用户名已存在'));
    });

    it('should fail with invalid email format', async () => {
      const result = await app.httpRequest()
        .post('/api/auth/register')
        .send({
          username: 'testuser',
          email: 'invalid-email',
          password: '123456',
        })
        .expect(400);

      assert(result.body.success === false);
    });
  });

  describe('GET /api/auth/me', () => {
    let token;

    before(async () => {
      const loginResult = await app.httpRequest()
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: '123456',
        });
      token = loginResult.body.data.token;
    });

    it('should get user info with valid token', async () => {
      const result = await app.httpRequest()
        .get('/api/auth/me')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      assert(result.body.success === true);
      assert(result.body.data.username === 'admin');
      assert(result.body.data.roles);
    });

    it('should fail without token', async () => {
      await app.httpRequest()
        .get('/api/auth/me')
        .expect(401);
    });

    it('should fail with invalid token', async () => {
      await app.httpRequest()
        .get('/api/auth/me')
        .set('Authorization', 'Bearer invalid_token')
        .expect(401);
    });
  });

  describe('POST /api/auth/refresh', () => {
    let refreshToken;

    before(async () => {
      const loginResult = await app.httpRequest()
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: '123456',
        });
      refreshToken = loginResult.body.data.refreshToken;
    });

    it('should refresh token successfully', async () => {
      const result = await app.httpRequest()
        .post('/api/auth/refresh')
        .send({
          refreshToken,
        })
        .expect(200);

      assert(result.body.success === true);
      assert(result.body.data.token);
      assert(result.body.data.refreshToken);
    });

    it('should fail with invalid refresh token', async () => {
      const result = await app.httpRequest()
        .post('/api/auth/refresh')
        .send({
          refreshToken: 'invalid_refresh_token',
        })
        .expect(400);

      assert(result.body.success === false);
    });
  });

  describe('POST /api/auth/logout', () => {
    let token;

    before(async () => {
      const loginResult = await app.httpRequest()
        .post('/api/auth/login')
        .send({
          username: 'admin',
          password: '123456',
        });
      token = loginResult.body.data.token;
    });

    it('should logout successfully', async () => {
      const result = await app.httpRequest()
        .post('/api/auth/logout')
        .set('Authorization', `Bearer ${token}`)
        .expect(200);

      assert(result.body.success === true);
    });
  });
});