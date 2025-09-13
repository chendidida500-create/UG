import { Service } from 'egg';

interface LoginParams {
  username: string;
  password: string;
}

export default class AuthService extends Service {
  /**
   * 用户登录
   */
  async login({ username, password }: LoginParams) {
    const { ctx } = this;
    
    // 查找用户
    const user = await ctx.model.User.findOne({
      where: {
        username,
      },
    });

    if (!user) {
      ctx.throw(401, '用户名或密码错误');
    }

    // 验证密码
    const isValid = await ctx.compareHash(password, user.password);
    if (!isValid) {
      ctx.throw(401, '用户名或密码错误');
    }

    // 生成JWT token
    const token = ctx.app.jwt.sign(
      {
        id: user.id,
        username: user.username,
      },
      ctx.app.config.jwt.secret,
      {
        expiresIn: '24h',
      }
    );

    // 获取用户角色
    const roles = await user.$get('Roles');
    const roleNames = roles.map((role: any) => role.name);

    return {
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        roles: roleNames,
      },
    };
  }

  /**
   * 用户登出
   */
  async logout() {
    // JWT是无状态的，服务器端不需要特殊处理
    // 前端删除token即可实现登出
    return true;
  }

  /**
   * 获取当前用户信息
   */
  async profile(userId: number) {
    const { ctx } = this;
    
    const user = await ctx.model.User.findByPk(userId, {
      attributes: ['id', 'username', 'email'],
      include: [{
        model: ctx.model.Role,
        through: { attributes: [] },
        attributes: ['id', 'name'],
      }],
    });

    if (!user) {
      ctx.throw(404, '用户不存在');
    }

    const userData = user.toJSON();
    return {
      ...userData,
      roles: userData.Roles?.map((role: any) => ({
        id: role.id,
        name: role.name,
      })) || [],
    };
  }
}