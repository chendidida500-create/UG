'use strict';

const BaseService = require('./base');

/**
 * 认证服务
 * 处理用户认证相关的业务逻辑
 */
class AuthService extends BaseService {
  /**
   * 用户登录
   * @param {string} username 用户名
   * @param {string} password 密码
   * @param {boolean} remember 是否记住登录
   * @returns {Object} 登录结果
   */
  async login(username, password, remember = false) {
    // 查找用户（支持用户名或邮箱登录）
    const user = await this.app.model.User.findOne({
      where: {
        [this.app.model.Sequelize.Op.or]: [{ username }, { email: username }],
      },
      include: [
        {
          model: this.app.model.Role,
          as: 'roles',
          through: { attributes: [] },
          include: [
            {
              model: this.app.model.Permission,
              as: 'permissions',
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    if (!user) {
      throw new Error('用户不存在');
    }

    // 检查用户状态
    if (user.status !== 1) {
      throw new Error('用户已被禁用');
    }

    // 验证密码
    const isPasswordValid = await this.comparePassword(password, user.password);
    if (!isPasswordValid) {
      throw new Error('密码错误');
    }

    // 生成Token
    const tokenPayload = {
      userId: user.id,
      username: user.username,
      email: user.email,
    };

    const expiresIn = remember ? '7d' : '24h';
    const token = this.generateToken(tokenPayload, expiresIn);
    const refreshToken = this.generateToken({ userId: user.id }, '30d');

    // 计算过期时间
    const expires =
      Date.now() + (remember ? 7 * 24 * 60 * 60 * 1000 : 24 * 60 * 60 * 1000);

    // 移除敏感信息
    const userData = user.toJSON();
    delete userData.password;

    return {
      token,
      refreshToken,
      user: userData,
      expires,
    };
  }

  /**
   * 用户注册
   * @param {Object} userData 用户数据
   * @returns {Object} 创建的用户信息
   */
  async register(userData) {
    const { username, email, password, nickname } = userData;

    // 检查用户名是否已存在
    const existingUsername = await this.app.model.User.findOne({
      where: { username },
    });
    if (existingUsername) {
      throw new Error('用户名已存在');
    }

    // 检查邮箱是否已存在
    const existingEmail = await this.app.model.User.findOne({
      where: { email },
    });
    if (existingEmail) {
      throw new Error('邮箱已被注册');
    }

    // 加密密码
    const hashedPassword = await this.hashPassword(password);

    // 创建用户
    const user = await this.app.model.User.create({
      id: this.generateUuid(),
      username,
      email,
      password: hashedPassword,
      nickname: nickname || username,
      status: 1,
    });

    // 分配默认角色（普通用户）
    const defaultRole = await this.app.model.Role.findOne({
      where: { code: 'user' },
    });

    if (defaultRole) {
      await this.app.model.UserRole.create({
        id: this.generateUuid(),
        user_id: user.id,
        role_id: defaultRole.id,
      });
    }

    // 移除敏感信息
    const result = user.toJSON();
    delete result.password;

    return result;
  }

  /**
   * 刷新Token
   * @param {string} refreshToken 刷新Token
   * @returns {Object} 新的Token信息
   */
  async refreshToken(refreshToken) {
    try {
      // 验证刷新Token
      const decoded = this.verifyToken(refreshToken);

      // 获取用户信息
      const user = await this.app.model.User.findByPk(decoded.userId, {
        include: [
          {
            model: this.app.model.Role,
            as: 'roles',
            through: { attributes: [] },
            include: [
              {
                model: this.app.model.Permission,
                as: 'permissions',
                through: { attributes: [] },
              },
            ],
          },
        ],
      });

      if (!user) {
        throw new Error('用户不存在');
      }

      if (user.status !== 1) {
        throw new Error('用户已被禁用');
      }

      // 生成新的Token
      const tokenPayload = {
        userId: user.id,
        username: user.username,
        email: user.email,
      };

      const newToken = this.generateToken(tokenPayload, '24h');
      const newRefreshToken = this.generateToken({ userId: user.id }, '30d');
      const expires = Date.now() + 24 * 60 * 60 * 1000;

      // 移除敏感信息
      const userData = user.toJSON();
      delete userData.password;

      return {
        token: newToken,
        refreshToken: newRefreshToken,
        user: userData,
        expires,
      };
    } catch (error) {
      throw new Error('刷新Token失败: ' + error.message);
    }
  }

  /**
   * 验证Token是否有效
   * @param {string} token JWT Token
   * @returns {Object} 解码后的Token数据
   */
  async validateToken(token) {
    try {
      const decoded = this.verifyToken(token);

      // 检查用户是否存在且状态正常
      const user = await this.app.model.User.findByPk(decoded.userId);
      if (!user || user.status !== 1) {
        throw new Error('用户状态异常');
      }

      return decoded;
    } catch (error) {
      throw new Error('Token验证失败: ' + error.message);
    }
  }

  /**
   * 用户退出登录（可选实现Token黑名单）
   * @param {string} userId 用户ID
   */
  async logout(userId) {
    // 这里可以实现Token黑名单机制
    // 例如将Token加入Redis黑名单，在JWT中间件中检查

    // 记录操作日志
    await this.logOperation('logout', 'auth', { userId });
  }
}

module.exports = AuthService;
